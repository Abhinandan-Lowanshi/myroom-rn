import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import StyleGlobel from '../../Style/StyleGlobel';
import LowOpacityLoader from '../../component/LowOpacityLoader';
import Colors from '../../common/Colors';
import Header from '../../component/Header';
import {RF, hp} from '../../common/CommonFunctions';
import Custom_Image from '../../component/Custom_Image';
import ScreenName from '../../common/ScreenName';
import sendRequest from '../../networking/ApiFunctions';
import EndPoints from '../../networking/EndPoints';
import images from '../../common/images';
const ChatList = props => {
  const {navigation} = props;
  const [refreshing, setRefreshing] = useState(false);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUserList();
  }, []);

  const onRefresh = () => [getUserList()];
  const getUserList = () => {
    setLoading(true);
    sendRequest({user_id: 'non'}, EndPoints?.chatUserList, 'POST')
      .then(response => {
        setLoading(false);
        setRefreshing(false);

        if (response.status === true) {
          if (response?.data?.length > 0) {
            setUserList(response.data);
          }
        }
      })
      .catch(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.containerFlatList}
        onPress={() => {
          navigation.navigate(ScreenName.Chat, {item});
        }}>
        <Image style={style.profileImage} source={images.profileIcon} />
        <View style={style.contentContainer}>
          <View style={style.nameContainer}>
            <Text style={style.name}>{item?.usr_first_name}</Text>
            <Text style={style.date}>{item?.timeStamp}</Text>
          </View>
          <Text style={style.lastMessage} numberOfLines={1}>
            {item?.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <View style={style.container}>
        {true && (
          <FlatList
            data={userList}
            style={style.flatList}
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
      {loading && <LowOpacityLoader />}
    </SafeAreaView>
  );
};

export default ChatList;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  containerFlatList: {
    flexDirection: 'row',
    marginHorizontal: hp(2),
    marginTop: hp(2),
  },
  profileImage: {
    width: hp(7),
    height: hp(7),
    borderRadius: hp(90),
  },
  contentContainer: {marginLeft: hp(2), flex: 1, justifyContent: 'center'},
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: Colors.BLACK,
    fontWeight: '600',
  },
  date: {
    color: Colors.BLACK,
    alignSelf: 'flex-end',
  },
  lastMessage: {
    color: Colors.BLACK,
    maxWidth: '90%',
    marginTop: hp(0.1),
  },
});
