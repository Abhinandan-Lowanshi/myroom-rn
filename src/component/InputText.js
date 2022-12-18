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
  isEyeVisible,
}) => {
  const [isPassWordHidden, setIsPasswordHidden] = React.useState(true);
  return (
    <View style={[style.outerContainer, outerContainer]}>
      <Text style={style.labelStyle}>{toplabel}</Text>
      <View style={[style.containerStyle(error), containerStyleP]}>
        <TextInput
          style={[style.InputTextStyle(error), InputTextStyleP]}
          placeholder={placeholder}
          value={value}
          placeholderTextColor={Colors.BLACK}
          onChangeText={value => onChangeText(value)}
          multiline={false}
          secureTextEntry={isEyeVisible && isPassWordHidden}
          keyboardType={'email-address'}
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
    height: hp(5),
    color: error ? Colors.RED : Colors.BLACK,
    fontSize: hp(1.6),
    flex: 1,
  }),
  containerStyle: error => ({
    flexDirection: 'row',
    width: '90%',
    backgroundColor: Colors.GREY1,
    paddingLeft: hp(2),
    borderColor: error ? Colors.RED : Colors.GREY,
    borderWidth: 0.9,
    borderRadius: hp(1),
  }),
  textError: {
    color: 'red',
    fontSize: RF(1.1),
    marginLeft: 5,
    marginTop: 3,
  },
  outerContainer: {
    alignSelf: 'center',
    marginTop: hp(3),
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
