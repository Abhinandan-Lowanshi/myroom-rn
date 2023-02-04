import react, {useEffect, useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import FullScreenLoader from '../component/FullScreenLoader';
import RenderRoom from '../component/RenderRoom';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import StyleGlobel from '../Style/StyleGlobel';
import {useSelector, useDispatch} from 'react-redux';
import {setFavData, updateHome, updateFav, startL} from '../redux/Slice';
import ScreenName from '../common/ScreenName';
import {favFunction} from '../common/APIFunctions';
import {useIsFocused} from '@react-navigation/native';
import Colors from '../common/Colors';
import {RF} from '../common/CommonFunctions';
const Fav = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const favList = useSelector(state => state.AllData.favData);
  const isHomeUpdate = useSelector(state => state.AllData.isHomeUpdate);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isHomeUpdate) {
      dispatch(startL(true));
      getData();
      dispatch(updateHome(false));
    }
  }, [isFocused]);

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };
  const onPressRoom = item => {
    navigation.navigate(ScreenName.DetailsScreen, {
      item,
      onPressFav,
    });
  };
  const getData = () => {
    sendRequest(
      {
        user_id: 'Dummy',
      },
      EndPoints.favoriteList,
      'POST',
    )
      .then(res => {
        setRefreshing(false);
        setLoading(false);
        dispatch(startL(false));
        dispatch(updateHome(false));
        dispatch(setFavData(res?.data));
      })
      .catch(err => {
        dispatch(startL(false));
        setLoading(false);
        setRefreshing(false);
      });
  };
  const performFavOp = data => {
    let temp = JSON.parse(JSON.stringify(favList));
    temp.map(item => {
      if (item?.rm_pkey === data?.roomId) {
        return (item.favorite_key = data?.like);
      } else return item;
    });
    dispatch(setFavData(temp));
  };
  const onPressFav = async value1 => {
    let value = {...value1};
    let data = {
      user_id: '2',
      room_id: value?.roomId,
      fav_type: value?.like === true ? 1 : 0,
    };
    performFavOp(value);
    try {
      const response = await favFunction(data);
      if (response.status === true) {
        showToast(response?.message);
        if (
          response?.message === 'Room removed to favorite list successfully.' ||
          response?.message === 'Room added to favorite list successfully.'
        ) {
          dispatch(updateHome(true));
          dispatch(updateFav(true));
          return true;
        } else {
          // performFavOp(value);
          performFavOp({
            ...value,
            like: value?.like === true ? false : true,
          });
          return false;
        }
        // showToast(response?.message);
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
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  return (
    <View style={StyleGlobel.containerStyle}>
      {loading ? (
        <FullScreenLoader />
      ) : favList?.length > 0 ? (
        <RenderRoom
          myRoomList={favList}
          onPress={onPressRoom}
          onPressFav={onPressFav}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: RF(2.8),
              fontWeight: '600',
              fontFamily: 'AlNile-Bold',
            }}>
            No Data Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default Fav;
