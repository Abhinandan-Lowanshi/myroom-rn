import React from 'react';
import {ActivityIndicator, Modal, View, StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';

const LowOpacityLoader = () => {
  return (
    <Modal transparent={true}>
      <View style={style.lowOpacity}></View>
      <View style={style.container}>
        <View style={style.activityContainer}>
          <ActivityIndicator
            style={style.activityIndicator}
            color={Colors.PRIMARY}
            size={40}></ActivityIndicator>
        </View>
      </View>
    </Modal>
  );
};
export default LowOpacityLoader;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowOpacity: {
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
    opacity: 0.5,
    position: 'absolute',
  },
  activityContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: hp(1),
  },
  activityIndicator: {
    padding: hp(2.5),
  },
});
