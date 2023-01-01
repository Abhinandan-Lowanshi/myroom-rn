import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import ScreenName from '../common/ScreenName';
import StyleGlobel from '../Style/StyleGlobel';
const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ScreenName.TabComponent);
    }, 2000);
  });
  return (
    <View style={StyleGlobel.containerStyle}>
      <Text style={{ fontSize: 20 }}>Splash</Text>
    </View>
  );
};

export default Splash;
