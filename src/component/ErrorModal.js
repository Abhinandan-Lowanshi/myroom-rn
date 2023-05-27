import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Colors from '../common/Colors';
import {hp, RF} from '../common/CommonFunctions';
import C_Button from './C_Button';
const ErrorModal = props => {
  return (
    <Modal transparent={true} visible={props?.visible} animationType={'slide'}>
      <View style={style.lowOpacity(props.hideBackground)}></View>
      <View style={style.parentContainer}>
        <View style={style.container}>
          <Text style={style.labelHeader}>{'Something went wrong.'}</Text>
          <Text style={style.labelContent}>{props?.label}</Text>
          <C_Button
            // isLoading={loading}
            onPress={props?.onPress}
            labelStyle={style.labelStyle}
            outerContainer={style.outerContainer}
            isSubmitDisabled={false}
            label={'Dismiss'}
          />
        </View>
      </View>
    </Modal>
  );
};
export default ErrorModal;

const style = StyleSheet.create({
  outerContainer: {
    width: '60%',
    height: hp(4.5),
    marginBottom: hp(5),
    marginTop: hp(5),
  },
  labelStyle: {
    fontSize: hp(2),
  },
  lowOpacity: value => ({
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
    opacity: value ? 1.0 : 0.5,
    position: 'absolute',
  }),
  container: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: hp(1),
    elevation: hp(1),
    paddingTop: hp(2),
  },
  parentContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  labelHeader: {
    fontSize: hp(2.8),
    alignSelf: 'center',
    color: Colors.BLACK,
    marginBottom: hp(1),
    fontWeight: '600',
    marginTop: hp(0.5),
  },
  labelContent: {
    marginTop: hp(0.5),
    color: Colors.GREY2,
    alignSelf: 'center',
    fontSize: RF(2),
    marginHorizontal: hp(2),
    textAlign: 'center',
  },
});
