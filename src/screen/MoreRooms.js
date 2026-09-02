import react, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import RenderRoom from '../component/RenderRoom';
import sendRequest from '../networking/ApiFunctions';
import StyleGlobel from '../Style/StyleGlobel';
import {useSelector, useDispatch} from 'react-redux';
import {setFavData, setRoomDataHome, updateFav, startL} from '../redux/Slice';
import ScreenName from '../common/ScreenName';
import {favFunction} from '../common/APIFunctions';
import {useIsFocused} from '@react-navigation/native';
import Colors from '../common/Colors';
import {RF, hp} from '../common/CommonFunctions';
import LowOpacityLoader from '../component/LowOpacityLoader';
import Toast from 'react-native-simple-toast';
import Header from '../component/Header';
import Labels from '../common/labels';

const MoreRooms = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const roomDataHome = useSelector(state => state.AllData.roomDataHome);
  const dispatch = useDispatch();

  const onPressRoom = item => {
    navigation.navigate(ScreenName.DetailsScreen, {
      item,
      onPressFav,
    });
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
      performFavOp({
        ...value,
        like: value?.like === true ? false : true,
      });
      return false;
    }
  };
  const showToast = message => {
    Toast.show(message, Toast.LONG);
  };
  return (
    <View style={StyleGlobel.containerStyle}>
      <Header label={Labels.AllRooms} navigation={navigation} />
      {false ? (
        <LowOpacityLoader />
      ) : roomDataHome?.length > 0 ? (
        <RenderRoom
          flat={style.container}
          myRoomList={roomDataHome}
          onPress={onPressRoom}
          onPressFav={onPressFav}
          //   refreshing={refreshing}
          //   onRefresh={onRefresh}
        />
      ) : (
        <View style={style.containerNoData}>
          <Text style={style.labelNoData}>No Data Found</Text>
        </View>
      )}
    </View>
  );
};

export default MoreRooms;

const style = StyleSheet.create({
  container: {
    marginHorizontal: hp(1),
  },
  containerNoData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelNoData: {
    color: Colors.BLACK,
    fontSize: RF(2.8),
    fontWeight: '600',
    fontFamily: 'AlNile-Bold',
  },
});
