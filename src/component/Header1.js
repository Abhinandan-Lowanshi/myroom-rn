import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppLogo from './applogo/AppLogo';
const Header1 = () => {
  <View style={{backgroundColor: 'red'}}>
    <Text>Hee</Text>
    <AppLogo
      style={style.containerStyle}
      textStyle={style.textStyle}
      label={'MyRoom'}></AppLogo>
  </View>;
};

export default Header1;

const style = StyleSheet.create({
  textStyle: {
    color: 'red',
  },
  containerStyle: {},
});
