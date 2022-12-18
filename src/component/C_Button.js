import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import Colors from '../common/Colors';

const C_Button = ({outerContainer, label, onPress, isSubmitDisabled}) => {
  return (
    <TouchableOpacity
      disabled={isSubmitDisabled}
      onPress={() => onPress}
      style={[style.outerContainer(isSubmitDisabled), outerContainer]}>
      <Text style={style.labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export default C_Button;
const style = StyleSheet.create({
  outerContainer: isSubmitDisabled => ({
    width: '90%',
    height: hp(5),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
    backgroundColor: isSubmitDisabled ? Colors.PRIMARYLITE : Colors.PRIMARY,
    borderRadius: hp(0.9),
  }),
  labelStyle: {
    color: Colors.WHITE,
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: RF(2),
  },
});
