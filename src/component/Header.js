import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';

const Header = ({label}) => {
  return (
    <TouchableOpacity style={style.container}>
      <Icon
        style={style.iconStyle}
        name="left"
        size={hp(3.6)}
        color={Colors.PRIMARY}
      />
      <Text style={style.labelSignUp}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Header;

const style = StyleSheet.create({
  container: {
    height: hp(6),
    flexDirection: 'row',
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: hp(0.8),
  },
  labelSignUp: {
    fontSize: hp(3),
    alignSelf: 'center',
    color: Colors.PRIMARY,
    marginLeft: hp(0.4),
    fontSize: hp(2.6),
  },
});
