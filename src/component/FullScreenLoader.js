import React from 'react';
import {ActivityIndicator} from 'react-native';
import Colors from '../common/Colors';

const FullScreenLoader = () => {
  return (
    <ActivityIndicator
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      color={Colors.PRIMARY}
      size={40}></ActivityIndicator>
  );
};
export default FullScreenLoader;
