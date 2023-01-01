import {Text, View} from 'react-native';
import FullScreenLoader from '../component/FullScreenLoader';
import {useSelector, useDispatch} from 'react-redux';
import {getAllMyRooms} from '../redux/Slice';
import StyleGlobel from '../Style/StyleGlobel';
import React, {useEffect} from 'react';
const Home = () => {
  const data = useSelector(state => state.AllData.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllMyRooms());
    // getData();
  }, []);

  const getData = () => {
    getAllMyRooms();
  };

  return (
    <View style={StyleGlobel.containerStyle}>
      {data ? <FullScreenLoader /> : null}
    </View>
  );
};

export default Home;
