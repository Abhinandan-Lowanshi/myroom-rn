import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Switch, TouchableOpacity} from 'react-native';
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
import {setCurrentLocationName, setLocation} from '../redux/Slice';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import Labels from '../common/labels';
const AppSettings = props => {
  const {navigation} = props;
  const [save, setSave] = useState(false);
  const [switchFocus, setSwitchFocus] = useState(false);
  const [address, setAddress] = useState('');
  const [rowData, setRowData] = useState('');
  const isHideBack = props?.route?.params?.isHideBack;
  const dispatch = useDispatch();

  useEffect(() => {
    localStorageOp('', AsyncKeys.DEFAULT_LOCATION, '')
      .then(value => {
        setAddress(value?.formatted_address);
        setSave(true);
      })
      .catch(() => {});
  }, []);

  const onSearch = value => {
    console.log(value, 'value');
    setAddress(value?.formatted_address);

    setRowData(value);
    setSave(false);
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
        Toast.show('Please select location', Toast.LONG);
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
          Toast.show('Please select location', Toast.LONG);
        }
      }
    }
  };

  const handleSwitch = value => {
    setSwitchFocus(value);
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
      />

      <View style={style.container}>
        <View style={style.containerSave}>
          <Text style={style.labelDefaultLocation}>Default Location</Text>
          <View style={style.innerSave(save)}>
            <Text style={style.labelSave(save)}>
              {save ? 'Saved' : 'Unsaved'}
            </Text>
          </View>
        </View>

        <Text style={style.labelLocation}>
          {address || '- - - - - - - - - - - - - - - - -'}
        </Text>

        <C_Button
          onPress={saveLocation}
          outerContainer={style.outerContainer}
          isSubmitDisabled={rowData == '' ? true : false}
          label={
            isHideBack ? 'Save Location' : save ? 'Continue' : 'Save Location'
          }
        />
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
  },
  containerPlaceHolder: {
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
    fontSize: RF(2),
  },
  outerContainer: {
    height: hp(5),
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
});
