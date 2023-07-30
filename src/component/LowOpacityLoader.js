import React from 'react';
import {
  ActivityIndicator,
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../common/Colors';
import {RF, hp} from '../common/CommonFunctions';

const LowOpacityLoader = ({onPress, cancel}) => {
  return (
    <Modal transparent={true}>
      <View style={style.lowOpacity}></View>
      {cancel && (
        <TouchableOpacity
          onPress={onPress}
          style={{
            height: hp(3),
            width: hp(10),
            marginTop: hp(7),
            marginLeft: hp(1),
          }}>
          <Text
            style={{
              color: Colors.BLACK,
              fontSize: RF(2),
              textAlign: 'center',
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      )}
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
