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

const ChatList = props => {
  const {navigation} = props;
  const [passwordSend, setpasswordSend] = useState(false);
  const [user, setUser] = useState('');
  const [height, setHeight] = useState(40);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uid, setUID] = useState('');
  const flatListRef = useRef();
  //   const [messages, setMessages] = useState([]);
  const [reciverInfo, setRecieverInfo] = useState('');
  const [messages, setMessages] = useState([
    {
      messagesId: 1,
      content: 'Hello',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
      name: 'Rajveer',
    },
    {
      messagesId: 2,
      content: 'Hello',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 2,
      recieverID: 1,
      name: 'Rajveer',
    },
    {
      messagesId: 3,
      content: 'Kese ho',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
      name: 'Rajveer',
    },
    {
      messagesId: 4,
      content: 'Me theek hu. or Ap kese ho',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 2,
      recieverID: 1,
      name: 'Rajveer',
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
      name: 'Rajveer',
    },
    {
      messagesId: 6,
      content:
        'Sometimes, you would want to get the auto-generated document ID immediately right after data has been added to the Firestore Database.Luckily, you can do that using the addDoc() method.In order to get the auto-generated ID from the response, all we have to do is access the id property on the docRef object.',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
      name: 'Rajveer',
    },
  ]);

  const onPress = () => {};
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={style.containerFlatList}
        onPress={() => {
          navigation.navigate(ScreenName.Chat);
        }}>
        <Image
          style={style.profileImage}
          source={{
            uri: 'https://source.unsplash.com/user/c_v_r/1900x800',
          }}
        />
        <View style={style.contentContainer}>
          <View style={style.nameContainer}>
            <Text style={style.name}>{item?.name}</Text>
            <Text style={style.date}>{item?.timeStamp}</Text>
          </View>
          <Text style={style.lastMessage} numberOfLines={1}>
            {item?.content}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const toBottom = () => {
    flatListRef.current.scrollToEnd({animated: true});
  };

  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <View style={style.container}>
        {true && (
          <FlatList
            ref={flatListRef}
            data={messages}
            style={style.flatList}
            renderItem={renderItem}
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
