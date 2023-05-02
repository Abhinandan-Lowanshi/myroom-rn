import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import Colors from '../common/Colors';
import Icon from 'react-native-vector-icons/Entypo';
const CustomInputText = ({
  containerStyleP,
  InputTextStyleP,
  placeholder,
  errorMessage,
  error,
  onChangeText,
  value,
  outerContainer,
  toplabel,
  disabled,
  isEyeVisible,
  isNumeric,
  maxLength,
  multiline,
}) => {
  const [isPassWordHidden, setIsPasswordHidden] = React.useState(true);
  return (
    <View style={[style.outerContainer, outerContainer]}>
      <View style={[style.containerStyle(error, disabled), containerStyleP]}>
        <TextInput
          maxLength={maxLength || 50}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          style={[style.InputTextStyle(error), InputTextStyleP]}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={Colors.BLACK}
          onChangeText={value => onChangeText(value)}
          multiline={multiline}
          secureTextEntry={isEyeVisible && isPassWordHidden}
          keyboardType={
            isNumeric
              ? 'number-pad'
              : isEyeVisible
              ? 'default'
              : 'email-address'
          }
        />
        {isEyeVisible ? (
          <TouchableOpacity
            onPress={() => {
              setIsPasswordHidden(!isPassWordHidden);
            }}
            style={style.iconStyle}>
            <Icon
              name={isPassWordHidden ? 'eye-with-line' : 'eye'}
              size={hp(2.7)}
              color={Colors.PRIMARY}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {error && <Text style={style.textError}>{errorMessage || 'Error'}</Text>}
    </View>
  );
};

export default CustomInputText;
const style = StyleSheet.create({
  InputTextStyle: error => ({
    color: error ? Colors.RED : Colors.BLACK,
    fontSize: hp(1.6),
    flex: 1,
    borderRadius: hp(1),
  }),
  containerStyle: (error, disabled) => ({
    flexDirection: 'row',
    width: '90%',
    backgroundColor: Colors.GREY1,
    paddingLeft: hp(2),
    backgroundColor: 'white',
    elevation: 3,
    borderColor: disabled ? Colors.PRIMARY : error ? Colors.RED : Colors.GREY,
    borderRadius: hp(1),
    borderWidth: hp(0.2),
  }),
  textError: {
    color: 'red',
    fontSize: RF(1.1),
    marginLeft: 5,
    marginTop: hp(0.6),
  },
  outerContainer: {
    alignSelf: 'center',
    // elevation: 5,
    borderRadius: hp(1),
    marginTop: hp(2),
  },
  checkBoxContainerStyle: {
    flexDirection: 'row',
  },
  checkBoxLabel: {
    alignSelf: 'center',
  },
  labelStyle: {
    color: Colors.BLACK,
    fontSize: hp(1.6),
    marginBottom: hp(0.5),
    marginLeft: hp(0.5),
  },
  iconStyle: {
    alignSelf: 'center',
    marginRight: hp(2),
  },
});
