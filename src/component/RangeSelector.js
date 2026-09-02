import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomInputText from './InputText';
import {hp} from '../common/CommonFunctions';

const RangeSelector = ({
  low,
  lowOnChange,
  lowError,
  high,
  highOnChange,
  highError,
}) => (
  <View style={style.container}>
    <CustomInputText
      value={low}
      onChangeText={lowOnChange}
      outerContainer={style.outerInputContainer}
      containerStyleP={style.inputContainer}
      error={lowError}
      placeholder={'Minimum value'}
      errorMessage={'Invalid value'}
    />
    <CustomInputText
      value={high}
      onChangeText={highOnChange}
      outerContainer={style.outerInputContainer}
      containerStyleP={style.inputContainer}
      error={highError}
      placeholder={'Maximum value'}
      errorMessage={'Invalid value'}
    />
  </View>
);

export default RangeSelector;

const style = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  outerInputContainer: {
    flex: 1,
    marginHorizontal: hp(1),
    marginTop: 0,
  },
  inputContainer: {
    width: '100%',
    marginTop: 0,
  },
});
