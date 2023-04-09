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
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import {useState} from 'react';
import Labels from '../common/labels';
const AppSettings = props => {
  const {navigation} = props;
  const [save, setSave] = useState(false);
  const [switchFocus, setSwitchFocus] = useState(false);
  const [address, setAddress] = useState('');
  const [rowData, setRowData] = useState('');
  const isHideBack = props?.route?.params?.isHideBack;

  useEffect(() => {
    localStorageOp('', AsyncKeys.DEFAULT_LOCATION, '')
      .then(value => {
        setAddress(value?.formatted_address);
        setSave(true);
      })
      .catch(() => {});
  }, []);

  const onSearch = value => {
    console.log(value);
    setAddress(value?.formatted_address);
    setRowData(value);
    setSave(false);
  };

  const saveLocation = () => {
    if (rowData !== '') {
      localStorageOp(true, AsyncKeys.DEFAULT_LOCATION, rowData);
      setSave(true);
    } else {
      Toast.show('Please select location', Toast.LONG);
    }
  };

  const handleSwitch = value => {
    setSwitchFocus(value);
    console.log(value);
  };

  const goToHome = () => {
    if (save) navigation.navigate(ScreenName.TabComponent);
    else Toast.show('Please save location before going to home', Toast.LONG);
  };
  return (
    <View style={StyleGlobel.containerStyle}>
      <Header
        label={Labels?.AppSettings}
        hideBack={isHideBack}
        navigation={navigation}></Header>

      {/* <GooglePlacesAutocomplete
        // style={[style.containerPlaceHolder]}
        onFail={error => {}}
        onTimeout={error => {}}
        textInputProps={{
          placeholderTextColor: Colors.BLACK,
          returnKeyType: 'search',
        }}
        keepResultsAfterBlur={true}
        keyboardShouldPersistTaps={'always'}
        styles={{
          textInputContainer: {},
          textInput: {
            height: hp(6),
            color: Colors.BLACK,
            fontSize: 16,
            elevation: hp(2),
            borderColor: Colors.GREY,
            borderWidth: hp(0.25),
            borderRadius: hp(1),
            marginHorizontal: hp(1),
            marginTop: hp(1),
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          description: {color: Colors.BLACK},
        }}
        placeholder="Search location"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // props?.onSearch(details);
          // setLocation(details?.geometry?.location);
          // getRooms(details?.geometry?.location);
          // handleRecent(details);
        }}
        getCurrentLocation={data => {}}
        query={{
          key: 'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc',
          language: 'en',
        }}
      /> */}
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
        {/* <View style={style.containerSwitch}>
          <Text style={style.labelNotification}>
            Move notification to default location
          </Text>
          <Switch
            trackColor={{false: '#767577', true: Colors.PRIMARYLITE1}}
            thumbColor={switchFocus ? Colors.PRIMARYLITE : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleSwitch}
            value={switchFocus}
          />
        </View> */}

        <C_Button
          onPress={saveLocation}
          outerContainer={style.outerContainer}
          isSubmitDisabled={rowData == '' ? true : false}
          label={'Save Address'}
        />
        {isHideBack && (
          <View style={style.containerHome}>
            <TouchableOpacity onPress={goToHome}>
              <MaterialCommunityIcons
                name={'home-circle-outline'}
                size={hp(5)}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
            <Text style={style.labelHome}>Back to home</Text>
          </View>
        )}
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
