import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {hp} from '../common/CommonFunctions';
import CustomInputText from '../component/InputText';
import C_Button from '../component/C_Button';
import Colors from '../common/Colors';
import Header from '../component/Header';
const SignUp = ({navigation}) => {
  return (
    <View>
      <Header label={'SignUp'} />
      <ScrollView>
        <View style={style.contentContainerStyle}>
          <CustomInputText
            outerContainer={style.outerContainerSocial}
            error={false}
            placeholder={'Enter Name'}
            errorMessage={'Invalid Name'}
          />
          <CustomInputText
            outerContainer={style.outerContainerSocial}
            error={false}
            placeholder={'Enter Surname'}
            errorMessage={'Invalid Surname'}
          />
          <CustomInputText
            outerContainer={style.outerContainerSocial}
            error={false}
            placeholder={'Enter Email'}
            errorMessage={'Invalid Email'}
          />
          <CustomInputText
            outerContainer={style.outerContainerSocial}
            error={false}
            placeholder={'Enter Mobile No'}
            errorMessage={'Invalid Mobile No'}
          />
          <CustomInputText
            outerContainer={style.outerContainerSocial}
            error={false}
            placeholder={'Enter Permanent Address'}
            errorMessage={'Invalid Permanent Address'}
          />
          <CustomInputText
            outerContainer={style.outerContainerSocial}
            error={false}
            placeholder={'Enter Present Address'}
            errorMessage={'Invalid Present Address'}
          />
          <CustomInputText
            outerContainer={style.outerContainerSocial}
            error={false}
            placeholder={'Enter Password'}
            errorMessage={'Invalid Password'}
            isEyeVisible={true}
          />
          <CustomInputText
            outerContainer={style.outerContainerSocial}
            error={false}
            placeholder={'Enter Re-Password'}
            errorMessage={'Invalid Re-Password'}
            isEyeVisible={true}
          />
          <C_Button outerContainer={style.outerContainer} label={'SingUp'} />
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
  contentContainerStyle: {},
  textInputContainerStyle: {
    width: '100%',
  },
  outerContainer: {
    marginTop: hp(5),
  },
  outerContainerSocial: {
    marginTop: hp(1),
  },
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
});
