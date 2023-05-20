import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import CustomPicker from '../component/CustomPicker';
import CustomInputText from '../component/InputText';
import {hp, RF} from '../common/CommonFunctions';
import data from '../common/SpinnerData';
import StyleGlobel from '../Style/StyleGlobel';
import Colors from '../common/Colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import C_Button from '../component/C_Button';
import ScreenName from '../common/ScreenName';
import {useSelector, useDispatch} from 'react-redux';
import UploadFormSTP2 from './UploadFormSTP2';
import Stapper from '../component/Stapper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setOwnerData, setUploadData} from '../redux/Slice';
import {useIsFocused} from '@react-navigation/native';
import localStorageOp from '../localStorage/LocalData';

const Stack = createNativeStackNavigator();

const UploadNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ScreenName.Upload} component={Upload} />
      <Stack.Screen
        name={ScreenName.UploadFormSTP2}
        component={UploadFormSTP2}
      />
    </Stack.Navigator>
  );
};
const Upload = ({navigation}) => {
  const dispatch = useDispatch();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [name, setName] = useState('');
  const [nameError, setErrorName] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [roomSize, setRoomSize] = useState('');
  const [roomSizeError, setRoomSizeError] = useState(false);
  const [furnishedStatus, setFurnishedStatus] = useState('');
  const [furnishedStatusError, setFurnishedStatusError] = useState(false);
  const [parkingStatus, setParkingStatus] = useState('');
  const [parkingStatusError, setParkingStatusError] = useState(false);
  const [availableStatus, setAvailableStatus] = useState('');
  const [availableStatusError, etAvailableStatusError] = useState(false);
  const [dependencyStatus, setDependencyStatus] = useState('');
  const [dependencyStatusError, setDependencyStatusError] = useState(false);
  const [whichFloor, setWhichFloor] = useState('');
  const [whichFloorError, setWhichFloorError] = useState(false);
  const [roomLocation, setRoomLocation] = useState({});
  const [roomLocationError, setRoomLocationError] = useState(false);
  const [houseNumber, setHouseNumber] = useState('');
  const [houseNumberError, setHouseNumberError] = useState(false);
  const [rent, setRent] = useState('');
  const [rentError, setRentError] = useState(false);
  const [colony, setColony] = useState('');
  const [colonyError, setColonyError] = useState(false);
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [userData, setUserData] = useState('');
  const isFocused = useIsFocused();
  const OwnerData = useSelector(state => state.AllData.OwnerData);

  useEffect(() => {
    if (
      OwnerData?.name?.length < 4 ||
      OwnerData?.mobile?.length < 10 ||
      roomSize.length === 0 ||
      furnishedStatus.length === 0 ||
      availableStatus === 0 ||
      parkingStatus.length === 0 ||
      dependencyStatus.length === 0 ||
      whichFloor.length < 2 ||
      Object.keys(roomLocation).length === 0 ||
      rent.length < 3 ||
      houseNumber.length < 1 ||
      colony.length < 2 ||
      city.length < 2 ||
      description.length < 2
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [
    roomSize,
    furnishedStatus,
    availableStatus,
    parkingStatus,
    dependencyStatus,
    whichFloor,
    roomLocation,
    rent,
    houseNumber,
    colony,
    city,
    description,
  ]);

  useEffect(() => {
    if (!isFocused) setRoomLocation({});
  }, [isFocused]);

  useEffect(() => {
    localStorageOp('', AsyncKeys.USERDATA, '')
      .then(data => {
        if (data?.data) {
          dispatch(
            setOwnerData({
              name: data?.data?.usr_firstName,
              mobile: data?.data?.usr_phone,
            }),
          );
          // setName(data?.data?.usr_firstName);
          // setMobileNumber(data?.data?.usr_phone);
        }
      })
      .catch(() => {});
  }, []);
  const nameOnChange = name => {
    // setName(name);
    // if (name !== '' && name.length < 4) {
    //   setErrorName(true);
    // } else {
    //   setErrorName(false);
    // }
  };

  // const locationOnChange = location => {
  //   setRoomLocation(location);
  //   if (location !== '' && location.length < 2) {
  //     setRoomLocationError(true);
  //   } else {
  //     setRoomLocationError(false);
  //   }
  // };

  const houseNumberOnChange = houseNumber => {
    setHouseNumber(houseNumber);
    if (houseNumber !== '' && houseNumber.length < 1) {
      setHouseNumberError(true);
    } else {
      setHouseNumberError(false);
    }
  };

  const cityOnChange = city => {
    setCity(city);
    if (city !== '' && city.length < 2) {
      setCityError(true);
    } else {
      setCityError(false);
    }
  };

  const descriptionOnChange = description => {
    setDescription(description);
    if (description !== '' && description.length < 2) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };

  const colonyOnChange = colony => {
    setColony(colony);
    if (colony !== '' && colony.length < 2) {
      setColonyError(true);
    } else {
      setColonyError(false);
    }
  };

  const rentOnChange = rent => {
    setRent(rent);
    if (rent !== '' && rent.length < 3) {
      setRentError(true);
    } else {
      setRentError(false);
    }
  };

  const onWhichFloorOnChange = whichFloor => {
    setWhichFloor(whichFloor);
    if (whichFloor !== '' && whichFloor.length < 2) {
      setWhichFloorError(true);
    } else {
      setWhichFloorError(false);
    }
  };

  const CoordinateView = props => {
    return (
      <View style={{}}>
        <Text
          style={{
            fontSize: RF(1.6),
            color: Colors.BLACK,
          }}>
          {props?.label}
        </Text>
        <Text
          style={{
            width: '60%',
            fontSize: RF(1.6),
            color: Colors.WHITE,
            backgroundColor: Colors.PRIMARYLITE,
            borderRadius: 3,
            padding: hp(1),
          }}>
          {props.coordinate}
        </Text>
      </View>
    );
  };
  const onNextPress = () => {
    let data = {
      rm_usr_fkey: 2,
      rm_own_Fullname: OwnerData?.name,
      rm_own_mble_num: OwnerData?.mobile,
      rm_size: roomSize,
      rm_furnisd_status: furnishedStatus,
      rm_availble: availableStatus,
      rm_prking_avblity: parkingStatus,
      rm_depndecy: dependencyStatus,
      rm_flor: whichFloor,
      rm_rent: rent,
      rm_house_no: houseNumber,
      rm_colny: colony,
      rm_city: city,
      rm_state: '',
      rm_latitude: roomLocation?.latitude,
      rm_longitude: roomLocation?.longitude,
      rm_description: description,
    };
    dispatch(setUploadData(data));
    navigation.navigate(ScreenName.UploadFormSTP2);
  };
  const mobileNumberOnChange = mobileNumber => {
    // setMobileNumber(mobileNumber);
    // if (mobileNumber !== '' && mobileNumber.length < 10) {
    //   setMobileNumberError(true);
    // } else {
    //   setMobileNumberError(false);
    // }
  };
  const onMapData = value => {
    setRoomLocation(value);
  };
  const handleMap = () => {
    navigation.navigate(ScreenName.GetLocationByMap, {onMapData, roomLocation});
  };

  return (
    <ScrollView style={StyleGlobel.containerStyle}>
      <View style={{marginBottom: hp(2)}}>
        <Stapper fromSTP1={true} />
        <CustomInputText
          disabled
          onChangeText={nameOnChange}
          value={OwnerData?.name}
          maxLength={30}
          error={nameError}
          outerContainer={style.outerContainer}
          placeholder={'Enter Name'}
          errorMessage={'Enter valid Name'}
        />
        <CustomInputText
          disabled
          maxLength={10}
          isNumeric={true}
          onChangeText={mobileNumberOnChange}
          value={OwnerData?.mobile}
          error={mobileNumberError}
          placeholder={'Enter Mobile Number'}
          errorMessage={'Invalid Mobile Number'}
        />

        <CustomPicker
          container={style.pickerstyle}
          onItemChange={value => setRoomSize(value?.value)}
          placeholder={'Select'}
          labelTop={'Select room size'}
          data={data.ROOM_SIZE}
        />

        <CustomPicker
          labelTop={'Select Furnished status'}
          placeholder={'Select'}
          container={style.pickerstyle}
          onItemChange={value => setFurnishedStatus(value?.value)}
          data={data.ROOM_STATUS_FR}
        />
        <CustomPicker
          labelTop={'Select availability of room'}
          placeholder={'Select'}
          container={style.pickerstyle}
          onItemChange={value => setAvailableStatus(value?.value)}
          data={data.ROOM_AVAILABLE}
        />

        <CustomPicker
          container={style.pickerstyle}
          placeholder={'Select'}
          labelTop={'Select parking availability of room'}
          onItemChange={value => setParkingStatus(value?.value)}
          data={data.ROOM_PARKING_AVAILABILITY}
        />

        <CustomPicker
          container={style.pickerstyle}
          placeholder={'Select'}
          labelTop={'Select independency of room'}
          onItemChange={value => setDependencyStatus(value?.value)}
          data={data.ROOM_DEPENDENT_STATUS}
        />

        <CustomInputText
          onChangeText={onWhichFloorOnChange}
          value={whichFloor}
          maxLength={20}
          outerContainer={style.outerContainer}
          error={whichFloorError}
          placeholder={'On which floor'}
          errorMessage={'Enter floor'}
        />

        <CustomInputText
          onChangeText={rentOnChange}
          value={rent}
          maxLength={12}
          outerContainer={style.outerContainer}
          error={rentError}
          isNumeric={true}
          placeholder={'Enter Rent'}
          errorMessage={'Enter Rent'}
        />
        <CustomInputText
          maxLength={30}
          onChangeText={houseNumberOnChange}
          value={houseNumber}
          outerContainer={style.outerContainer}
          error={houseNumberError}
          placeholder={'Enter House Number'}
          errorMessage={'Enter House Number'}
        />

        <CustomInputText
          maxLength={30}
          onChangeText={colonyOnChange}
          value={colony}
          outerContainer={style.outerContainer}
          error={colonyError}
          placeholder={'Enter Colony'}
          errorMessage={'Enter Colony'}
        />
        <CustomInputText
          maxLength={30}
          onChangeText={cityOnChange}
          value={city}
          outerContainer={style.outerContainer}
          error={cityError}
          placeholder={'Enter City'}
          errorMessage={'Enter City'}
        />
        <CustomInputText
          multiline={true}
          maxLength={300}
          onChangeText={descriptionOnChange}
          value={description}
          InputTextStyleP={style.InputTextStyle}
          error={descriptionError}
          placeholder={'Enter Description'}
          errorMessage={'Enter Description'}
        />
        <TouchableOpacity
          style={{
            width: '90%',
            justifyContent: 'center',
            alignSelf: 'center',
            flexDirection: 'column',
            backgroundColor:
              Object.keys(roomLocation).length !== 0
                ? Colors.PRIMARY
                : Colors.PRIMARYLITE1,
            borderRadius: hp(1),
            paddingVertical: hp(1),
            paddingHorizontal: hp(2),
            marginTop: hp(1),
          }}
          onPress={handleMap}>
          <Text
            style={{
              fontSize: RF(1.6),
              color: Colors.WHITE,
              alignSelf: 'center',
            }}>
            {Object.keys(roomLocation).length !== 0
              ? 'Location Added'
              : 'Tap to add room location for better room finding'}
          </Text>

          {Object.keys(roomLocation).length !== 0 && (
            <CoordinateView
              coordinate={roomLocation?.latitude}
              label={'Latitude'}
            />
          )}
          {Object.keys(roomLocation).length !== 0 && (
            <CoordinateView
              coordinate={roomLocation?.longitude}
              label={'Longitude'}
            />
          )}
        </TouchableOpacity>
        <C_Button
          isLoading={false}
          onPress={() => onNextPress()}
          // outerContainer={style.outerContainer}
          isSubmitDisabled={isSubmitDisabled}
          label={'Next'}
        />
      </View>
    </ScrollView>
  );
};

export default UploadNavigator;

const style = StyleSheet.create({
  pickerstyle: {
    elevation: 5,
    // marginTop: hp(2.3),
  },
  outerContainer: {
    marginTop: hp(1),
  },
  InputTextStyle: {
    marginTop: hp(1),
    height: hp(10),
    textAlignVertical: 'top',
  },
  labelHouseNoMessage: {
    color: Colors.RED,
    fontSize: RF(1.3),
    marginLeft: hp(3),
    marginTop: hp(1),
  },
});
