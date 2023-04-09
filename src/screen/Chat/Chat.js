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
import {RF} from '../../common/CommonFunctions';

const Chat = props => {
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
    },
    {
      messagesId: 2,
      content: 'Hello',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 2,
      recieverID: 1,
    },
    {
      messagesId: 3,
      content: 'Kese ho',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 4,
      content: 'Me theek hu. or Ap kese ho',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 2,
      recieverID: 1,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 6,
      content:
        'Sometimes, you would want to get the auto-generated document ID immediately right after data has been added to the Firestore Database.Luckily, you can do that using the addDoc() method.In order to get the auto-generated ID from the response, all we have to do is access the id property on the docRef object.',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 745,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 5,
      content: 'Me bhi theek hu',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 1,
      recieverID: 2,
    },
    {
      messagesId: 6,
      content:
        'Sometimes, you would want to get the auto-generated document ID immediately right after data has been added to the Firestore Database.Luckily, you can do that using the addDoc() method.In order to get the auto-generated ID from the response, all we have to do is access the id property on the docRef object.',
      timeStamp: '10:20 AM',
      type: 'TEXT',
      senderID: 2,
      recieverID: 1,
    },
  ]);

  const onPress = () => {};
  const renderItem = ({item}) => {
    return (
      <View style={style.messagesContainer(item.senderID === 1)}>
        <View style={style.innerContainer}>
          <Text style={style.message}>{item?.content}</Text>
        </View>
        <Text style={style.time(item.senderID === 1)}>{item?.timeStamp}</Text>
      </View>
    );
  };

  const getHeigth = length => {
    if (length > 120) {
      setHeight(100);
    } else if (length > 80) {
      setHeight(80);
    } else if (length > 50) {
      setHeight(60);
    } else if (length < 40) {
      setHeight(40);
    }
  };

  const sendMessage = () => {
    // if (user?.uid) {
    //   if (message !== '') {
    //     let tempMessage = {
    //       messagesId: Math.random().toString(33).substring(2, 12),
    //       timeStamp: new Date().toLocaleString(),
    //       type: 'TEXT',
    //       senderID: user?.uid,
    //       recieverID: null,
    //       content: message,
    //     };
    //     let tempAr = [];
    //     if (messages?.length > 0) {
    //       tempAr = JSON.parse(JSON.stringify(messages));
    //       tempAr.push(tempMessage);
    //     } else {
    //       tempAr.push(tempMessage);
    //     }
    //     setMessage('');
    //     setMessages(tempAr);
    //     consversation
    //       .doc(user?.uid + reciverInfo?.uid)
    //       .collection('mess')
    //       .add(tempMessage)
    //       .then(value => {
    //         console.log(value, 'consversation');
    //         setLoading(false);
    //       })
    //       .catch(() => {
    //         setLoading(false);
    //       });
    //     if (tempAr?.length > 3) toBottom();
    //   } else {
    //     Toast.show('Please enter message', Toast.LONG);
    //   }
    // } else {
    //   Toast.show('Something went wrong', Toast.LONG);
    // }
  };

  const toBottom = () => {
    flatListRef.current.scrollToEnd({animated: true});
  };

  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <Header label={'Raju'} navigation={navigation} />
      <View style={style.container}>
        {true && (
          <>
            <FlatList
              ref={flatListRef}
              data={messages}
              style={style.flatList}
              renderItem={renderItem}
            />
            <View style={style.sendMessageContainer}>
              <TextInput
                style={style.textinput(height)}
                multiline={true}
                onChangeText={value => {
                  getHeigth(value.length);
                  setMessage(value);
                }}
                placeholder={'Type a message'}
                value={message}
                placeholderTextColor={Colors.white}></TextInput>
              <TouchableOpacity
                style={style.buttonStyle}
                onPress={() => sendMessage()}>
                <Icon name={'send'} size={30} color={Colors.primary}></Icon>
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
    color: Colors.white,
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
  message: {
    color: Colors.white,
    marginHorizontal: 5,
    marginVertical: 2,
  },
  messagesContainer: isSend => ({
    alignSelf: isSend ? 'flex-end' : 'flex-start',
    maxWidth: '90%',
    marginTop: 5,
  }),
  time: isSend => ({
    color: Colors.white,
    fontSize: 10,
    textAlign: isSend ? 'right' : 'left',
    marginHorizontal: 5,
  }),
  innerContainer: {
    backgroundColor: Colors.PRIMARY,
    marginTop: 2,
    marginHorizontal: 3,
    borderRadius: 5,
  },
  sendMessageContainer: {
    width: '100%',
    // borderTopColor: Colors.white,
    // borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  textinput: height => ({
    width: '85%',
    borderColor: 'green',
    borderWidth: 1,
    marginTop: 6,
    borderRadius: 5,
    height: height,
    marginLeft: 5,
    color: Colors.white,
    overflow: 'visible',
    textAlignVertical: 'top',
  }),
  buttonStyle: {
    width: '15%',
    height: 30,
    marginTop: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelOwnerName: {
    color: Colors.BLACK,
    alignSelf: 'center',
    fontSize: RF(2.3),
  },
});
