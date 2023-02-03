import React, {useEffect, useState} from 'react';
import {ScrollView, Text, ToastAndroid, View} from 'react-native';
import FullScreenLoader from '../component/FullScreenLoader';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAllMyRooms,
  setFavData,
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
import {updateFavList} from '../common/FavFunction';
import {useCallback} from 'react';
import {useIsFocused} from '@react-navigation/native';
import NodataFound from '../component/NodataFound';
import Banner from '../component/Banner';
import {ImageSlider} from 'react-native-image-slider-banner';
const Home = ({route, navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFaild, setIsFaild] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({error: '', header: ''});
  const data = useSelector(state => state.AllData.locationInfo);
  const favUpdate = useSelector(state => state.AllData.isFavUpdate);
  const roomDataHome = useSelector(state => state.AllData.roomDataHome);
  console.log(roomDataHome);
  const dispatch = useDispatch();
  let counter = 10;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (favUpdate) {
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
  const getData = () => {
    setIsFaild(false);
    if (data.longitude && data.latitude) {
      sendRequest(
        {
          user_id: 'Dummy',
          latitude: 22.7658,
          longitude: 75.8705,
          radius: 10,
        },
        EndPoints.findRoom,
        'POST',
      )
        .then(res => {
          setLoading(false);
          setRefreshing(false);
          if (res.status === true) {
            console.log(res.data.length, 'res');
            if (res.data.length > 0) {
              dispatch(setRoomDataHome(res?.data));
            } else {
              // setError({
              //   error: 'No rooms find at your location',
              //   header: 'Sorry!',
              // });
            }
          } else {
            setIsFaild(true);
            setError({
              error: res.message,
              header: '',
            });
          }
        })
        .catch(err => {
          setLoading(false);
          setIsFaild(true);
          setRefreshing(false);
          setError({
            error: '',
            header: '',
          });
        });
    }
  };

  return (
    <ScrollView style={StyleGlobel.containerStyle}>
      {loading ? (
        <FullScreenLoader />
      ) : isFaild ? (
        <NodataFound message={error.error} header={error.header} />
      ) : (
        <View>
          <ImageSlider
            data={[
              {
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU',
              },
              {
                img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
              },
              {
                img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
              },
            ]}
            autoPlay={true}
            // onItemChanged={item => console.log('item', item)}
            closeIconColor="#fff"
          />
          {roomDataHome?.length > 0 ? (
            <RenderRoom
              myRoomList={roomDataHome}
              onPress={onPressRoom}
              onPressFav={onPressFav}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          ) : null}
        </View>
      )}
      {getLocation()}
    </ScrollView>
  );
};

export default Home;
