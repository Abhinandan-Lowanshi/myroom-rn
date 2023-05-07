import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../common/Colors';
import {hp, RF} from '../common/CommonFunctions';
import C_Button from './C_Button';
import {useEffect} from 'react';

const GPSDialogue = ({
  visible,
  useDefaultLocation,
  handleOpenSettings,
  closeModal,
}) => {
  return (
    <Modal
      backdropOpacity={0.3}
      activeOpacity={0.9}
      transparent={true}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        activeOpacity: 0.3,
        backdropOpacity: 0.2,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
      visible={visible}>
      <View style={style.lowOpacity}></View>
      <View style={style.container}>
        <Text style={style.deleteLabel}>
          {'GPS service is not available or Permission denied'}
        </Text>
        <View style={style.container2}>
          <Text style={style.label2}>
            {
              'Use default location when GPS service is not available or turn on GPS'
            }
          </Text>
        </View>
        <View style={style.containerButtonLayout}>
          <C_Button
            outerContainer={style.cancelButton(false)}
            onPress={handleOpenSettings}
            label={'Go to settings'}
          />
          <C_Button
            outerContainer={style.deleteButton}
            onPress={useDefaultLocation}
            label={'Default location'}
          />
        </View>
        <C_Button
          outerContainer={style.exitButton}
          onPress={handleOpenSettings}
          label={'Close App'}
        />
      </View>
    </Modal>
  );
};
export default GPSDialogue;

const style = StyleSheet.create({
  outerContainer: {
    width: '70%',
    height: hp(4.5),
  },
  container: {
    marginTop: '50%',
    marginHorizontal: hp(2),
    backgroundColor: Colors.WHITE,
    borderRadius: hp(1),
    elevation: hp(1),
  },
  labelStyle: {
    fontSize: hp(2),
  },
  closeIcon: {
    alignSelf: 'flex-end',
    marginRight: hp(1.8),
    marginTop: hp(1),
  },
  deleteLabel: {
    alignSelf: 'center',
    fontSize: RF(2.2),
    fontWeight: '600',
    color: Colors.BLACK1,
    marginTop: hp(2),
    marginHorizontal: hp(2),
    textAlign: 'center',
  },
  containerWarning: {
    flexDirection: 'row',
    marginTop: hp(2),
    marginHorizontal: hp(3),
    backgroundColor: '#f5c4c6',
    borderRadius: hp(1),
  },
  container2: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  label2: {
    color: Colors.GREY2,
    alignSelf: 'center',
    fontSize: RF(1.8),
    fontWeight: '600',
    marginHorizontal: hp(3),
    textAlign: 'center',
  },
  label3: {
    alignSelf: 'center',
    fontSize: RF(1.8),
    fontWeight: '600',
    color: Colors.BLACK1,
  },
  line: {
    width: hp(0.5),
    backgroundColor: '#e6454d',
    borderTopLeftRadius: hp(1),
    borderBottomLeftRadius: hp(1),
  },
  warningIcon: {
    marginTop: hp(1),
    marginLeft: hp(2),
  },
  warningMessageContainer: {
    marginTop: hp(1),
    marginLeft: hp(2),
    marginBottom: hp(1),
  },
  warningLabel: {
    fontSize: RF(1.8),
    fontWeight: '600',
    color: '#ba0d16',
  },
  warningMessage: {
    fontSize: RF(1.5),
    fontWeight: '600',
    maxWidth: '90%',
    color: '#ba3a41',
    marginBottom: hp(1),
  },
  containerButtonLayout: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: hp(2),
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  cancelButton: isLoading => ({
    flex: 1,
    borderRadius: hp(1),
    marginRight: hp(1),
    backgroundColor: isLoading ? Colors.BLUELITE1 : Colors.BLUE,
  }),
  deleteButton: {
    flex: 1,
    borderRadius: hp(1),
    marginLeft: hp(1),
    backgroundColor: Colors.BLUE,
  },
  errorlabel: {
    alignSelf: 'center',
    fontSize: RF(1.8),
    fontWeight: '600',
    color: '#ba0d16',
  },
  lowOpacity: {
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
    opacity: 0.5,
    position: 'absolute',
  },
  exitButton: {
    borderRadius: hp(1),
    marginLeft: hp(1),
    backgroundColor: Colors.RED,
    marginBottom: hp(3),
  },
});
