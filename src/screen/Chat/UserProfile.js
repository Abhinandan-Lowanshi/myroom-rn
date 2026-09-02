import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Entypo';
import StyleGlobel from '../../Style/StyleGlobel';
import LowOpacityLoader from '../../component/LowOpacityLoader';
import Colors from '../../common/Colors';
import Header from '../../component/Header';
import {RF, hp} from '../../common/CommonFunctions';
import Custom_Image from '../../component/Custom_Image';
import ScreenName from '../../common/ScreenName';
import sendRequest from '../../networking/ApiFunctions';
import EndPoints from '../../networking/EndPoints';
import Labels from '../../common/labels';
import images from '../../common/images';
import RenderRoom from '../../component/RenderRoom';
import {useSelector, useDispatch} from 'react-redux';
import {setRoomDataHome} from '../../redux/Slice';
import RenderRoom2Column from '../../component/RenderRoom2Column';
import IconName from '../../common/IconName';

const UserProfile = props => {
  const {navigation} = props;
  const roomDataHome = useSelector(state => state.AllData.roomDataHome);

  const ownerDetails = () => {
    return (
      <View style={style.ownerContainer}>
        <View style={style.ownerView}>
          <Image style={style.ownerImage} source={images.profileIcon}></Image>
          <View style={style.ownerNameContainer}>
            <Text style={style.labelName}>{'item?.rm_own_Fullname'}</Text>
            <Text style={style.labelmoble}>{'item?.rm_own_mble_num'}</Text>
          </View>
        </View>
        <View style={style.containerContact}>
          <IconButton_Entypo
            fValue={IconName?.message}
            iconColor={Colors.BLUE2}
            onPress={() => {
              // handleMessage(item?.rm_own_mble_num);
              handleChat();
            }}
          />
          <IconButton_Entypo
            fValue={IconName?.phone}
            iconColor={Colors.GREEN1}
            onPress={() => {
              handleCall(item?.rm_own_mble_num);
            }}
          />
        </View>
      </View>
    );
  };

  const IconButton_Entypo = props => {
    return (
      <TouchableOpacity
        style={[style.iconContainer, props?.iconContainer]}
        onPress={props?.onPress}>
        <Icon
          name={props?.value ? props?.tValue : props.fValue}
          size={props?.iconSize || hp(3)}
          color={props?.iconColor || Colors.RED}
        />
      </TouchableOpacity>
    );
  };
  const handleChat = () => {
    if (item?.rm_usr_fkey && item?.rm_own_Fullname) {
      let ob = {
        user_id: item?.rm_usr_fkey,
        usr_first_name: item?.rm_own_Fullname,
      };
      navigation.navigate(ScreenName.Chat, {item: ob});
    }
  };

  const showToast = message => {
    Toast.show(message, Toast.LONG);
  };

  const handleCall = (number = '') => {
    if (number !== '') {
      let phoneNumber;
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
      } else {
        phoneNumber = `telprompt:${number}`;
      }
      Linking.openURL(phoneNumber);
    } else {
      Toast.show('Something went wrong', Toast.LONG);
    }
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

  const performFavOp = data => {
    let temp = JSON.parse(JSON.stringify(roomDataHome));
    temp.map(item => {
      if (item?.rm_pkey === data?.roomId) {
        return (item.favorite_key = data?.like);
      } else return item;
    });

    dispatch(setRoomDataHome(temp));
  };

  const onPressRoom = item => {
    navigation.navigate(ScreenName.RoomDetailsOwner, {
      item,
      onPressFav,
      disabled: true,
    });
  };
  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <Header label={Labels.Profile} navigation={navigation} />
      <ScrollView>
        {ownerDetails()}
        <RenderRoom2Column
          myRoomList={roomDataHome}
          onPress={onPressRoom}
          onPressFav={onPressFav}
          refreshing={false}
        />
        {/* <LowOpacityLoader /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;

const style = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    marginLeft: hp(2.2),
    marginTop: hp(2),
  },
  personalInfoCTNR: {
    alignSelf: 'center',
    marginLeft: hp(2.2),
  },
  profileImage: {
    width: hp(10),
    height: hp(10),
    borderRadius: hp(90),
  },
  labelPersonal: {
    fontSize: RF(2),
    fontWeight: '600',
    color: 'black',
  },
  ownerView: {
    flexDirection: 'row',
    marginTop: hp(1.5),
  },
  ownerImage: {
    height: hp(8),
    width: hp(8),
    borderRadius: hp(90),
  },
  labelName: {
    color: Colors.BLACK,
    fontWeight: '600',
    fontSize: RF(2.2),
  },
  labelmoble: {
    color: Colors.GREY2,
    fontWeight: '600',
    marginTop: hp(0.2),
  },
  ownerNameContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: hp(1.3),
  },
  iconContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: hp(1),
    marginHorizontal: hp(1),
    borderRadius: hp(90),
    height: hp(5),
    width: hp(5),
  },
  containerContact: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  ownerContainer: {
    marginBottom: hp(3),
  },
});
