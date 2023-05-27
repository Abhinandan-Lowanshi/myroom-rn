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
import {getAccountImfo, setOwnerData} from '../redux/Slice';
import LowOpacityLoader from '../component/LowOpacityLoader';
import localStorageOp from '../localStorage/LocalData';
import AsyncKeys from '../localStorage/AsyncKeys';
import Toast from 'react-native-simple-toast';

const EditProfile = ({navigation}) => {
  const accountData = useSelector(state => state.AllData.accountData);
  const [name, setName] = useState(accountData?.data?.usr_firstName);
  const [nameError, setErrorName] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(
    accountData?.data?.usr_phone,
  );
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [emailApiError, setEmailApiError] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    if (name?.length < 4 || mobileNumber?.length === 0) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [name, mobileNumber]);

  // const emailOnChange = email => {
  //     setEmail(email);
  //     setEmailApiError('');
  //     if (!validateEmail(email) && !email == '') setErrorEmail(true);
  //     else setErrorEmail(false);
  // };

  const nameOnChange = name => {
    setName(name);
    if (name !== '' && name?.length < 4) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  };

  const onMobileNumberText = mobileNumber => {
    setMobileNumber(mobileNumber);
    if (mobileNumber?.length < 10 && !mobileNumber == '')
      setMobileNumberError(true);
    else setMobileNumberError(false);
  };

  const showToast = message => {
    Toast.show(message, Toast.LONG);
  };

  const updateProfile = () => {
    if (accountData?.data?.usr_email && name && mobileNumber) {
      setLoading(true);
      sendRequest(
        {
          user_id: 2,
          usr_firstName: name,
          usr_lastName: '',
          usr_phone: mobileNumber,
          usr_parmentAdrss: '',
          usr_currentAdrss: '',
        },
        EndPoints.editUserProfile,
        'POST',
      )
        .then(response => {
          setLoading(false);
          if (response.status === true) {
            showToast('Profile has successfully updated');
            let accountDataTemp = JSON.parse(JSON.stringify(accountData));
            accountDataTemp.data.usr_firstName = name;
            accountDataTemp.data.usr_phone = mobileNumber;
            localStorageOp(true, AsyncKeys.USERDATA, accountDataTemp);
            dispatch(
              setOwnerData({
                name: name,
                mobile: mobileNumber,
              }),
            );
            dispatch(getAccountImfo(accountDataTemp), navigation.goBack());
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
      <Header label={'Edit Profile'} navigation={navigation} />
      {loading && <LowOpacityLoader />}
      <ErrorModal
        onPress={onPressDismiss}
        label={emailApiError}
        visible={emailApiError ? true : false}></ErrorModal>
      <FreezScreen isLoading={loading} />
      <ScrollView>
        <View style={style.contentContainerStyle}>
          <CustomInputText
            value={name}
            onChangeText={nameOnChange}
            outerContainer={style.outerContainerSocial}
            error={nameError}
            placeholder={'FullName'}
            errorMessage={'Invalid Name'}
          />
          {/* <CustomInputText
                        value={email}
                        onChangeText={emailOnChange}
                        outerContainer={style.outerContainerSocial}
                        error={emailError}
                        placeholder={'Enter Email'}
                        errorMessage={'Invalid Email'}
                    /> */}
          <CustomInputText
            isNumeric={true}
            maxLength={10}
            value={mobileNumber}
            onChangeText={onMobileNumberText}
            outerContainer={style.outerContainerSocial}
            error={mobileNumberError}
            placeholder={'Mobile Number'}
            errorMessage={'Invalid Mobile Number'}
          />

          <C_Button
            // isLoading={loading}
            onPress={updateProfile}
            outerContainer={style.outerContainer}
            isSubmitDisabled={isSubmitDisabled}
            label={'Update Profile'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;
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
});
