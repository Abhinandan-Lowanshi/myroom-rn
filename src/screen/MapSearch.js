import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import FullScreenLoader from '../component/FullScreenLoader';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAllMyRooms,
  setFavData,
  startL,
  UpdateFavData,
  updateHome,
} from '../redux/Slice';
import StyleGlobel from '../Style/StyleGlobel';
import getLocation from '../geoLocation/GetLocation';
import sendRequest from '../networking/ApiFunctions';
import RenderRoom2 from '../component/RenderRoom2';
import EndPoints from '../networking/EndPoints';
import {setRoomDataHome, updateFav} from '../redux/Slice';
import ScreenName from '../common/ScreenName';
import {favFunction} from '../common/APIFunctions';
import {useIsFocused} from '@react-navigation/native';
import {hp, RF} from '../common/CommonFunctions';
import MapView, {Marker} from 'react-native-maps';
import Colors from '../common/Colors';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import PopupRoomView from '../component/PopupRoomView';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/dist/Entypo';
import IconName from '../common/IconName';
import LowOpacityLoader from '../component/LowOpacityLoader';
import Custom_Image from '../component/Custom_Image';
import spinnerData from '../common/SpinnerData';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const MapSearch = ({route, navigation}) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [roomDataHome, setRoomDataHome] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);
  const data = useSelector(state => state.AllData.locationInfo);
  const favUpdate = useSelector(state => state.AllData.isFavUpdate);
  // const roomDataHome = useSelector(state => state.AllData.roomDataHome);
  const roomDataHomeTemp = useSelector(state => state.AllData.roomDataHome);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    setRoomDataHome(prepareData(roomDataHomeTemp));
  }, []);

  const prepareData = data => {
    let temp = [];
    data?.forEach((item, index) => {
      temp.push({...item, isSelected: index === 0 ? true : false});
    });
    console.log(temp, 'prepareData');
    return temp;
  };
  const performFavOp = data => {
    let temp = JSON.parse(JSON.stringify(roomDataHome));
    temp.map(item => {
      if (item?.rm_pkey === data?.roomId) {
        return (item.favorite_key = data?.like);
      } else return item;
    });
    dispatch(setRoomDataHome(temp));
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const onPressFav = async value1 => {
    let value = {...value1};
    let data = {
      user_id: 2,
      room_id: value?.roomId,
      fav_type: value?.like === true ? 1 : 0,
    };
    performFavOp(value);

    try {
      const response = await favFunction(data);
      if (response.status === true) {
        if (
          response?.message === 'Room removed to favorite list successfully.' ||
          response?.message === 'Room added to favorite list successfully.'
        ) {
          setIsUpdate(!isUpdate);
          dispatch(updateHome(true));
          showToast(response?.message);
          return true;
        } else {
          performFavOp({
            ...value,
            like: value?.like === true ? false : true,
          });
          return false;
        }
      } else {
        performFavOp({
          ...value,
          like: value?.like === true ? false : true,
        });
        showToast(response?.message);
        return false;
      }
    } catch (error) {
      console.log(error, 'error|||||||||||||');
      performFavOp({
        ...value,
        like: value?.like === true ? false : true,
      });
      return false;
    }
  };

  const renderSelectedRoom = item => {
    console.log(item, 'renderSelectedRoom');
    return (
      <TouchableOpacity
        style={style.containerRoomView}
        onPress={() => {
          navigation.navigate(ScreenName.DetailsScreen, {
            item,
            onPressFav,
          });
        }}
        activeOpacity={0.8}>
        <View>
          <Custom_Image
            uri={item?.images[0]?.img_name}
            container={style.imageContainer}
            imageStyle={style.image}
          />
          <View style={style.containerBottom}>
            <LowOpacityText
              label={item?.rm_availble}
              lowOpacityContainer={style.containerAvailable}
              container={style.containerAvailable2}
              textLabel={style.labelAvailable}
            />
            {getText(item) === '' ? null : (
              <LowOpacityText
                label={getText(item)}
                lowOpacityContainer={style.containerAvailable}
                container={style.containerOptional2}
                textLabel={style.labelAvailable}
              />
            )}
            <LowOpacityText
              label={item?.rm_size}
              lowOpacityContainer={style.containerAvailable}
              container={style.containerAvailable2}
              textLabel={style.labelAvailable}
            />
          </View>
        </View>
        <View style={style.containerInfo}>
          <Text style={style.labelName}>{item?.rm_own_Fullname}</Text>
          <Text style={style.labelAddress}>
            {`${item?.rm_house_no} ${item?.rm_colny} ${item?.rm_city}`}
          </Text>

          {true && <Text style={style.labelRent}>₹{item?.rm_rent}</Text>}
        </View>

        <TouchableOpacity
          style={style.favImage}
          onPress={() =>
            onPressFav({roomId: item?.rm_pkey, like: !item?.favorite_key})
          }>
          <Icon1
            name={'heart'}
            backgroundColor="red"
            color={item?.favorite_key === true ? Colors.RED : Colors.WHITE}
            size={hp(3)}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const LowOpacityText = ({
    label,
    container,
    textLabel,
    lowOpacityContainer,
  }) => {
    return (
      <View style={container}>
        <View style={[[style.lowOpacityContainer, lowOpacityContainer]]}></View>
        <Text style={[style.labelLow, textLabel]}>{label}</Text>
      </View>
    );
  };

  const getText = item => {
    console.log(
      item?.rm_prking_avblity,
      item?.rm_depndecy,
      item?.rm_prking_avblity,
      'getText',
    );
    let message = '';
    if (
      item?.rm_prking_avblity ===
      spinnerData.ROOM_PARKING_AVAILABILITY[0]?.label
    ) {
      message = 'Parking available';
    } else if (
      item?.rm_depndecy === spinnerData.ROOM_PARKING_AVAILABILITY[0]?.label
    ) {
      message = 'Independent Room';
    } else if (
      item?.rm_prking_avblity ===
      spinnerData.ROOM_PARKING_AVAILABILITY[1]?.label
    ) {
      message = item?.rm_prking_avblity;
    }
    return message;
  };

  const preDataOnMap = data => {
    let temp = JSON.parse(JSON.stringify(roomDataHomeTemp));
    temp.map((item, index) => {
      if (item?.rm_pkey === data?.rm_pkey) {
        return (item.isSelected = true);
      } else return (item.isSelected = false);
    });
    setRoomDataHome(temp);
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={StyleGlobel.containerStyle}>
      {data.length === 0 ? (
        <LowOpacityLoader />
      ) : (
        <View style={style.mapContainer}>
          {/* {selectedRoom?.rm_latitude && selectedRoom?.rm_latitude && ( */}
          <MapView
            style={style.map}
            initialRegion={{
              latitude: 22.7658,
              longitude: 75.8705,
              // latitude: data ? data?.latitude : 0.0,
              // longitude: data ? data?.longitude : 0.0,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            // initialRegion={{
            //   latitude: roomDataHome.length
            //     ? parseFloat(selectedRoom?.rm_latitude)
            //     : 0.0,
            //   longitude: roomDataHome.length
            //     ? parseFloat(selectedRoom?.rm_latitude)
            //     : 0.0,
            //   latitudeDelta: 0.015,
            //   longitudeDelta: 0.015,
            // }}
          >
            {roomDataHome?.length > 0
              ? roomDataHome?.map((item, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parseFloat(item?.rm_latitude),
                      longitude: parseFloat(item?.rm_longitude),
                    }}
                    onPress={() => {
                      setSelectedRoom(item);
                      preDataOnMap(item);
                    }}>
                    <View style={style.marker}>
                      <MaterialIcons
                        name={'location-pin'}
                        size={hp(6)}
                        color={item?.isSelected ? Colors.GREEN : Colors.PRIMARY}
                      />
                    </View>
                  </Marker>
                ))
              : null}
          </MapView>
          {renderSelectedRoom(
            selectedRoom === null ? roomDataHome[0] : selectedRoom,
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default MapSearch;
const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    activeOpacity: 0.3,
    backdropOpacity: 0.2,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flexDirection: 'row',
    marginHorizontal: hp(2),
  },
  image: {
    height: hp(5),
    width: hp(5),
    alignSelf: 'center',
    borderRadius: hp(1),
  },
  containerContent: {
    marginHorizontal: hp(2),
  },
  imageContainer: {
    height: hp(5),
    width: hp(5),
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
  },
  label: {
    color: Colors.BLACK,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: hp(3),
    marginTop: hp(1.5),
    marginBottom: hp(3),
  },
  labelBottom: {
    color: Colors.BLUE1,
    fontSize: RF(2),
  },
  parentContainer: {
    marginTop: '50%',
    backgroundColor: Colors.WHITE,
    borderRadius: hp(1),
    elevation: hp(1),
    width: '90%',
    alignSelf: 'center',
    // alignItems: 'center',
    paddingHorizontal: hp(2),
  },
  containerLabel: {
    alignSelf: 'center',
    flex: 1,
  },
  close: {
    alignSelf: 'flex-end',
    marginTop: hp(1.5),
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: hp(0.3),
    top: hp(0.2),
  },

  favImage: {
    right: hp(2),
    top: hp(2),
    position: 'absolute',
  },
  imageContainer: {
    width: '100%',
    height: hp(15),
    borderRadius: 100,
  },
  labelRent: {
    color: 'green',
    fontSize: RF(2),
    fontWeight: '700',
    marginLeft: 5,
    position: 'absolute',
    right: hp(0.5),
    alignSelf: 'center',
  },
  timestamp: {
    color: Colors.BLACK,
  },
  containerTime: {
    // backgroundColor: Colors.PRIMARY,
    padding: hp(0.5),
    borderRadius: hp(0.6),
    // marginTop: hp(1),
    marginLeft: hp(1),
  },
  image: {
    flex: 1,
    borderTopEndRadius: 7,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: hp(1),
    borderBottomRightRadius: hp(1),
  },
  lowOpacityContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: Colors.PRIMARY,
    opacity: 0.7,
    borderRadius: 5,
  },
  containerInfo: {marginHorizontal: hp(1.5)},
  labelName: {
    color: 'black',
    fontSize: RF(2),
    fontWeight: '600',
    marginTop: 5,
  },
  labelAddress: {
    color: 'black',
    fontSize: RF(1.3),
    fontWeight: '400',
    marginLeft: 5,
  },
  containerBottom: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    bottom: hp(1),
    justifyContent: 'space-around',
  },
  containerAvailable: {
    backgroundColor: Colors.PRIMARY,
    opacity: 0.7,
  },
  containerAvailable2: {
    borderRadius: 10,
  },
  labelAvailable: {
    color: 'black',
    fontSize: 10,
    marginHorizontal: hp(1),
    marginVertical: hp(0.3),
  },
  containerOptional: {
    backgroundColor: Colors.PRIMARY,
    opacity: 0.2,
  },
  containerOptional2: {
    borderRadius: 10,
  },
  containerRoomView: {
    marginHorizontal: hp(1),
    marginVertical: hp(1),
  },
});
