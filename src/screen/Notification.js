import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import TimeAgo from 'react-native-timeago';
import Colors from '../common/Colors';
import {hp, RF} from '../common/CommonFunctions';
import Labels from '../common/labels';
import Header from '../component/Header';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import StyleGlobel from '../Style/StyleGlobel';
import ScreenName from '../common/ScreenName';
import LowOpacityLoader from '../component/LowOpacityLoader';
import {favFunction} from '../common/APIFunctions';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {setFilteredData, setRoomDataHome} from '../redux/Slice';
import images from '../common/images';
import {logout} from '../component/LogOut';

const Notification = ({route, navigation}) => {
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const roomDataHome = useSelector(state => state.AllData.roomDataHome);
  const filteredData = useSelector(state => state.AllData.filteredData);
  const accountData = useSelector(state => state.AllData.accountData);

  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = () => {
    setLoading(true);
    sendRequest(
      {
        id: accountData?.data?.usr_id,
      },
      EndPoints.getNotification,
      'POST',
    )
      .then(res => {
        if (res.status === true) {
          setLoading(false);
          if (res.status === true) {
            if (res.data.length) {
              setNotification(res.data);
            }
          }
        } else {
          if (response?.message === 'Invalid authentication.') {
            logout(navigation);
          }
        }
      })
      .catch(err => {
        setLoading(false);
      });
  };

  const renderRoom = ({item}) => {
    return (
      <TouchableOpacity
        style={style.containerNotification}
        onPress={() => {
          navigation.navigate(ScreenName.DetailsScreen, {
            roomId: item?.payload?.rm_pkey,
            isServer: true,
            onPressFav,
          });
        }}>
        <View style={style.containerTitle}>
          {/* <View style={style.dot} /> */}
          <Image style={style.ownerImage} source={images.profileIcon}></Image>
          <View style={style.containerMessage}>
            <Text style={style.labelTitle}>{item?.payload?.title}</Text>
            <TimeAgo style={style.labelTime} time={item?.createdAt} />
          </View>
        </View>
        <View style={style.line} />
      </TouchableOpacity>
    );
  };

  const showToast = message => {
    Toast.show(message, Toast.LONG);
  };

  const performFavOp = data => {
    let temp = JSON.parse(JSON.stringify(roomDataHome));
    temp.map(item => {
      if (item?.rm_pkey === data?.roomId) {
        return (item.favorite_key = data?.like);
      } else return item;
    });
    let tempFil = JSON.parse(JSON.stringify(filteredData));
    tempFil.map(item => {
      if (item?.rm_pkey === data?.roomId) {
        return (item.favorite_key = data?.like);
      } else return item;
    });

    dispatch(setRoomDataHome(temp));
    dispatch(setFilteredData(tempFil));
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
      performFavOp({
        ...value,
        like: value?.like === true ? false : true,
      });
      return false;
    }
  };
  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <Header label={Labels?.Notification} navigation={navigation} />
      {loading && <LowOpacityLoader />}
      <FlatList data={notification} renderItem={renderRoom} style={{flex: 1}} />
    </SafeAreaView>
  );
};

export default Notification;
const style = StyleSheet.create({
  containerNotification: {
    marginHorizontal: hp(2),
    marginTop: hp(2),
  },
  labelTitle: {
    color: Colors.BLACK,
    fontSize: RF(1.8),
    marginLeft: hp(0.5),
  },
  labelTime: {
    color: Colors.BLACK,
    marginBottom: hp(1),
    fontSize: RF(1.2),
    marginLeft: hp(0.5),
    // alignSelf: 'flex-end',
  },
  containerTitle: {
    flexDirection: 'row',
  },
  dot: {
    height: hp(1),
    width: hp(1),
    backgroundColor: Colors.PRIMARY,
    borderRadius: hp(90),
    alignSelf: 'center',
  },
  line: {
    height: hp(0.1),
    backgroundColor: Colors.GREY1,
  },
  ownerImage: {
    height: hp(6),
    width: hp(6),
    borderRadius: hp(90),
  },
  containerMessage: {
    alignSelf: 'center',
    flex: 1,
  },
});
