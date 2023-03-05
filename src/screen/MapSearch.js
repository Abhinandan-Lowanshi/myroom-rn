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
import RenderRoom from '../component/RenderRoom';
import EndPoints from '../networking/EndPoints';
import {setRoomDataHome, updateFav} from '../redux/Slice';
import ScreenName from '../common/ScreenName';
import {favFunction} from '../common/APIFunctions';
import {useIsFocused} from '@react-navigation/native';
import {hp, RF} from '../common/CommonFunctions';
import MapView, {Marker} from 'react-native-maps';
import Colors from '../common/Colors';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import PopupRoomView from '../component/PopupRoomView';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/dist/Entypo';
import IconName from '../common/IconName';
import LowOpacityLoader from '../component/LowOpacityLoader';

const MapSearch = ({route, navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [item, setItem] = useState({});
  const [checkRoomData, setCheck] = useState(0);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState({error: '', header: ''});
  const data = useSelector(state => state.AllData.locationInfo);
  const favUpdate = useSelector(state => state.AllData.isFavUpdate);
  const roomDataHome = useSelector(state => state.AllData.roomDataHome);
  console.log(roomDataHome);
  const dispatch = useDispatch();
  let counter = 10;
  const isFocused = useIsFocused();
  console.log(roomDataHome.length, 'roomDataHome12');

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
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={StyleGlobel.containerStyle}>
      {data.length === 0 ? (
        <LowOpacityLoader />
      ) : (
        <View style={style.mapContainer}>
          <MapView
            style={style.map}
            initialRegion={{
              latitude: data ? data?.latitude : 0.0,
              longitude: data ? data?.longitude : 0.0,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}>
            {roomDataHome?.length > 0
              ? roomDataHome?.map((item, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parseFloat(item?.rm_latitude),
                      longitude: parseFloat(item?.rm_longitude),
                    }}
                    onPress={() => {
                      console.log(item, 'DetailsScreen1');
                      navigation.navigate(ScreenName.DetailsScreen, {
                        item,
                        onPressFav,
                      });
                    }}>
                    <View style={style.marker}>
                      <FontAwesome
                        name={'home'}
                        size={hp(3)}
                        color={Colors.PRIMARY}
                      />
                      <View style={style.imageContainer}>
                        <FastImage
                          source={{uri: item?.images[0]?.img_name}}
                          style={style.image}
                          resizeMode={FastImage.resizeMode.stretch}
                        />
                        {item?.favorite_key && (
                          <Icon
                            style={style.icon}
                            name={IconName.heartActive}
                            size={hp(1.5)}
                            color={Colors.RED}
                          />
                        )}
                      </View>
                    </View>
                  </Marker>
                ))
              : null}
          </MapView>
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
});
