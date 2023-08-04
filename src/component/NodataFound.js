import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import images from '../common/images';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Colors from '../common/Colors';

const NodataFound = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons
        name={'message-alert-outline'}
        size={hp(15)}
        color={Colors.PRIMARY}
      />
      <Text style={style.labelHeader}>
        {props.header || 'Something went wrong!'}
      </Text>
      <Text style={style.labelError}>
        {props.message ||
          'There is currently not data \n available for the request.'}
      </Text>
      {props.onPress && (
        <TouchableOpacity
          style={style.labelReloadContainer}
          onPress={props.onPress}>
          <Text style={style.labelReload}>Reload</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default NodataFound;
const style = StyleSheet.create({
  labelHeader: {
    color: Colors.PRIMARY,
    fontSize: RF(2.5),
    fontWeight: '600',
  },
  labelError: {
    color: Colors.PRIMARY,
    fontSize: RF(1.8),
    textAlign: 'center',
    fontWeight: '600',
  },
  labelReload: {
    color: Colors.WHITE,
    fontSize: RF(2),
    marginHorizontal: hp(2),
    marginVertical: hp(0.5),
  },
  labelReloadContainer: {
    backgroundColor: Colors.PRIMARY,
    marginTop: hp(2),
    borderRadius: hp(1),
  },
});
