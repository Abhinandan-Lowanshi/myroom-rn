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
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import StyleGlobel from '../../Style/StyleGlobel';
import LowOpacityLoader from '../../component/LowOpacityLoader';
import Colors from '../../common/Colors';
import Header from '../../component/Header';
import {RF, hp} from '../../common/CommonFunctions';
import io from 'socket.io-client';
import localStorageOp from '../../localStorage/LocalData';
import sendRequest from '../../networking/ApiFunctions';
import EndPoints from '../../networking/EndPoints';
import ProfileIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ScreenName from '../../common/ScreenName';

const Chat = props => {
  const {navigation} = props;
  const {item} = props?.route?.params;
  const [passwordSend, setpasswordSend] = useState(false);
  const [user, setUser] = useState('');
  const [height, setHeight] = useState(hp(5.5));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [stop, setStop] = useState(false);
  const flatListRef = useRef();
  const [user_id, setUser_id] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io.connect('http://3.220.96.137:3000', {reconnect: true});
  console.log(item, 'Chat');

  useEffect(() => {
    socket.on('receive_message', chatMessage => {
      console.log(chatMessage, 'ChatMessage');
      if (chatMessage?.user_id !== user_id) {
        setMessages(prevMessages => [...prevMessages, chatMessage]);
        toBottom();
      }
    });
  }, []);

  useEffect(() => {
    getMessageList();
  }, []);

  const getMessageList = async () => {
    setLoading(true);
    localStorageOp(false, AsyncKeys.USERDATA, '')
      .then(userData => {
        setUser_id(userData?.data?.usr_id);
        socket.emit('join_room', {
          user_id: userData?.data?.usr_id,
          buddy_id: item?.user_id,
        });

        let tempOb = {
          user_id: userData?.data?.usr_id,
          buddy_id: item?.user_id,
          page: 1,
        };

        sendRequest(tempOb, EndPoints?.chatList, 'POST').then(response => {
          setLoading(false);
          if (response.status === true) {
            if (response?.data?.length > 0) {
              setMessages(response.data?.reverse());
              setTimeout(() => {
                toBottom();
              }, 500);
            }
          }
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const onPress = () => {};
  const renderItem = ({item}) => {
    return (
      <View style={style.messagesContainer(item?.message_type === 'sent')}>
        {/* <View style={style.innerContainer(item?.message_type === 'sent')}> */}
        <Text style={style.message(item?.message_type === 'sent')}>
          {item?.message}
        </Text>
        {/* </View> */}
        <Text style={style.time(item?.message_type === 'sent')}>
          {getTime(item?.created_date)}
        </Text>
      </View>
    );
  };

  const getHeight = length => {
    if (length > 270) {
      setHeight(hp(10.5));
    } else if (length > 180) {
      setHeight(hp(9.5));
    } else if (length > 60) {
      setHeight(hp(7.5));
    } else if (length < 60) {
      setHeight(hp(5.5));
    }
  };

  const sendMessage = () => {
    const created_date = new Date().toISOString();
    // console.log(messages);
    if (message !== '') {
      let data = {
        user_id,
        buddy_id: item?.user_id,
        message,
        created_date,
        message_type: 'sent',
      };
      setMessages(prevMessages => [...prevMessages, data]);
      socket.emit('send_message', {
        user_id,
        buddy_id: item?.user_id,
        message,
      });
      setMessage('');
      toBottom();
    }
  };

  const toBottom = () => {
    flatListRef.current.scrollToEnd({animated: true});
  };

  const getTime = value => {
    let myDate = new Date(value).toLocaleDateString('en-US');
    let myTime = new Date(value).toLocaleTimeString('en-US');
    return `${myTime}  ${myDate}`;
  };

  const onReactTop = index => {
    if (index === 0 && stop === false) {
      // setPageCount(previousValue => previousValue + 1)
      setLoading(true);
      let pageNumber = pageCount;

      console.log(pageNumber + 1, 'pageNumber');
      let tempOb = {
        user_id: user_id,
        buddy_id: item?.user_id,
        page: pageNumber + 1,
      };
      sendRequest(tempOb, EndPoints?.chatList, 'POST')
        .then(response => {
          setLoading(false);
          if (response.status === true) {
            if (response.message === 'Chat list not found.') {
              setStop(true);
            }
            if (response?.data?.length > 0) {
              setPageCount(previousValue => previousValue + 1);
              console.log(response.data.reverse());
              setMessages(previousValue => [
                ...response.data.reverse(),
                ...previousValue,
              ]);
            }
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const onPressProfile = () => {
    navigation.navigate(ScreenName.UserProfile);
  };
  const rightIcon = () => {
    return (
      <TouchableOpacity style={style.iconProContainer} onPress={onPressProfile}>
        <ProfileIcon
          name={'account-circle-outline'}
          size={hp(4)}
          color={Colors.PRIMARY}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <Header label={item?.usr_first_name} navigation={navigation} />
      <View style={style.container}>
        {true && (
          <>
            <FlatList
              ref={flatListRef}
              data={messages}
              style={style.flatList}
              renderItem={renderItem}
              onScroll={e => onReactTop(e.nativeEvent.contentOffset.y)}
            />
            <View style={style.sendMessageContainer(height)}>
              <TextInput
                style={style.textinput}
                multiline={true}
                onChangeText={value => {
                  getHeight(value.length);
                  setMessage(value);
                }}
                onFocus={value => {
                  toBottom();
                }}
                placeholder={'Type a message'}
                value={message}
                placeholderTextColor={Colors.BLACK}></TextInput>
              <TouchableOpacity
                style={style.buttonStyle}
                onPress={() => sendMessage()}>
                <Icon name={'send'} size={hp(3)} color={Colors.PRIMARY}></Icon>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      {loading && <LowOpacityLoader />}
    </SafeAreaView>
  );
};

export default Chat;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  containerBt: {
    marginTop: 10,
    height: '20%',
  },
  input: {
    width: '40%',
  },
  appLabel: {
    color: Colors.BLACK,
    alignSelf: 'center',
    marginTop: 60,
    fontSize: 30,
    position: 'absolute',
  },
  buttonSignIn: {marginTop: 15},
  flatList: {
    flex: 1,
    marginTop: 5,
  },
  message: isSend => ({
    color: isSend ? Colors.WHITE : Colors.BLACK,
    backgroundColor: isSend ? Colors.PRIMARYLITE : Colors.GREY1,
    marginVertical: 2,
    maxWidth: '90%',
    paddingHorizontal: hp(1),
    borderRadius: hp(1),
    paddingVertical: hp(0.4),
    alignSelf: isSend ? 'flex-end' : 'flex-start',
    fontSize: RF(1.6),
  }),
  messagesContainer: isSend => ({
    alignSelf: isSend ? 'flex-end' : 'flex-start',
    maxWidth: '90%',
    marginHorizontal: hp(1),
    marginTop: hp(1),
  }),
  time: isSend => ({
    color: Colors.BLACK,
    fontSize: RF(1),
    textAlign: isSend ? 'right' : 'left',
    marginHorizontal: 5,
  }),
  innerContainer: isSend => ({
    backgroundColor: isSend ? Colors.PRIMARYLITE : Colors.GREY1,
    marginTop: 2,
    marginHorizontal: hp(0.2),
    borderRadius: 5,
  }),
  sendMessageContainer: height => ({
    borderWidth: 1,
    flexDirection: 'row',
    margin: hp(1),
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    height,
    borderRadius: hp(1),
    marginHorizontal: hp(1.2),
  }),
  textinput: {
    flex: 1,
    color: Colors.BLACK,
    marginLeft: hp(1),
  },
  buttonStyle: {
    width: '15%',
    height: hp(3),
    alignSelf: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  labelOwnerName: {
    color: Colors.BLACK,
    alignSelf: 'center',
    fontSize: RF(2.3),
  },
  iconProContainer: {
    alignSelf: 'center',
    position: 'absolute',
    right: hp(2.5),
  },
});
