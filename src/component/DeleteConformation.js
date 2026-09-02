import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../common/Colors';
import {hp, RF} from '../common/CommonFunctions';
import C_Button from './C_Button';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {useEffect} from 'react';

const DeleteConformation = ({
  labelTop,
  visible,
  onPressNegative,
  onPressPositive,
  warningMessage,
  confirmationMessage,
  confirmationMessageHigh,
  undoMessage,
  labelPositive,
  labelNegative,
  closeModal,
  isLoading,
  error,
}) => {
  const [close, setClose] = useState(true);
  // // setClose(visible);
  // const closeModal1 = () => {
  //   setClose(false);
  // };
  return (
    <Modal
      backdropOpacity={0.3}
      activeOpacity={0.9}
      // backdropOpacity={1}
      transparent={true}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        activeOpacity: 0.3,
        backdropOpacity: 0.2,
        // backgroundColor: 'red',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
      visible={visible}>
      <View style={style.lowOpacity}></View>
      <View style={style.container}>
        <TouchableOpacity disabled={isLoading} onPress={() => closeModal()}>
          <MaterialCommunityIcons
            style={style.closeIcon}
            name={'close'}
            size={hp(3)}
            color={Colors.GREY}
          />
        </TouchableOpacity>
        <Text style={style.deleteLabel}>{labelTop || 'Delete Post?'}</Text>
        <View style={style.container2}>
          {confirmationMessage && (
            <Text style={style.label2}>{confirmationMessage}</Text>
          )}
          {confirmationMessageHigh && (
            <Text style={style.label3}>{confirmationMessageHigh}</Text>
          )}
        </View>
        <Text style={style.label2}>{undoMessage}</Text>
        {warningMessage && (
          <View style={style.containerWarning}>
            <View style={style.line}></View>
            <Ionicons
              style={style.warningIcon}
              name={'warning'}
              size={hp(3)}
              color={'#eb1e29'}
            />
            <View style={style.warningMessageContainer}>
              <Text style={style.warningLabel}>Warning</Text>
              <Text style={style.warningMessage}>{warningMessage}</Text>
            </View>
          </View>
        )}
        <Text style={style.errorlabel}>{error}</Text>
        <View style={style.containerButtonLayout}>
          <C_Button
            isSubmitDisabled={isLoading}
            outerContainer={style.cancelButton(isLoading)}
            onPress={onPressNegative}
            label={labelNegative || 'No'}
          />
          <C_Button
            isSubmitDisabled={isLoading}
            isLoading={isLoading}
            outerContainer={style.deleteButton}
            onPress={onPressPositive}
            label={error ? 'Retry' : labelPositive || 'Yes'}
          />
        </View>
      </View>
    </Modal>
  );
};
export default DeleteConformation;

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
    marginHorizontal: hp(6),
    marginTop: hp(2),
    marginBottom: hp(3),
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
    backgroundColor: Colors.RED,
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
});
