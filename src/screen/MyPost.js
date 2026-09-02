import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import RenderRoom from '../component/RenderRoom';
import StyleGlobel from '../Style/StyleGlobel';
import {useSelector, useDispatch} from 'react-redux';
import {getAllMyRooms} from '../redux/Slice';
import DeleteConformation from '../component/DeleteConformation';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import ErrorModal from '../component/ErrorModal';
import ScreenName from '../common/ScreenName';
import FullScreenLoader from '../component/FullScreenLoader';
import Header from '../component/Header';
import LowOpacityLoader from '../component/LowOpacityLoader';
import Toast from 'react-native-simple-toast';
import {hp} from '../common/CommonFunctions';
import {logout} from '../component/LogOut';
const MyPost = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [roomId, setRoomId] = useState('');
  const myRoomList = useSelector(state => state.AllData.myposts);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getRooms();
  }, []);
  const onPressActive = item => {
    let data = {
      room_id: item?.rm_pkey,
      status_type: !item?.rm_status,
    };
    setLoading(true);
    sendRequest(data, EndPoints.toRoomStatus, 'POST')
      .then(res => {
        if (res?.status === true) {
          setLoading(false);
          setRefreshing(false);
          if (res?.status === true) {
            updateRoomStatus(data);
          }
        } else {
          if (response?.message === 'Invalid authentication.') {
            logout(navigation);
          }
        }
      })
      .catch(e => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const showToast = message => {
    Toast.show(message, Toast.LONG);
  };

  const updateRoomStatus = data => {
    let temp = JSON.parse(JSON.stringify(myRoomList));
    temp?.map(item => {
      if (item.rm_pkey === data?.room_id) {
        return (item.rm_status = data?.status_type);
      } else {
        return item;
      }
    });
    dispatch(getAllMyRooms(temp));
  };

  const onPressEditSuccess = value => {
    let tmp = myRoomList?.map(data => {
      return data?.rm_pkey === value?.rm_pkey ? value : data;
    });
    dispatch(getAllMyRooms(tmp));
  };

  const onPressEdit = item => {
    navigation.navigate(ScreenName.EditRoom, {item, onPressEditSuccess});
  };

  const onPressDelete = id => {
    setError('');

    if (id) {
      setRoomId(id);
      setVisible(true);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getRooms();
  };
  const getRooms = () => {
    sendRequest({user_id: 'roomId'}, EndPoints.myRoomList, 'POST')
      .then(res => {
        setLoading(false);
        setRefreshing(false);
        if (res?.status === true) {
          dispatch(getAllMyRooms(res?.data));
        } else {
          if (response?.message === 'Invalid authentication.') {
            logout(navigation);
          }
        }
      })
      .catch(e => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  const onPressRoom = item => {
    navigation.navigate(ScreenName.DetailsScreen, {
      item,
      isFrom: 'MyPost',
    });
  };
  const deleteRoom = () => {
    setIsLoading(true);
    setError('');
    sendRequest({room_id: roomId}, EndPoints.deleteRoom, 'POST')
      .then(response => {
        setIsLoading(false);
        if (response.status === true) {
          showToast('Room deleted successfully');
          setVisible(false);
          removeRoom(roomId);
        } else {
          setError(response?.message);

          if (response?.message === 'Invalid authentication.') {
            logout(navigation);
          }
        }
      })
      .catch(error => {
        setError(response?.message);
      });
  };

  const removeRoom = roomId => {
    let temp = [];
    myRoomList.forEach(item => {
      if (item?.rm_pkey !== roomId) {
        temp.push(item);
      }
    });
    dispatch(getAllMyRooms(temp));
  };

  const onPressCancel = () => {
    navigation.goBack();
  };

  const All = () => (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <Header label={'My Post'} navigation={navigation} />
      {loading && <LowOpacityLoader onPress={onPressCancel} />}

      <RenderRoom
        container={style.container}
        onPress={onPressRoom}
        myRoomList={myRoomList}
        isFromMyPost={true}
        refreshing={refreshing}
        onPressActive={onPressActive}
        onPressEdit={onPressEdit}
        onPressDelete={onPressDelete}
        onRefresh={() => {
          onRefresh();
        }}
      />
      <DeleteConformation
        warningMessage={
          'By deleting this post all data related to the post will also be deleted'
        }
        error={error}
        isLoading={isLoading}
        labelPositive={'Delete'}
        labelNegative={'Cancel'}
        visible={visible}
        onPressPositive={deleteRoom}
        closeModal={() => {
          setError('');
          setVisible(false);
        }}
        onPressNegative={() => {
          setVisible(false);
        }}
      />
    </View>
  );

  return <View style={StyleGlobel.containerStyle}>{All()}</View>;
};

export default MyPost;
const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: hp(0.5),
  },
});
