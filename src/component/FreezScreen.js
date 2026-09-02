import React from 'react';
import {Modal} from 'react-native';
const FreezScreen = isLoading => {
  return <Modal transparent={true} visible={isLoading} />;
};
export default FreezScreen;
