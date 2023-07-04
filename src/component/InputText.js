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
  topLabel,
  disabled,
  isEyeVisible,
  isNumeric,
  maxLength,
  multiline,
}) => {
  const [isPassWordHidden, setIsPasswordHidden] = React.useState(true);
  const [focus, setFocus] = React.useState(false);

  const focusChange = value => {
    console.log(value, 'Value');
  };

  return (
    <View style={[style.outerContainer, outerContainer]}>
      <View
        style={[style.containerStyle(error, disabled, focus), containerStyleP]}>
        <TextInput
          maxLength={maxLength || 50}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          style={[style.InputTextStyle(error), InputTextStyleP]}
          placeholder={focus ? null : placeholder}
          value={value}
          placeholderTextColor={Colors.BLACK}
          onChangeText={value => onChangeText(value)}
          multiline={multiline}
          secureTextEntry={isEyeVisible && isPassWordHidden}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
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
      {(focus || value) && (
        <Text style={[style.topLabel, topLabel]}>{placeholder}</Text>
      )}
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
  containerStyle: (error, disabled, focus = false) => ({
    flexDirection: 'row',
    width: '90%',
    backgroundColor: Colors.GREY1,
    paddingLeft: hp(2),
    backgroundColor: 'white',
    elevation: 3,
    borderColor:
      disabled || (focus && !error)
        ? Colors.PRIMARY
        : error
        ? Colors.RED
        : Colors.GREY,
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
    marginTop: 5,
    paddingTop: hp(1),
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
  topLabel: {
    color: Colors.BLACK,
    fontSize: RF(1.8),
    position: 'absolute',
    left: hp(2),
    backgroundColor: Colors.WHITE,
    paddingHorizontal: hp(1),
    fontWeight: '600',
  },
});
