import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';
import C_Button from './C_Button';
const ErrorModal = props => {
  return (
    <Modal
      transparent={true}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      visible={props?.visible}>
      <View
        style={{
          marginTop: '50%',
          marginHorizontal: hp(5),
          backgroundColor: 'white',
          paddingVertical: hp(10),
          borderRadius: hp(1),
          elevation: hp(1),
        }}>
        <Text
          style={{
            fontSize: hp(2.3),
            alignSelf: 'center',
            color: Colors.BLACK,
            marginBottom: hp(1.5),
            fontWeight: '600',
          }}>
          {props.label}
        </Text>

        <C_Button
          // isLoading={loading}
          onPress={props?.onPress}
          labelStyle={style.labelStyle}
          outerContainer={style.outerContainer}
          isSubmitDisabled={false}
          label={'Dismiss'}
        />
      </View>
    </Modal>
  );
};
export default ErrorModal;

const style = StyleSheet.create({
  outerContainer: {
    width: '60%',
    height: hp(4.5),
  },
  labelStyle: {
    fontSize: hp(2),
  },
});
