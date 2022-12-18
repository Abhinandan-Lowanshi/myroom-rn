import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppLogo from '../component/applogo/AppLogo';
import {hp} from '../common/CommonFunctions';
import CustomInputText from '../component/InputText';
import C_Button from '../component/C_Button';
import SocialLoginBt from '../component/SocialLoginBt';
import images from '../common/images';
import Colors from '../common/Colors';
import ScreenName from '../common/ScreenName';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import {validateEmail, validatePassword} from '../common/Validations';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isFirstRender, SetIsFirstRender] = useState(true);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  React.useEffect(() => {
    if (validateEmail(email) && validatePassword(password))
      setIsSubmitDisabled(false);
    else setIsSubmitDisabled(true);
  }, [email, password]);

  const onEmailText = email => {
    setEmail(email);
    if (!validateEmail(email) && !email == '') setEmailError(true);
    else setEmailError(false);
  };

  const onPasswordText = password => {
    setPassword(password);
    if (!validatePassword(password) && !password == '') setPasswordError(true);
    else setPasswordError(false);
  };

  const SignUp = () => {};
  return (
    <SafeAreaView>
      <ScrollView>
        <AppLogo style={style.appLogoStyle} textStyle={style.logoTextStyle} />
        <View style={style.contentContainerStyle}>
          <CustomInputText
            value={email}
            onChangeText={onEmailText}
            error={emailError}
            placeholder={'Enter email'}
            errorMessage={'Invalid Email'}
          />
          <CustomInputText
            value={password}
            onChangeText={onPasswordText}
            outerContainer={style.inputContainerStyle}
            error={passwordError}
            placeholder={'Enter password'}
            errorMessage={'Invalid password'}
            isPassworHidden={true}
            isEyeVisible={true}
          />
          <C_Button
            onPress={SignUp}
            outerContainer={style.outerContainer}
            label={'LogIn'}
            isSubmitDisabled={isSubmitDisabled}
          />
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text style={style.labelforgot}>Forgot password?</Text>
          </TouchableOpacity>
          <Text style={style.labelOr}>Or</Text>
          <SocialLoginBt icon={images.googleicon} label={'Login with Google'} />
          <SocialLoginBt
            labelStyle={style.fbLabelStyle}
            icon={images.Facebook}
            label={'Login with Facebook'}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenName.SignUp);
            }}
            style={style.signUpContainerSytle}>
            <Text style={style.labelsign2}>Don't have an account? SingUp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
const style = StyleSheet.create({
  logoTextStyle: {
    fontSize: hp(5),
    color: 'red',
  },
  appLogoStyle: {
    marginTop: hp(10),
    alignSelf: 'center',
  },
  contentContainerStyle: {
    marginTop: hp(7),
  },
  textInputContainerStyle: {
    width: '100%',
  },
  outerContainer: {
    marginTop: hp(3),
  },
  outerContainerSocial: {
    marginTop: hp(1.9),
  },
  labelOr: {
    alignSelf: 'center',
    marginBottom: hp(2.5),
    marginTop: hp(3),
    color: Colors.BLACK,
  },
  signUpContainerSytle: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(1),
  },
  labelsign1: {
    color: Colors.BLACK,
  },
  labelsign2: {
    color: Colors.PRIMARY,
  },
  labelforgot: {
    color: Colors.PRIMARY,
    alignSelf: 'flex-end',
    marginRight: hp(2),
    marginTop: hp(0.5),
  },
  inputContainerStyle: {
    marginTop: -5,
  },
  fbLabelStyle: {},
});
