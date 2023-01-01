import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import Colors from '../common/Colors';
import {ActivityIndicator} from 'react-native';
const C_Button = ({
  outerContainer,
  label,
  onPress,
  isSubmitDisabled,
  isLoading,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isSubmitDisabled}
      onPress={onPress}
      style={[style.outerContainer(isSubmitDisabled), outerContainer]}>
      {isLoading ? (
        <ActivityIndicator
          color={Colors.WHITE}
          size={hp(5)}></ActivityIndicator>
      ) : (
        <Text style={[style.labelStyle, labelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default C_Button;
const style = StyleSheet.create({
  outerContainer: isSubmitDisabled => ({
    width: '90%',
    height: hp(6),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(2),
    backgroundColor: isSubmitDisabled ? Colors.PRIMARYLITE : Colors.PRIMARY,
    borderRadius: hp(0.9),
    flexDirection: 'row',
  }),
  labelStyle: {
    color: Colors.WHITE,
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: RF(2),
  },
});
