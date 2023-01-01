import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import sendRequest from '../networking/ApiFunctions';
import StyleGlobel from '../Style/StyleGlobel';
import {useSelector} from 'react-redux';
import Header from '../component/Header';
import CustomInputText from '../component/InputText';
import C_Button from '../component/C_Button';
import EndPoints from '../networking/EndPoints';
import ErrorModal from '../component/ErrorModal';
import ScreenName from '../common/ScreenName';

const EmailVerify = ({navigation}) => {
  const signInData = useSelector(state => state.AllData.signInData);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [apiError, setApiError] = useState(false);

  const SignUp = () => {
    setLoading(true);
    sendRequest(
      {email: signInData?.email, otp: otp},
      EndPoints.verifyEmailotp,
      'POST',
    )
      .then(response => {
        if (response.status === true) {
          sendRequest(signInData, EndPoints.register, 'POST')
            .then(response => {
              setLoading(false);
              if (response.status === true) {
                localStorageOp(true, AsyncKeys.USERDATA, response.data);
                navigation.navigate(ScreenName.TabComponent);
              } else {
                setApiError(response?.message);
                setLoading(false);
              }
            })
            .catch(e => {
              setLoading(false);
            });
        } else {
          setApiError(response?.message);
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
      });
  };

  const otpOnChange = otp => {
    setOtp(otp);
    if (otp.length < 6) {
      setOtpError(true);
      setIsSubmitDisabled(true);
      setErrorMessage('Enter 6 digit otp');
    } else {
      setOtpError(false);
      setIsSubmitDisabled(false);
      setErrorMessage('');
    }
  };

  return (
    <View style={StyleGlobel.containerStyle}>
      <Header label={'Verify Email'} />{' '}
      <ErrorModal
        onPress={() => {
          setApiError('');
        }}
        label={apiError}
        visible={apiError ? true : false}></ErrorModal>
      <CustomInputText value={signInData.email} disabled={true} />
      <CustomInputText
        error={otpError}
        maxLength={6}
        isNumeric={true}
        errorMessage={errorMessage}
        value={otp}
        onChangeText={otpOnChange}
        placeholder={'Enter 6 digit otp'}
      />
      <C_Button
        isLoading={loading}
        onPress={SignUp}
        isSubmitDisabled={isSubmitDisabled}
        label={'Sign Up'}
      />
    </View>
  );
};

export default EmailVerify;
