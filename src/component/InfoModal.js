import React from 'react';
import {View, Modal, Text, StyleSheet} from 'react-native';
import C_Button from './C_Button';
import {hp, RF} from '../common/CommonFunctions';
const InfoModal = props => {
  return (
    <Modal visible={props?.visible} transparent={true}>
      <View style={style.lowOpacity}></View>
      <View style={[style.containerInfo, props?.containerInfo]}>
        <View style={[style.containerLabel, props?.containerLabel]}>
          <Text style={style.labelInfo}>{props?.label}</Text>
          <C_Button
            outerContainer={style.outerContainerDismiss}
            isLoading={false}
            onPress={props?.onPress}
            // outerContainer={style.outerContainer}
            isSubmitDisabled={false}
            label={props?.buttonLabel}
          />
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;

const style = StyleSheet.create({
  lowOpacity: {
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
    opacity: 0.7,
    position: 'absolute',
  },
  containerInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  containerLabel: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: hp(2),
    paddingVertical: hp(3),
    marginHorizontal: hp(2),
    borderRadius: hp(1),
  },
  outerContainerDismiss: {
    height: hp(5),
    width: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
  },
  labelInfo: {
    color: Colors.BLACK,
    fontSize: RF(2.3),
    textAlign: 'center',
    fontWeight: '600',
  },
});
