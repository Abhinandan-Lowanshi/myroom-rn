import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
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

const Notification = ({route, navigation}) => {
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = () => {
    sendRequest(
      {
        id: 4,
      },
      EndPoints.getNotification,
      'POST',
    )
      .then(res => {
        if (res.status === true) {
          if (res.data.length) {
            setNotification(res.data);
            console.log(res.data);
          }
        }
      })
      .catch(err => {});
  };

  const renderRoom = ({item}) => {
    return (
      <TouchableOpacity
        style={style.containerNotification}
        onPress={() => {
          navigation.navigate(ScreenName.DetailsScreen, {
            id,
            isFromNotification: true,
            onPressFav,
          });
        }}>
        <View style={style.containerTitle}>
          <View style={style.dot} />
          <Text style={style.labelTitle}>{item?.payload?.title}</Text>
        </View>
        <TimeAgo style={style.labelTime} time={item?.createdAt} />
        <View style={style.line} />
      </TouchableOpacity>
    );
  };
  const onPressFav = () => {};

  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <Header label={Labels?.Notification} navigation={navigation} />
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
    marginLeft: hp(1),
    fontSize: RF(1.8),
  },
  labelTime: {
    color: Colors.BLACK,
    marginLeft: hp(3),
    marginBottom: hp(1),
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
});
