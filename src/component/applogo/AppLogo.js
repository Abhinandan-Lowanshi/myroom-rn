import React from 'react';
import {Text, View} from 'react-native';
import Colors from '../../common/Colors';

const AppLogo = ({style, textStyle}) => {
  return (
    <View style={[style, {flexDirection: 'row'}]}>
      <Text
        style={[
          textStyle,
          {
            color: Colors.BLACK1,
          },
        ]}>
        My
      </Text>
      <Text
        style={[
          textStyle,
          {
            color: Colors.PRIMARY,
          },
        ]}>
        Room
      </Text>
    </View>
  );
};

export default AppLogo;
