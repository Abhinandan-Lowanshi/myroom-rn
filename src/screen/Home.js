import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import FullScreenLoader from '../component/FullScreenLoader';
import {useSelector, useDispatch} from 'react-redux';
import {startL, updateHome} from '../redux/Slice';
import StyleGlobel from '../Style/StyleGlobel';
import getLocation from '../geoLocation/GetLocation';
import sendRequest from '../networking/ApiFunctions';
import RenderRoom from '../component/RenderRoom';
import EndPoints from '../networking/EndPoints';
import {setRoomDataHome, updateFav, setSearchUpdate} from '../redux/Slice';
import ScreenName from '../common/ScreenName';
import {favFunction} from '../common/APIFunctions';
import {useIsFocused} from '@react-navigation/native';
import NodataFound from '../component/NodataFound';
import {ImageSlider} from 'react-native-image-slider-banner';
import {hp} from '../common/CommonFunctions';
import LowOpacityLoader from '../component/LowOpacityLoader';
import Toast from 'react-native-simple-toast';
import {LogBox} from 'react-native';
import images from '../common/images';
import SliderView from '../component/sliderView/SliderView';

const Home = ({route, navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({error: '', header: ''});
  const data = useSelector(state => state.AllData.locationInfo);
  const favUpdate = useSelector(state => state.AllData.isFavUpdate);
  const searchUpdate = useSelector(state => state.AllData.searchUpdate);
  const roomDataHome = useSelector(state => state.AllData.roomDataHome);
  const dispatch = useDispatch();
  let counter = 10;
  const isFocused = useIsFocused();
  console.log(isFocused, 'isFocused');

  useEffect(() => {
    console.log('UseEffect');
    if (searchUpdate) {
      dispatch(startL(true));
      getData();
      dispatch(setSearchUpdate(false));
    }
  }, [searchUpdate]);

  useEffect(() => {
    if (favUpdate) {
      dispatch(startL(true));
      getData();
      dispatch(updateFav(false));
    }
  }, [isFocused]);
  useEffect(() => {
    setLoading(true);
    getData();
  }, [data]);
  const onPressRoom = item => {
    navigation.navigate(ScreenName.DetailsScreen, {
      item,
      onPressFav,
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'Non-serializable values were found in the navigation state',
    ]);
  }, []);

  const onReload = () => {
    setLoading(true);
    getData();
  };
  const onRefresh = () => {
    setRefreshing(true);
    getData();
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
    Toast.show(message, Toast.LONG);
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

  const prepareData = data => {
    let arr = data;
    if (data.length > 0) {
    }
    return arr;
  };
  const getData = () => {
    setIsFailed(false);
    if (data.longitude && data.latitude) {
      console.log(data.longitude, data.latitude, 'data.longitude');
      sendRequest(
        {
          user_id: 'Dummy',
          latitude: data.latitude,
          longitude: data.longitude,
          radius: 10,
        },
        EndPoints.findRoom,
        'POST',
      )
        .then(res => {
          setLoading(false);
          setRefreshing(false);
          dispatch(startL(false));
          if (res.status === true) {
            console.log(res.data.length, 'res');
            if (res.data.length > 0) {
              dispatch(setRoomDataHome(prepareData(res?.data)));
            } else {
              // setError({
              //   error: 'No rooms find at your location',
              //   header: 'Sorry!',
              // });
            }
          } else {
            setIsFailed(true);
            setError({
              error: res.message,
              header: '',
            });
          }
        })
        .catch(err => {
          setLoading(false);
          setIsFailed(true);
          setRefreshing(false);
          dispatch(startL(false));
          setError({
            error: '',
            header: '',
          });
        });
    }
  };

  const gotoUpload = () => {
    navigation.navigate(ScreenName.UploadNavigator);
  };

  const gotoSearch = () => {
    navigation.navigate(ScreenName.Search);
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={StyleGlobel.containerStyle}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {getLocation()}
      <SliderView
        isFocused={isFocused}
        onPresUpload={() => {
          gotoUpload();
        }}
        onPresSearch={() => {
          gotoSearch();
        }}
      />
      {loading ? (
        <LowOpacityLoader />
      ) : isFailed ? (
        <NodataFound message={error.error} header={error.header} />
      ) : (
        <View>
          <View style={{marginHorizontal: hp(1)}}>
            {roomDataHome?.length > 0 ? (
              <RenderRoom
                myRoomList={roomDataHome}
                onPress={onPressRoom}
                onPressFav={onPressFav}
                refreshing={false}
              />
            ) : null}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
const style = StyleSheet.create({
  previewImageContainerStyle: {
    borderRadius: hp(2),
  },
});
