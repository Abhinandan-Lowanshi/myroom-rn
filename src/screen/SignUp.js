import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import CustomInputText from '../component/InputText';
import C_Button from '../component/C_Button';
import Colors from '../common/Colors';
import Header from '../component/Header';
import LabelComponent from '../component/LabelComponent';
import {validateEmail, validatePassword} from '../common/Validations';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import {useDispatch, useSelector} from 'react-redux';
import ErrorModal from '../component/ErrorModal';
import LowOpacityLoader from '../component/LowOpacityLoader';
import {setSignUp} from '../redux/Slice';
import ScreenName from '../common/ScreenName';
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setErrorEmail] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setErrorName] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setErrorPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(false);
  const [rePassword, setRePassword] = useState('');
  const [rePasswordError, setRePasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [emailApiError, setEmailApiError] = useState('');
  const device_token = useSelector(state => state.AllData.device_token);

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      name.length < 4 ||
      !validateEmail(email) ||
      password.length < 8 ||
      rePassword.length < 8 ||
      mobile.length < 10 ||
      !isPasswordMatch
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [name, email, password, rePassword, isPasswordMatch, mobile]);

  useEffect(() => {
    if (password === rePassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  }, [password, rePassword]);

  const emailOnChange = email => {
    setEmail(email);
    setEmailApiError('');
    if (!validateEmail(email) && !email == '') setErrorEmail(true);
    else setErrorEmail(false);
  };

  const nameOnChange = name => {
    setName(name);
    if (name !== '' && name.length < 4) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  };

  const onChangePassword = password => {
    setPassword(password);
    if (password.length < 8 && !password == '') setErrorPassword(true);
    else setErrorPassword(false);
  };

  const onChangeMobile = mobile => {
    setMobile(mobile);
    if (mobile.length < 10 && !mobile == '') setMobileError(true);
    else setMobileError(false);
  };

  const onRePasswordText = password => {
    setRePassword(password);
    if (password.length < 8 && !password == '') setRePasswordError(true);
    else setRePasswordError(false);
  };

  const getOtp = () => {
    if (email) {
      setLoading(true);
      sendRequest({email: email}, EndPoints.sendEmailOtp, 'POST')
        .then(response => {
          setLoading(false);
          if (response.status === true) {
            dispatch(
              setSignUp({
                firstName: name,
                lastName: '',
                email: email,
                phone: mobile,
                currentAdrs: 'nill',
                prmntAddress: 'nill',
                password: password,
                device_token: device_token,
                loginType: 'manual',
                social_token: 'nill',
              }),
            );
            navigation.navigate(ScreenName.EmailVerify);
          } else {
            setEmailApiError(response.message);
            //go back
          }
        })
        .catch(e => {
          setLoading(false);
        });
    }
  };

  const onPressDismiss = () => {
    setEmailApiError('');
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header label={'SignUp'} navigation={navigation} />
      {loading && <LowOpacityLoader />}
      <ErrorModal
        onPress={onPressDismiss}
        label={emailApiError}
        visible={emailApiError ? true : false}></ErrorModal>
      <ScrollView>
        <View style={style.contentContainerStyle}>
          {/* <LabelComponent label={'SignUp'}></LabelComponent> */}
          <CustomInputText
            value={name}
            onChangeText={nameOnChange}
            outerContainer={style.outerContainerSocial}
            error={nameError}
            placeholder={'Full Name'}
            errorMessage={'Invalid Name'}
          />
          <CustomInputText
            value={email}
            onChangeText={emailOnChange}
            outerContainer={style.outerContainerSocial}
            error={emailError}
            placeholder={'Email'}
            errorMessage={'Invalid Email'}
          />
          <CustomInputText
            value={mobile}
            onChangeText={onChangeMobile}
            outerContainer={style.outerContainerSocial}
            error={mobileError}
            placeholder={'Mobile number'}
            errorMessage={'Invalid mobile number'}
            maxLength={10}
            isNumeric={true}
          />
          <CustomInputText
            value={password}
            onChangeText={onChangePassword}
            outerContainer={style.outerContainerSocial}
            error={passwordError}
            placeholder={'Password'}
            errorMessage={'Invalid Password'}
            isEyeVisible={true}
          />
          <CustomInputText
            value={rePassword}
            onChangeText={onRePasswordText}
            outerContainer={style.outerContainerSocial}
            error={rePasswordError}
            placeholder={'Password'}
            errorMessage={'Invalid Re-Password'}
            isEyeVisible={true}
          />
          {!isPasswordMatch && (
            <Text style={style.textError}>Password not matched</Text>
          )}
          <C_Button
            onPress={getOtp}
            outerContainer={style.outerContainer}
            isSubmitDisabled={isSubmitDisabled}
            label={'Proceed'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
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
    flex: 1,
    marginTop: hp(2),
  },
  textInputContainerStyle: {
    width: '100%',
  },
  outerContainer: {
    marginTop: hp(5),
    marginBottom: hp(10),
  },
  outerContainerSocial: {},
  labelOr: {
    alignSelf: 'center',
    marginVertical: hp(3),
    color: Colors.BLACK,
  },
  signUpContainerSytle: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  textError: {
    alignSelf: 'flex-end',
    color: 'red',
    fontSize: RF(1.4),
    marginTop: hp(0.1),
    marginRight: hp(3.2),
  },
});
