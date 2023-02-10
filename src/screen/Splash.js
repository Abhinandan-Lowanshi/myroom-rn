import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import ScreenName from '../common/ScreenName';
import StyleGlobel from '../Style/StyleGlobel';
import localStorageOp from '../localStorage/LocalData';
import AsyncKeys from '../localStorage/AsyncKeys';
import {CommonActions} from '@react-navigation/native';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      localStorageOp('', AsyncKeys.USERDATA, '').then(res => {
        if (res?.data?.usr_id)
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ScreenName.TabComponent}],
            }),
          );
        else navigation.navigate(ScreenName.Login);
      });
    }, 2000);
  });
  return (
    <View style={StyleGlobel.containerStyle}>
      <Text style={{fontSize: 20}}>Splash</Text>
    </View>
  );
};

export default Splash;
