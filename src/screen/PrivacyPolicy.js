import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import Colors from '../common/Colors';
import Header from '../component/Header';

const PrivacyPolicy = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header label={'About Us'} navigation={navigation} />

      <ScrollView>
        <Text> gg</Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
const style = StyleSheet.create({
  logoTextStyle: {
    fontSize: hp(5),
    color: 'red',
  },
  appLogoStyle: {
    marginTop: hp(10),
    alignSelf: 'center',
  },
  contentContainerStyle: {
    flex: 1,
  },
  textInputContainerStyle: {
    width: '100%',
  },
  outerContainer: {
    marginTop: hp(5),
    marginBottom: hp(10),
  },
  outerContainerSocial: {},
  labelOr: {
    alignSelf: 'center',
    marginVertical: hp(3),
    color: Colors.BLACK,
  },
  signUpContainerSytle: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  textError: {
    alignSelf: 'flex-end',
    color: 'red',
    fontSize: RF(1.4),
    marginTop: hp(0.1),
    marginRight: hp(3.2),
  },
});
