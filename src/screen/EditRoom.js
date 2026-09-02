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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setUploadData} from '../redux/Slice';
import Header from '../component/Header';
import LowOpacityLoader from '../component/LowOpacityLoader';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';

const EditRoom = props => {
  const {navigation} = props;
  const roomInfo = props?.route?.params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [name, setName] = useState(roomInfo?.rm_own_Fullname || '');
  const [nameError, setErrorName] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(
    roomInfo?.rm_own_mble_num || '',
  );
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [roomSize, setRoomSize] = useState(roomInfo?.rm_size || '');
  const [furnishedStatus, setFurnishedStatus] = useState(
    roomInfo?.rm_furnisd_status || '',
  );
  const [parkingStatus, setParkingStatus] = useState(
    roomInfo?.rm_prking_avblity || '',
  );
  const [availableStatus, setAvailableStatus] = useState(
    roomInfo?.rm_availble || '',
  );
  const [dependencyStatus, setDependencyStatus] = useState(
    roomInfo?.rm_depndecy || '',
  );
  const [whichFloor, setWhichFloor] = useState(roomInfo?.rm_flor || '');
  const [whichFloorError, setWhichFloorError] = useState(false);
  const [rent, setRent] = useState(roomInfo?.rm_rent || '');
  const [rentError, setRentError] = useState(false);

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
      rent.length < 3
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
    rent,
  ]);

  const nameOnChange = name => {
    setName(name);
    if (name !== '' && name.length < 4) {
      setErrorName(true);
    } else {
      setErrorName(false);
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
      rm_own_Fullname: name,
      rm_own_mble_num: mobileNumber,
      rm_size: roomSize,
      rm_furnisd_status: furnishedStatus,
      rm_availble: availableStatus,
      rm_prking_avblity: parkingStatus,
      rm_depndecy: dependencyStatus,
      rm_flor: whichFloor,
      rm_rent: rent,
    };
    let rowData = {
      room_id: roomInfo?.rm_pkey.toString(),
      data: data,
    };
    console.log(rowData);
    updateRoom({
      room_id: '52',
      data: {
        rm_own_fullname: 'vishal',
      },
    });
  };

  const updateRoom = data => {
    setLoading(true);
    sendRequest(data, EndPoints.editRoom, 'POST')
      .then(response => {
        console.log(response, 'Response');
        setLoading(false);
        if (response.status === true) {
          // navigation.navigate(ScreenName.Upload);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error, 'error');
      });
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
    <>
      <Header label={'Edit Room'} navigation={navigation} />
      <ScrollView style={StyleGlobel.containerStyle}>
        {loading && <LowOpacityLoader />}
        <View style={{marginBottom: hp(2)}}>
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
            value={roomSize}
            container={style.pickerstyle}
            onItemChange={value => setRoomSize(value?.value)}
            placeholder={'Select'}
            labelTop={'Select room size'}
            data={data.ROOM_SIZE}
          />

          <CustomPicker
            value={furnishedStatus}
            labelTop={'Select Furnished status'}
            placeholder={'Select'}
            container={style.pickerstyle}
            onItemChange={value => setFurnishedStatus(value?.value)}
            data={data.ROOM_STATUS_FR}
          />

          <CustomPicker
            value={availableStatus}
            labelTop={'Select availability of room'}
            placeholder={'Select'}
            container={style.pickerstyle}
            onItemChange={value => setAvailableStatus(value?.value)}
            data={data.ROOM_AVAILABLE}
          />

          <CustomPicker
            value={parkingStatus}
            container={style.pickerstyle}
            placeholder={'Select'}
            labelTop={'Select parking availability of room'}
            onItemChange={value => setParkingStatus(value?.value)}
            data={data.ROOM_PARKING_AVAILABILITY}
          />

          <CustomPicker
            value={dependencyStatus}
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

          <C_Button
            isLoading={false}
            onPress={() => onNextPress()}
            // outerContainer={style.outerContainer}
            isSubmitDisabled={isSubmitDisabled}
            label={'Next'}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default EditRoom;

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
