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
import {setUploadData} from '../redux/Slice';
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
  const [roomLocation, setRoomLocation] = useState('');
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

  useEffect(() => {
    if (
      name.length < 4 ||
      mobileNumber.length < 10 ||
      roomSize.length === 0 ||
      furnishedStatus.length === 0 ||
      availableStatus === 0 ||
      parkingStatus.length === 0 ||
      dependencyStatus.length === 0 ||
      whichFloor.length < 2 ||
      roomLocation.length < 2 ||
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
    name,
    mobileNumber,
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

  const nameOnChange = name => {
    setName(name);
    if (name !== '' && name.length < 4) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  };
  const locationOnChange = location => {
    setRoomLocation(location);
    if (location !== '' && location.length < 2) {
      setRoomLocationError(true);
    } else {
      setRoomLocationError(false);
    }
  };
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

  const onNextPress = () => {
    let data = {
      rm_usr_fkey: 2,
      rm_own_Fullname: name,
      rm_own_mble_num: mobileNumber,
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
      rm_latitude: '22.7149',
      rm_longitude: '75.8899',
      rm_description: description,
    };
    dispatch(setUploadData(data));
    navigation.navigate(ScreenName.UploadFormSTP2);
  };
  const mobileNumberOnChange = mobileNumber => {
    setMobileNumber(mobileNumber);
    if (mobileNumber !== '' && mobileNumber.length < 10) {
      setMobileNumberError(true);
    } else {
      setMobileNumberError(false);
    }
  };
  return (
    <ScrollView style={StyleGlobel.containerStyle}>
      <View style={{marginBottom: hp(2)}}>
        <Stapper fromSTP1={true} />
        <CustomInputText
          onChangeText={nameOnChange}
          value={name}
          maxLength={30}
          error={nameError}
          outerContainer={style.outerContainer}
          placeholder={'Enter Name'}
          errorMessage={'Enter valid Name'}
        />
        <CustomInputText
          maxLength={10}
          isNumeric={true}
          onChangeText={mobileNumberOnChange}
          value={mobileNumber}
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
        <Text style={style.labelHouseNoMessage}>
          Don't worry if your house number shows wrong.
        </Text>
        <CustomInputText
          onChangeText={locationOnChange}
          value={roomLocation}
          maxLength={100}
          outerContainer={style.outerContainer}
          error={roomLocationError}
          placeholder={'Room Location'}
          errorMessage={'Enter Room Location'}
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
    color: Colors.BLACK1,
    fontSize: RF(1.3),
    marginLeft: hp(3),
    marginTop: hp(1),
  },
});
