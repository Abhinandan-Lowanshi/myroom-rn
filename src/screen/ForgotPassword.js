import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import CustomInputText from '../component/InputText';
import C_Button from '../component/C_Button';
import Header from '../component/Header';
import LableComponent from '../component/LabelComponent';
import {validateEmail} from '../common/Validations';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import ErrorModal from '../component/ErrorModal';
import FreezScreen from '../component/FreezScreen';
const ForgotPassword = ({navigation}) => {
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isOTPAvailable, setIsOTPAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [rePassword, setRePassword] = useState('');
  const [rePasswordError, setRePasswordError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [apiError, setApiError] = useState(false);
  const onPress = () => {
    if (!isOTPAvailable && !isOTPVerified) {
      if (email) {
        setLoading(true);
        sendRequest({email: email}, EndPoints.forgetPassword, 'POST')
          .then(response => {
            setLoading(false);
            if (response.status === true) {
              setIsOTPAvailable(true);
            } else {
              setApiError(response.message);
            }
          })
          .catch(e => {
            setLoading(false);
          });
      }
    } else if (isOTPAvailable && !isOTPVerified) {
      if (email && otp) {
        setLoading(true);
        sendRequest({email: email, otp: otp}, EndPoints.verfyOtp, 'POST')
          .then(response => {
            setLoading(false);
            if (response.status === true) {
              setIsOTPVerified(true);
            } else {
              setApiError(response.message);
            }
          })
          .catch(e => {
            setLoading(false);
          });
      }
    } else if (isOTPAvailable && isOTPVerified) {
      if (password) {
        setLoading(true);
        sendRequest(
          {email: email, password: password},
          EndPoints.updatePassword,
          'POST',
        )
          .then(response => {
            setLoading(false);
            if (response.status === true) {
              setApiError(response.message);
            } else {
              setApiError(response.message);
            }
          })
          .catch(e => {
            setLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    if (!isOTPAvailable && !isOTPVerified) {
      if (!validateEmail(email)) {
        setSubmitDisabled(true);
      } else {
        setSubmitDisabled(false);
      }
    } else if (isOTPAvailable && !isOTPVerified) {
      if (otp.length < 6) {
        setSubmitDisabled(true);
      } else {
        setSubmitDisabled(false);
      }
    } else if (isOTPAvailable && isOTPVerified) {
      if (
        password.length > 6 &&
        rePassword.length > 6 &&
        password === rePassword
      ) {
        setSubmitDisabled(false);
      } else {
        setSubmitDisabled(true);
      }

      if (password === rePassword) {
        setIsPasswordMatch(true);
      } else {
        setIsPasswordMatch(false);
      }
    }
  }, [email, otp, password, rePassword]);
  const onChangeEmail = value => {
    setEmail(value);
    if (!validateEmail(value) && !value == '') setEmailError(true);
    else setEmailError(false);
  };

  const onChangeOtp = value => {
    setOtp(value);
    if (value.length < 6 && !value == '') {
      setOtpError(true);
    } else {
      setOtpError(false);
    }
  };

  const onChangePassword = value => {
    setPassword(value);
    if (value.length < 6 && !value == '') {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const onChangeRePassword = value => {
    setRePassword(value);
    if (value.length < 6 && !value == '') {
      setRePasswordError(true);
    } else {
      setRePasswordError(false);
    }
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header label={'Forgot Password'} navigation={navigation} />
      <FreezScreen isLoading={loading} />
      <ErrorModal
        onPress={() => {
          setApiError('');
        }}
        label={apiError}
        visible={apiError ? true : false}></ErrorModal>
      <ScrollView>
        <View style={style.contentContainerStyle}>
          {/* <LableComponent label={'Forgot Password'} /> */}
          <CustomInputText
            value={email}
            onChangeText={onChangeEmail}
            outerContainer={style.outerContainerSocial}
            error={emailError}
            placeholder={'Enter Email'}
            errorMessage={'Invalid Email'}
            toplabel={'Enter Email'}
          />
          {isOTPAvailable && (
            <CustomInputText
              maxLength={6}
              isNumeric={true}
              value={otp}
              onChangeText={onChangeOtp}
              outerContainer={style.outerContainerSocial}
              error={otpError}
              placeholder={'Enter OTP'}
              errorMessage={'Invalid OTP'}
              toplabel={'Enter OTP'}
            />
          )}

          {isOTPVerified && (
            <>
              <CustomInputText
                value={password}
                onChangeText={onChangePassword}
                outerContainer={style.outerContainerSocial}
                error={passwordError}
                placeholder={'Enter Password'}
                errorMessage={'Invalid Password'}
                toplabel={'Enter Password'}
                isEyeVisible={true}
              />
              <CustomInputText
                value={rePassword}
                onChangeText={onChangeRePassword}
                outerContainer={style.outerContainerSocial}
                error={rePasswordError}
                placeholder={'Enter Re-Password'}
                errorMessage={'Invalid Re-Password'}
                toplabel={'Enter Re-Password'}
                isEyeVisible={true}
              />
              {!isPasswordMatch && (
                <Text style={style.textError}>Password not matched</Text>
              )}
            </>
          )}
          <C_Button
            onPress={onPress}
            outerContainer={style.outerContainer}
            label={
              isOTPVerified
                ? 'Submit Password'
                : isOTPAvailable
                ? 'Submit OTP'
                : 'Submit Email'
            }
            isLoading={loading}
            isSubmitDisabled={submitDisabled}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;
const style = StyleSheet.create({
  outerContainer: {
    marginTop: hp(5),
  },
  outerContainerSocial: {
    marginTop: hp(2),
  },
  textError: {
    alignSelf: 'flex-end',
    color: 'red',
    fontSize: RF(1.4),
    marginRight: hp(3.2),
  },
});
