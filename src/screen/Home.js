import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import FullScreenLoader from '../component/FullScreenLoader';
import {useSelector, useDispatch} from 'react-redux';
import {getAllMyRooms} from '../redux/Slice';
import StyleGlobel from '../Style/StyleGlobel';
import getLocation from '../geoLocation/GetLocation';
import sendRequest from '../networking/ApiFunctions';
import RenderRoom from '../component/RenderRoom';
import EndPoints from '../networking/EndPoints';
import {setRoomDataHome} from '../redux/Slice';
import ScreenName from '../common/ScreenName';

const Home = ({navigation}) => {
  const data = useSelector(state => state.AllData.locationInfo);
  const roomDataHome = useSelector(state => state.AllData.roomDataHome);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, [data]);

  const onPressRoom = item => {
    navigation.navigate(ScreenName.DetailsScreen, {item});
  };
  const onPressFav = data => {
    let temp = JSON.parse(JSON.stringify(roomDataHome));
    temp.map(item => {
      if (item?.rm_pkey === data?.rm_pkey) {
        if (item?.favorite_key === 'true') {
          return (item.favorite_key = 'false');
        } else return (item.favorite_key = 'true');
      } else return item;
    });
    dispatch(setRoomDataHome(temp));
  };
  const getData = () => {
    if (data.longitude && data.latitude) {
      sendRequest(
        {
          user_id: 2,
          latitude: 22.7641,
          longitude: 75.8709,
          radius: 10,
        },
        EndPoints.findRoom,
        'POST',
      )
        .then(res => {
          dispatch(setRoomDataHome(res?.data));
        })
        .catch(err => {
          // console.log(err, 'dataRoom');
        });
    }
  };

  return (
    <View style={StyleGlobel.containerStyle}>
      {getLocation()}
      <RenderRoom
        myRoomList={roomDataHome}
        onPress={onPressRoom}
        onPressFav={onPressFav}
      />
      {!roomDataHome && <FullScreenLoader />}
    </View>
  );
};

export default Home;
