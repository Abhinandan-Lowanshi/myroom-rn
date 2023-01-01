import React, { useEffect } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import RenderRoom from '../component/RenderRoom';
import StyleGlobel from '../Style/StyleGlobel';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMyRooms } from '../redux/Slice';

const MyPost = () => {
  const data = useSelector(state => state.AllData.loading);
  const myRoomList = useSelector(state => state.AllData.myposts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMyRooms());
  }, []);

  const All = () => (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      {RenderRoom({ myRoomList })}
    </View>
  );
  const Active = () => (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      {/* {RenderRoom()} */}
    </View>
  );
  const DeActivate = () => (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      {
        // RenderRoom()
      }
    </View>
  );

  const renderScene = SceneMap({
    All: All,
    Active: Active,
    DeActivate: DeActivate,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'All', title: 'All' },
    { key: 'Active', title: 'Active' },
    { key: 'DeActivate', title: 'DeActivate' },
  ]);
  return (
    <View style={StyleGlobel.containerStyle}>
      <TabView
        bounces={true}
        style={{ backgroundColor: 'white', marginTop: 20, elevation: 10 }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

export default MyPost;
