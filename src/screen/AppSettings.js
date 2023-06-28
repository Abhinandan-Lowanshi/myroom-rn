import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  FlatList,
  Linking,
  Platform,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import ScreenName from '../common/ScreenName';
import StyleGlobel from '../Style/StyleGlobel';
import localStorageOp from '../localStorage/LocalData';
import AsyncKeys from '../localStorage/AsyncKeys';
import {CommonActions} from '@react-navigation/native';
import Header from '../component/Header';
import GooglePlacesInput from '../component/GooglePlacesInput';
import Colors from '../common/Colors';
import {RF, hp} from '../common/CommonFunctions';
import C_Button from '../component/C_Button';
import Toast from 'react-native-simple-toast';
import {
  setCurrentLocationName,
  setLocation,
  setLocationMode,
} from '../redux/Slice';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import Labels from '../common/labels';
import Geolocation from '@react-native-community/geolocation';
import GPSDialogue from '../component/GPSDialogue';
import Icon from 'react-native-vector-icons/dist/Entypo';

const AppSettings = props => {
  const {navigation} = props;
  const [save, setSave] = useState(false);
  const [switchFocus, setSwitchFocus] = useState(false);
  const [address, setAddress] = useState('');
  const currentLocationName = useSelector(
    state => state.AllData.currentLocationName,
  );
  const [rowData, setRowData] = useState('');
  const isHideBack = props?.route?.params?.isHideBack;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonData, setButtonData] = useState([
    {
      id: '1',
      label: 'Current Location',
      isChecked: true,
    },
    {
      id: '2',
      label: 'Default Location',
      isChecked: false,
    },
  ]);
  useEffect(() => {
    localStorageOp('', AsyncKeys.DEFAULT_LOCATION, '')
      .then(value => {
        if (value) {
          setAddress(value?.formatted_address);
          setSave(true);
        }
      })
      .catch(() => {});

    localStorageOp('', AsyncKeys.LOCATION_MODE, '')
      .then(value => {
        if (value) {
          if (value.mode === AsyncKeys.DEFAULT) {
            changLocationList(buttonData[1]);
          } else {
            changLocationList(buttonData[0]);
          }
        } else {
          changLocationList(buttonData[0]);
        }
      })
      .catch(() => {});
  }, []);

  const onSearch = value => {
    setAddress(value?.formatted_address);
    setRowData(value);
    if (value !== '') {
      localStorageOp(true, AsyncKeys.DEFAULT_LOCATION, value);
      setSave(true);
      dispatch(
        setCurrentLocationName({
          locationName: value?.formatted_address,
        }),
      );
      let Ob = {
        latitude: value?.geometry?.location?.lat,
        longitude: value?.geometry?.location?.lng,
      };
      dispatch(setLocation(Ob));
    } else {
      showToast('Please select location');
      setSave(false);
    }
  };

  const saveLocation = () => {
    if (isHideBack) {
      if (rowData !== '') {
        localStorageOp(true, AsyncKeys.DEFAULT_LOCATION, rowData);
        setSave(true);
        dispatch(
          setCurrentLocationName({
            locationName: rowData?.formatted_address,
          }),
        );
        let Ob = {
          latitude: rowData?.geometry?.location?.lat,
          longitude: rowData?.geometry?.location?.lng,
        };
        dispatch(setLocation(Ob));
      } else {
        showToast('Please select location');
      }
    } else {
      if (save) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ScreenName.Splash}],
          }),
        );
      } else {
        if (rowData !== '') {
          localStorageOp(true, AsyncKeys.DEFAULT_LOCATION, rowData);
          setSave(true);
          dispatch(
            setCurrentLocationName({
              locationName: rowData?.formatted_address,
            }),
          );
          let Ob = {
            latitude: rowData?.geometry?.location?.lat,
            longitude: rowData?.geometry?.location?.lng,
          };
          dispatch(setLocation(Ob));
        } else {
          showToast('Please select location');
        }
      }
    }
  };

  const handleSwitch = value => {
    setSwitchFocus(value);
  };

  const onPressItem = item => {
    if (item?.id === '1') {
      setLoading(true);
      requestLocationPermission(item);
    } else {
      if (save) {
        localStorageOp('', AsyncKeys.DEFAULT_LOCATION, '')
          .then(value => {
            if (value) {
              let Ob = {
                latitude: value?.geometry?.location?.lat,
                longitude: value?.geometry?.location?.lng,
              };
              dispatch(setLocation(Ob));
              dispatch(
                setCurrentLocationName({
                  locationName: value?.formatted_address,
                }),
              );
            }
            changeLocationMode(item, AsyncKeys.DEFAULT);
          })
          .catch(() => {
            return false;
          });
      } else {
        showToast('Please save default location first');
      }
    }
  };

  const changeLocationMode = (item, mode) => {
    let data = {
      mode: mode,
    };
    localStorageOp(true, AsyncKeys.LOCATION_MODE, data);
    changLocationList(item);
  };

  const requestLocationPermission = async item => {
    console.log('requestLocationPermission 140');
    if (Platform.OS === 'ios') {
      getOneTimeLocation(item);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation(item);
        } else {
          setVisible(true);
          setLoading(false);
        }
      } catch (err) {
        setVisible(true);
        setLoading(false);
      }
    }
  };

  const getOneTimeLocation = item => {
    console.log('getOneTimeLocation');
    Geolocation.getCurrentPosition(
      position => {
        setLoading(false);
        changeLocationMode(item, AsyncKeys.CUSTOM);
        dispatch(setLocation(position.coords));
        getAddressFromCoordinates(
          position.coords?.latitude,
          position.coords?.longitude,
        );
      },
      error => {
        setVisible(true);
        setLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const getAddressFromCoordinates = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          latitude +
          ',' +
          longitude +
          '&key=' +
          'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc',
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status === 'OK') {
            dispatch(
              setCurrentLocationName({
                locationName: responseJson?.results?.[0]?.formatted_address,
              }),
            );
            resolve(responseJson?.results?.[0]?.formatted_address);
          } else {
            reject('not found');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const showToast = message => {
    Toast.show(message, Toast.LONG);
  };

  const changLocationList = item => {
    let temp = JSON.parse(JSON.stringify(buttonData));
    temp.map(value => {
      return (value.isChecked = value?.id === item?.id ? true : false);
    });
    console.log('temp', temp);
    dispatch(
      setLocationMode({locationMode: item?.id === '1' ? 'Live' : 'Default'}),
    );

    setButtonData(temp);
  };

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const renderHomeIcon = () => {
    return (
      <TouchableOpacity style={style.buttonHome}>
        <Icon name={'home'} size={hp(5)} color={Colors.PRIMARY} />
        <Text style={style.labelHome}>Home</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.buttonContainer}
        onPress={() => onPressItem(item)}>
        <View
          style={{
            backgroundColor: item.isChecked ? Colors.PRIMARYLITE1 : 'white',
            height: hp(2.1),
            width: hp(2.1),
            borderRadius: hp(90),
            borderWidth: hp(0.3),
            borderColor: Colors.PRIMARY,
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            color: item.isChecked ? Colors.PRIMARYDARK : 'black',
            marginLeft: hp(1),
            alignSelf: 'center',
            fontSize: RF(1.5),
          }}>
          {item?.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleDefault = () => {
    localStorageOp('', AsyncKeys.DEFAULT_LOCATION, '')
      .then(value => {
        if (value) {
          let Ob = {
            latitude: value?.geometry?.location?.lat,
            longitude: value?.geometry?.location?.lng,
          };
          dispatch(setLocation(Ob));
          dispatch(
            setCurrentLocationName({
              locationName: value?.formatted_address,
            }),
          );
          setVisible(false);
        } else {
          showToast('Please Select default location first');
          setVisible(false);
        }
      })
      .catch(() => {});
  };

  const goToHome = () => {
    if (save) navigation.navigate(ScreenName.TabComponent);
    else Toast.show('Please save location before going to home', Toast.LONG);
  };
  return (
    <View style={StyleGlobel.containerStyle}>
      <Header
        label={Labels?.defaultLocation}
        hideBack={!isHideBack}
        navigation={navigation}></Header>

      <GooglePlacesInput
        containerPlaceHolder={style.containerPlaceHolder}
        onSearch={onSearch}
        placeholder={'Set Default location'}
      />
      {loading && (
        <View style={style.loader}>
          <Text style={style.labelLocationText}>Getting Current Location</Text>
          <ActivityIndicator size={hp(5)} color={Colors.PRIMARY} />
        </View>
      )}
      <GPSDialogue
        labelTop={'Your GPS seems to disabled?'}
        labelPositive={'Turn on GPS'}
        labelNegative={'default location'}
        visible={visible}
        confirmationMessage={'Are you want to use default location Now'}
        // confirmationMessageHigh={'logout?'}
        handleOpenSettings={handleOpenSettings}
        closeModal={() => {
          setVisible(false);
        }}
        useDefaultLocation={handleDefault}
        closeApp={() => {
          BackHandler.exitApp();
        }}
      />

      <View style={style.container}>
        <View style={style.containerSave}>
          <Text style={style.labelDefaultLocation}>Default Location</Text>
          <View style={style.innerSave(save)}>
            {/* <Text style={style.labelSave(save)}>
              {save ? 'Saved' : 'Unsaved'}
            </Text> */}
          </View>
        </View>

        <Text style={style.labelLocation}>
          {address || '- - - - - - - - - - - - - - - - -'}
        </Text>

        {/* <C_Button
          onPress={saveLocation}
          outerContainer={style.outerContainer}
          // isSubmitDisabled={rowData == '' ? true : false}
          label={
            isHideBack ? 'Save Location' : save ? 'Go to home' : 'Save Location'
          }
        /> */}
        <Text style={[style.labelDefaultLocation, {marginTop: hp(3)}]}>
          Active Location
        </Text>
        <Text style={style.labelLocation}>
          {currentLocationName?.locationName ||
            '- - - - - - - - - - - - - - - - -'}
        </Text>
        <Text style={[style.labelDefaultLocation, {marginTop: hp(3)}]}>
          Location Mode
        </Text>
        <FlatList
          style={style.flatList}
          data={buttonData}
          renderItem={renderItem}
        />
        {/* {renderHomeIcon()} */}
      </View>
    </View>
  );
};

export default AppSettings;

const style = StyleSheet.create({
  container: {
    width: '90%',
    position: 'absolute',
    top: hp(15),
    zIndex: -1,
    marginHorizontal: hp(2),
  },
  labelLocation: {
    color: Colors.BLACK,
    fontSize: hp(1.6),
  },
  containerPlaceHolder: {
    fontSize: RF(2),
    position: 'absolute',
    top: hp(7.5),
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginHorizontal: hp(1),
    elevation: hp(5),
  },
  labelDefaultLocation: {
    color: Colors.BLACK,
    fontWeight: '600',
    fontSize: RF(1.6),
  },
  outerContainer: {
    height: hp(5),
    marginBottom: hp(3),
  },
  containerSave: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerSave: save => ({
    alignSelf: 'center',
    borderColor: Colors.GREY1,
    borderWidth: hp(0.1),
    backgroundColor: save ? Colors.PRIMARY : Colors.WHITE,
    borderRadius: hp(0.4),
  }),
  labelSave: save => ({
    color: save ? Colors.WHITE : Colors.BLACK,
    marginHorizontal: hp(1.2),
    marginVertical: hp(0.2),
    fontSize: RF(1.1),
  }),
  labelNotification: {
    color: Colors.BLACK,
    alignSelf: 'center',
    fontSize: RF(1.8),
    fontWeight: '600',
  },
  containerSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  containerHome: {
    marginTop: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelHome: {
    color: Colors.BLACK,
    fontSize: RF(1.8),
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: hp(1.5),
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelLocationText: {
    color: Colors.BLACK,
    fontSize: hp(1.9),
    marginBottom: hp(2),
  },
  buttonHome: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(5),
  },
});
