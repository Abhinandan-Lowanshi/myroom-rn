import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';

const LabelComponent = ({label}) => {
  return <Text style={style.labelSignUp}>{label}</Text>;
};

export default LabelComponent;

const style = StyleSheet.create({
  labelSignUp: {
    alignSelf: 'center',
    color: Colors.PRIMARY,
    marginLeft: hp(0.4),
    fontSize: hp(4.2),
    marginVertical: hp(2),
    fontWeight: '600',
  },
});
