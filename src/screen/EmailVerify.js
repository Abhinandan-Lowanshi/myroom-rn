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
import localStorageOp from '../localStorage/LocalData';
import LowOpacityLoader from '../component/LowOpacityLoader';
import {getAccountImfo} from '../redux/Slice';
import {useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {styles} from 'react-native-image-slider-banner/src/style';

const EmailVerify = ({navigation}) => {
  const signInData = useSelector(state => state.AllData.signInData);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [apiError, setApiError] = useState(false);
  const dispatch = useDispatch();
  const SignUp = () => {
    setLoading(true);
    sendRequest(signInData, EndPoints.register, 'POST')
      .then(response => {
        setLoading(false);
        if (response.status === true) {
          localStorageOp(true, AsyncKeys.USERDATA, response);
          dispatch(getAccountImfo(response));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ScreenName.TabComponent}],
            }),
          );
        } else {
          setApiError(response?.message);
          setLoading(false);
        }
      })
      .catch(e => {
        setLoading(false);
      });
    // sendRequest(
    //   {email: signInData?.email, otp: otp},
    //   EndPoints.verifyEmailOtp,
    //   'POST',
    // )
    //   .then(response => {
    //     if (response.status === true) {
    //       sendRequest(signInData, EndPoints.register, 'POST')
    //         .then(response => {
    //           setLoading(false);
    //           if (response.status === true) {
    //             localStorageOp(true, AsyncKeys.USERDATA, response);
    //             dispatch(getAccountImfo(response));
    //             console.log(response, 'navigation.navigate Signup');
    //             navigation.dispatch(
    //               CommonActions.reset({
    //                 index: 0,
    //                 routes: [{name: ScreenName.TabComponent}],
    //               }),
    //             );
    //           } else {
    //             setApiError('Something went wrong');
    //             setLoading(false);
    //           }
    //         })
    //         .catch(e => {
    //           setLoading(false);
    //         });
    //     } else {
    //       setApiError('Something went wrong');
    //       setLoading(false);
    //     }
    //   })
    //   .catch(e => {
    //     setLoading(false);
    //   });
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
      <Header label={'Verify Email'} navigation={navigation} />
      {loading && <LowOpacityLoader />}
      <ErrorModal
        onPress={() => {
          setApiError('');
        }}
        header={'Opps!'}
        label={apiError}
        visible={apiError ? true : false}></ErrorModal>
      <View style={styles.containerStyle} />
      <CustomInputText
        value={signInData.email}
        disabled={true}
        placeholder={'Email'}
      />
      <CustomInputText
        error={otpError}
        maxLength={6}
        isNumeric={true}
        errorMessage={errorMessage}
        value={otp}
        onChangeText={otpOnChange}
        placeholder={'6 digit otp'}
      />
      <C_Button
        onPress={SignUp}
        isSubmitDisabled={isSubmitDisabled}
        label={'Sign Up'}
      />
    </View>
  );
};

export default EmailVerify;
