import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import Colors from '../common/Colors';

const SocialLoginBt = ({outerContainer, label, icon, onPress, labelStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style.outerContainer, outerContainer]}>
      <Image source={icon} style={style.iconStyle}></Image>
      <Text style={[style.labelStyle, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SocialLoginBt;
const style = StyleSheet.create({
  outerContainer: {
    width: '90%',
    height: hp(5),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(1.5),
    backgroundColor: Colors.WHITE,
    borderRadius: hp(0.9),
    flexDirection: 'row',
  },
  labelStyle: {
    color: Colors.BLACK,
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: RF(1.9),
  },
  iconStyle: {
    height: hp(4),
    width: hp(4),
    alignSelf: 'center',
    marginRight: hp(2),
  },
});
