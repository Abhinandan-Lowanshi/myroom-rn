import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  ActivityIndicator,
} from 'react-native';
import Colors from '../common/Colors';
import {hp, RF} from '../common/CommonFunctions';
import C_Button from './C_Button';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import {useEffect} from 'react';
import Custom_Image from './Custom_Image';
import ImageScaleType from '../common/ImageScaleType';
import FastImage from 'react-native-fast-image';
// import Modal from "react-native-modal";

const PopupRoomView = props => {
  const [loading, setLoading] = useState(true);
  return (
    <Modal
      backdropOpacity={0.3}
      activeOpacity={0.9}
      transparent={true}
      animationType={'slide'}
      style={style.outerContainer}
      visible={props?.visible}>
      <View style={style.parentContainer}>
        <TouchableOpacity style={style.close} onPress={props?.onClose}>
          <Icon name={'closecircleo'} size={hp(3)} color={Colors.RED} />
        </TouchableOpacity>
        <View style={style.container}>
          <View style={style.imageContainer}>
            <FastImage
              onLoadEnd={() => {
                setLoading(false);
              }}
              source={{uri: props?.data?.images[0]?.img_name}}
              style={style.image}
              resizeMode={FastImage.resizeMode.stretch}
            />
            {/* {loading && (
              <ActivityIndicator
                style={style.loader}
                size={'large'}
                color={Colors.PRIMARY}></ActivityIndicator>
            )} */}
          </View>
          <View style={style.containerContent}>
            <Text style={style.label}>{props?.data?.rm_own_Fullname}</Text>
            <Text style={style.label}>{props?.data?.rm_own_mble_num}</Text>
            <Text style={style.label}>{props?.data?.rm_size}</Text>
            <Text style={style.label}>{`\u20B9${props?.data?.rm_rent}`}</Text>
            <Text
              style={
                style.label
              }>{`${props?.data?.rm_house_no} ${props?.data?.rm_colny} ${props?.data?.rm_city}`}</Text>
          </View>
        </View>
        <View style={style.bottomContainer}>
          <TouchableOpacity
            style={style.containerLabel}
            onPress={() => {
              props?.onPressFullDetails();
            }}>
            <Text style={style.labelBottom}>View full Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.containerLabel}
            onPress={props?.onPressRouteDetails}>
            <Text style={style.labelBottom}>View route Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default PopupRoomView;

const style = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    activeOpacity: 0.3,
    backdropOpacity: 0.2,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flexDirection: 'row',
    // marginTop: hp(1),
    marginHorizontal: hp(2),
  },
  image: {
    height: hp(12),
    width: hp(12),
    alignSelf: 'center',
    borderRadius: hp(1),
  },
  containerContent: {
    marginHorizontal: hp(2),
  },
  imageContainer: {
    height: hp(12),
    width: hp(12),
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
  },
  label: {
    color: Colors.BLACK,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: hp(3),
    marginTop: hp(1.5),
    marginBottom: hp(3),
  },
  labelBottom: {
    color: Colors.BLUE1,
    fontSize: RF(2),
  },
  parentContainer: {
    marginTop: '50%',
    backgroundColor: Colors.WHITE,
    borderRadius: hp(1),
    elevation: hp(1),
    width: '90%',
    alignSelf: 'center',
    // alignItems: 'center',
    paddingHorizontal: hp(2),
  },
  containerLabel: {
    alignSelf: 'center',
    flex: 1,
  },
  close: {
    alignSelf: 'flex-end',
    marginTop: hp(1.5),
  },
});
