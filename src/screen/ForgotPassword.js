import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {hp} from '../common/CommonFunctions';
import CustomInputText from '../component/InputText';
import C_Button from '../component/C_Button';
import Header from '../component/Header';
const ForgotPassword = ({navigation}) => {
  const [isOTPVerified, setIsOTPVerified] = React.useState(false);
  const [isOTPAvailable, setIsOTPAvailable] = React.useState(false);

  return (
    <View>
      <Header label={'Forgot Password'} />
      <ScrollView>
        <View style={style.contentContainerStyle}>
          <CustomInputText
            outerContainer={style.outerContainerSocial}
            error={false}
            placeholder={'Enter Email'}
            errorMessage={'Invalid Email'}
            toplabel={'Enter Email'}
          />
          {isOTPAvailable && (
            <CustomInputText
              outerContainer={style.outerContainerSocial}
              error={false}
              placeholder={'Enter OTP'}
              errorMessage={'Invalid OTP'}
              toplabel={'Enter OTP'}
            />
          )}

          {isOTPVerified && (
            <>
              <CustomInputText
                outerContainer={style.outerContainerSocial}
                error={false}
                placeholder={'Enter Password'}
                errorMessage={'Invalid Password'}
                toplabel={'Enter Password'}
                isEyeVisible={true}
              />
              <CustomInputText
                outerContainer={style.outerContainerSocial}
                error={false}
                placeholder={'Enter Re-Password'}
                errorMessage={'Invalid Re-Password'}
                toplabel={'Enter Re-Password'}
                isEyeVisible={true}
              />
            </>
          )}
          <C_Button
            outerContainer={style.outerContainer}
            label={
              isOTPVerified
                ? 'Submit Password'
                : isOTPAvailable
                ? 'Submit OTP'
                : 'Submit Email'
            }
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
});
