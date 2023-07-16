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
import {launchImageLibrary} from 'react-native-image-picker';
import C_Button from '../component/C_Button';
import ScreenName from '../common/ScreenName';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import localStorageOp from '../localStorage/LocalData';
import {uploadImage} from '../networking/ApiFunctions';

const Upload = ({navigation}) => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [roomSize, setRoomSize] = useState('');
  const [furnishedStatus, setFurnishedStatus] = useState('');
  const [deposit, setDeposit] = useState('');
  const [isDeposit, setIsDeposit] = useState('No');
  const [parkingStatus, setParkingStatus] = useState('');
  const [availableStatus, setAvailableStatus] = useState('');
  const [dependencyStatus, setDependencyStatus] = useState('');
  const [whichFloor, setWhichFloor] = useState('');
  const [whichFloorError, setWhichFloorError] = useState(false);
  const [roomLocation, setRoomLocation] = useState({});
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
  const isFocused = useIsFocused();
  const [image, setImage] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (
      ownerData?.name?.length < 4 ||
      ownerData?.mobile?.length < 10 ||
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
      description.length < 2 ||
      image?.length < 2 ||
      isDeposit
        ? deposit.length < 2
        : false
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
    image,
    deposit,
    isDeposit,
  ]);

  useEffect(() => {
    if (!isFocused) setRoomLocation({});
  }, [isFocused]);

  useEffect(() => {
    localStorageOp('', AsyncKeys.USERDATA, '')
      .then(data => {
        if (data?.data) {
          setOwnerData({
            name: data?.data?.usr_firstName,
            mobile: data?.data?.usr_phone,
          });
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
    if (houseNumber !== '' && houseNumber.length < 2) {
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

  const onChangeDeposit = deposit => {
    setDeposit(deposit);
    if (deposit !== '' && deposit.length < 2) {
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

  const onMapData = value => {
    setRoomLocation(value);
  };

  const handleMap = () => {
    navigation.navigate(ScreenName.GetLocationByMap, {onMapData, roomLocation});
  };

  const openCamera = async () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      selectionLimit: 0,
    };
    await launchImageLibrary(options, response => {
      let imageData = response?.assets;
      let temp = [...image];
      imageData?.forEach(item => {
        if (!image.some(data => data.fileName === item.fileName))
          temp.push(item);
      });
      setImage(temp);
    });
  };
  const RemoveFile = data => {
    let temp = image.filter(item => {
      return item.fileName !== data.fileName;
    });
    setImage(temp);
  };

  const showToast = message => {
    Toast.show(message, Toast.LONG);
  };

  const uploadRoom = async () => {
    setIsLoading(true);
    try {
      if (image?.length > 2) {
        var userData = await localStorageOp(false, AsyncKeys.USERDATA, '');
        const formdata = new FormData();
        image?.forEach(item => {
          formdata.append('Images', {
            uri: item?.uri,
            name: item?.fileName,
            type: item?.type,
          });
        });
        formdata.append('rm_usr_fkey', userData?.data?.usr_id);
        formdata.append('rm_own_Fullname', ownerData?.name);
        formdata.append('rm_own_mble_num', ownerData?.mobile);
        formdata.append('rm_furnisd_status', furnishedStatus);
        formdata.append('rm_availble', availableStatus);
        formdata.append('rm_prking_avblity', parkingStatus);
        formdata.append('rm_depndecy', dependencyStatus);
        formdata.append('rm_colny', colony);
        formdata.append('rm_house_no', houseNumber);
        formdata.append('rm_city', city);
        formdata.append('rm_state', '');
        formdata.append('rm_size', roomSize);
        formdata.append('rm_rent', rent);
        formdata.append('rm_flor', whichFloor);
        formdata.append('rm_latitude', roomLocation?.latitude);
        formdata.append('rm_longitude', roomLocation?.longitude);
        formdata.append('rm_description', description);

        uploadImage(formdata, EndPoints.addRoom, 'POST')
          .then(response => {
            setIsLoading(false);
            showToast(response?.message);
            if (response.status === true) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: ScreenName.TabComponent}],
                }),
              );
              console.log(response, 'Response');
            } else {
              console.log(response, 'error');
            }
          })
          .catch(error => {
            setIsLoading(false);
          });
      }
    } catch {
      setIsLoading(false);
    }
  };

  const renderImages = () => {
    return (
      <FlatList
        data={image}
        renderItem={({item}) => {
          return (
            <View style={style.containerImage}>
              <Image source={{uri: item.uri}} style={style.imageStyle}></Image>
              <View style={style.imageContainer}>
                <Text style={{color: 'black', fontSize: 11}}>
                  {item.fileName}
                </Text>
              </View>
              <TouchableOpacity
                disabled={isLoading}
                onPress={() => RemoveFile(item)}
                style={style.containerRemove}>
                <Text style={style.labelRemove}>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        }}></FlatList>
    );
  };

  return (
    <ScrollView style={StyleGlobel.containerStyle}>
      <View style={{marginBottom: hp(2)}}>
        <CustomInputText
          disabled
          onChangeText={nameOnChange}
          value={ownerData?.name}
          maxLength={30}
          outerContainer={style.outerContainer}
          placeholder={'Name'}
          errorMessage={'Enter valid Name'}
        />
        <CustomInputText
          disabled
          maxLength={10}
          isNumeric={true}
          value={ownerData?.mobile}
          placeholder={'Mobile Number'}
          errorMessage={'Invalid Mobile Number'}
        />

        <CustomPicker
          isLoading={isLoading}
          container={style.pickerstyle}
          onItemChange={value => setRoomSize(value?.value)}
          placeholder={'Select'}
          labelTop={'Select room size'}
          data={data.ROOM_SIZE}
        />

        <CustomPicker
          isLoading={isLoading}
          labelTop={'Select Furnished status'}
          placeholder={'Select'}
          container={style.pickerstyle}
          onItemChange={value => setFurnishedStatus(value?.value)}
          data={data.ROOM_STATUS_FR}
        />
        {/* <CustomPicker
          isLoading={isLoading}
          labelTop={'Is deposit applicable'}
          placeholder={'Select'}
          container={style.pickerstyle}
          onItemChange={value => setIsDeposit(value?.value)}
          data={data.ROOM_PARKING_AVAILABILITY}
        /> */}
        {isDeposit === 'Yes' && (
          <CustomInputText
            disabled
            onChangeText={onChangeDeposit}
            maxLength={10}
            isNumeric={true}
            value={deposit}
            placeholder={'Enter Deposit Amount'}
            errorMessage={'Invalid Deposit Amount'}
          />
        )}
        <CustomPicker
          isLoading={isLoading}
          labelTop={'Select availability of room'}
          placeholder={'Select'}
          container={style.pickerstyle}
          onItemChange={value => setAvailableStatus(value?.value)}
          data={data.ROOM_AVAILABLE}
        />

        <CustomPicker
          isLoading={isLoading}
          container={style.pickerstyle}
          placeholder={'Select'}
          labelTop={'Select parking availability of room'}
          onItemChange={value => setParkingStatus(value?.value)}
          data={data.ROOM_PARKING_AVAILABILITY}
        />

        <CustomPicker
          isLoading={isLoading}
          container={style.pickerstyle}
          placeholder={'Select'}
          labelTop={'Select independency of room'}
          onItemChange={value => setDependencyStatus(value?.value)}
          data={data.ROOM_DEPENDENT_STATUS}
        />

        <CustomInputText
          disabled={isLoading}
          onChangeText={onWhichFloorOnChange}
          value={whichFloor}
          maxLength={20}
          outerContainer={style.outerContainer}
          error={whichFloorError}
          placeholder={'floor'}
          errorMessage={'Enter floor'}
        />

        <CustomInputText
          disabled={isLoading}
          onChangeText={rentOnChange}
          value={rent}
          maxLength={12}
          outerContainer={style.outerContainer}
          error={rentError}
          isNumeric={true}
          placeholder={'Rent'}
          errorMessage={'Enter Rent'}
        />
        <CustomInputText
          disabled={isLoading}
          maxLength={30}
          onChangeText={houseNumberOnChange}
          value={houseNumber}
          outerContainer={style.outerContainer}
          error={houseNumberError}
          placeholder={'House Number'}
          errorMessage={'Enter House Number'}
        />

        <CustomInputText
          disabled={isLoading}
          maxLength={30}
          onChangeText={colonyOnChange}
          value={colony}
          outerContainer={style.outerContainer}
          error={colonyError}
          placeholder={'Colony'}
          errorMessage={'Enter Colony'}
        />
        <CustomInputText
          disabled={isLoading}
          maxLength={30}
          onChangeText={cityOnChange}
          value={city}
          outerContainer={style.outerContainer}
          error={cityError}
          placeholder={'City'}
          errorMessage={'Enter City'}
        />
        <CustomInputText
          disabled={isLoading}
          multiline={true}
          maxLength={300}
          onChangeText={descriptionOnChange}
          value={description}
          InputTextStyleP={style.InputTextStyle}
          error={descriptionError}
          placeholder={'Description'}
          errorMessage={'Enter Description'}
        />
        <TouchableOpacity
          disabled={isLoading}
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

        <TouchableOpacity
          disabled={isLoading}
          onPress={() => openCamera()}
          style={style.uploadContainer}>
          <Text style={style.labelUpload}>Upload photos of the residence</Text>
          <Text style={style.labelLimit}>
            Note : Upload minimum 2 and maximum 9 photos.
          </Text>
        </TouchableOpacity>
        {renderImages()}

        <C_Button
          isLoading={isLoading}
          onPress={uploadRoom}
          isSubmitDisabled={isSubmitDisabled}
          label={'Upload'}
        />
      </View>
    </ScrollView>
  );
};

export default Upload;

const style = StyleSheet.create({
  pickerstyle: {
    elevation: 5,
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
  labelLimit: {
    color: Colors.BLACK,
    fontSize: RF(1.2),
  },
  uploadContainer: {
    height: hp(10),
    marginHorizontal: hp(3),
    marginTop: hp(2),
    elevation: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: hp(0.5),
    borderColor: Colors.GREY,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelUpload: {
    color: Colors.BLACK,
    fontSize: RF(2.2),
  },
  labelRemove: {
    color: 'red',
    fontSize: 13,
  },
  containerRemove: {
    marginRight: 10,
  },
  imageStyle: {
    width: 40,
    height: 40,
    marginLeft: 10,
    elevation: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  outerContainer: {
    marginTop: hp(1),
  },
  labelHouseNoMessage: {
    color: Colors.BLACK1,
    fontSize: RF(1.3),
    marginLeft: hp(3),
    marginTop: hp(1),
  },
  imageContainer: {
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  containerImage: {
    backgroundColor: Colors.WHITE,
    marginTop: 5,
    elevation: 10,
    paddingVertical: 5,
    marginHorizontal: hp(3),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 2,
  },
});
