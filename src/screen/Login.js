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
import {hp, RF} from '../common/CommonFunctions';
import CustomInputText from '../component/InputText';
import C_Button from '../component/C_Button';
import SocialLoginBt from '../component/SocialLoginBt';
import images from '../common/images';
import Colors from '../common/Colors';
import ScreenName from '../common/ScreenName';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import {validateEmail} from '../common/Validations';
import AsyncKeys from '../localStorage/AsyncKeys';
import localStorageOp from '../localStorage/LocalData';
import ErrorModal from '../component/ErrorModal';
import {CommonActions} from '@react-navigation/native';
import LowOpacityLoader from '../component/LowOpacityLoader';
import {getAccountImfo} from '../redux/Slice';
import {useDispatch} from 'react-redux';
const Login = ({navigation}) => {
  // const [email, setEmail] = useState('abhinandanlowanshi@gmail.com');
  const [email, setEmail] = useState('');
  const [loading, SetIsLoading] = useState(false);
  // const [password, setPassword] = useState('Abhi@7049');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [authError, setAuthError] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [apiError, setApiError] = useState(false);
  const dispatch = useDispatch(dispatch);
  React.useEffect(() => {
    setAuthError('');
    if (validateEmail(email) && password.length >= 6)
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
    if (password.length < 6 && !password == '') setPasswordError(true);
    else setPasswordError(false);
  };

  const SignUp = () => {
    SetIsLoading(true);
    sendRequest(
      {
        email: email,
        password: password,
      },
      EndPoints.login,
      'POST',
    )
      .then(response => {
        SetIsLoading(false);
        if (response?.status === true) {
          setApiError(response?.message);
          localStorageOp(true, AsyncKeys.USERDATA, response);
          dispatch(getAccountImfo(response));
          // navigation.navigate(ScreenName.TabComponent);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ScreenName.TabComponent}],
            }),
          );
        } else {
          setAuthError(response?.message);
        }
      })
      .catch(e => {
        SetIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <LowOpacityLoader />}
      <ScrollView>
        <AppLogo style={style.appLogoStyle} textStyle={style.logoTextStyle} />
        <ErrorModal
          onPress={() => {
            setApiError('');
          }}
          label={apiError}
          visible={apiError ? true : false}></ErrorModal>
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
          {authError && <Text style={style.textError}>{authError}</Text>}
          <C_Button
            onPress={SignUp}
            outerContainer={style.outerContainer}
            label={'LogIn'}
            loading={loading}
            isSubmitDisabled={isSubmitDisabled}
          />
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text style={style.labelForgot}>Forgot password?</Text>
          </TouchableOpacity>
          <Text style={style.labelOr}>Or</Text>
          <SocialLoginBt
            onPress={() => {
              setApiError('Login with Google will available soon');
            }}
            icon={images.googleIcon}
            label={'Login with Google'}
          />
          <SocialLoginBt
            onPress={() => {
              setApiError('Login with Facebook will available soon');
            }}
            labelStyle={style.fbLabelStyle}
            icon={images.Facebook}
            label={'Login with Facebook'}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenName.SignUp);
            }}
            style={style.signUpContainerStyle}>
            <Text style={style.labelSign2}>Don't have an account? SingUp</Text>
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
  signUpContainerStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(1),
  },
  labelSign2: {
    color: Colors.PRIMARY,
  },
  labelForgot: {
    color: Colors.PRIMARY,
    alignSelf: 'flex-end',
    marginRight: hp(2),
    marginTop: hp(0.5),
  },
  inputContainerStyle: {
    marginTop: 20,
  },
  fbLabelStyle: {},
  textError: {
    color: 'red',
    fontSize: RF(1.4),
    marginTop: hp(0.1),
    marginLeft: hp(3.2),
  },
});
