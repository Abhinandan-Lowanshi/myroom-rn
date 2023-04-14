import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import CustomInputText from '../component/InputText';
import C_Button from '../component/C_Button';
import Colors from '../common/Colors';
import Header from '../component/Header';
import {validateEmail} from '../common/Validations';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import ErrorModal from '../component/ErrorModal';
import FreezScreen from '../component/FreezScreen';
import ScreenName from '../common/ScreenName';
import {useSelector, useDispatch} from 'react-redux';
import {getAccountImfo} from '../redux/Slice';
import LowOpacityLoader from '../component/LowOpacityLoader';

const ChangePassword = ({navigation}) => {
  const accountData = useSelector(state => state.AllData.accountData);
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [emailApiError, setEmailApiError] = useState('');
  const [password, SetPassword] = useState('');
  const [passwordError, setErrorPassword] = useState(false);
  const [rePassword, setRePassword] = useState('');
  const [rePasswordError, setRePasswordError] = useState(false);
  const [passwordMatched, setPasswordMatched] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      password.length < 8 ||
      currentPassword.length < 8 ||
      rePassword.length < 8 ||
      !(rePassword === password)
    ) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
    if (rePassword !== password) {
      setPasswordMatched('Password not matched');
    } else {
      setPasswordMatched('');
    }
  }, [password, currentPassword, rePassword]);

  const passwordOnChange = password => {
    SetPassword(password);
    if (password !== '' && password.length < 8) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  };

  const onCurrentPasswordText = currentPassword => {
    setCurrentPassword(currentPassword);
    if (currentPassword.length < 8 && !currentPassword == '')
      setCurrentPasswordError(true);
    else setCurrentPasswordError(false);
  };
  const rePasswordOnChange = rePassword => {
    setRePassword(rePassword);
    if (rePassword.length < 8 && !rePassword == '') setRePasswordError(true);
    else setRePasswordError(false);
  };

  const updateProfile = () => {
    if (accountData?.usr_email && password && currentPassword) {
      setLoading(true);
      sendRequest(
        {
          user_id: 2,
          old_password: currentPassword,
          new_password: password,
        },
        EndPoints.resetPassword,
        'POST',
      )
        .then(response => {
          setLoading(false);
          setEmailApiError(response.message);
          if (response.status === true) {
          } else {
            setEmailApiError(response.message);
            //go back
          }
        })
        .catch(e => {
          setEmailApiError(response.message);
          setLoading(false);
        });
    }
  };

  const onPressDismiss = () => {
    setEmailApiError('');
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header label={'Change Password'} navigation={navigation} />
      {loading && <LowOpacityLoader />}
      <ErrorModal
        onPress={onPressDismiss}
        label={emailApiError}
        visible={emailApiError ? true : false}></ErrorModal>
      <FreezScreen isLoading={loading} />
      <ScrollView>
        <View style={style.contentContainerStyle}>
          <CustomInputText
            value={currentPassword}
            onChangeText={onCurrentPasswordText}
            outerContainer={style.outerContainerSocial}
            error={currentPasswordError}
            placeholder={'Enter Current Password'}
            errorMessage={'Enter Current Password'}
            isEyeVisible={true}
          />
          <CustomInputText
            value={password}
            onChangeText={passwordOnChange}
            outerContainer={style.outerContainerSocial}
            error={passwordError}
            placeholder={'Enter Password'}
            errorMessage={'Invalid Password'}
            isEyeVisible={true}
          />
          <CustomInputText
            value={rePassword}
            onChangeText={rePasswordOnChange}
            outerContainer={style.outerContainerSocial}
            error={rePasswordError}
            placeholder={'Re-enter Password'}
            errorMessage={'Invalid Password'}
            isEyeVisible={true}
          />
          <Text style={style.matchedPassword}>{passwordMatched}</Text>

          <C_Button
            // isLoading={loading}
            onPress={updateProfile}
            outerContainer={style.outerContainer}
            isSubmitDisabled={isSubmitDisabled}
            label={'Change Password'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;
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
  matchedPassword: {
    alignSelf: 'flex-end',
    color: 'red',
    fontSize: RF(1.4),
    marginTop: hp(0.1),
    marginRight: hp(3.2),
  },
});
