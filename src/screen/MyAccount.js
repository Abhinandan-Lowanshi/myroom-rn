import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {hp, RF} from '../common/CommonFunctions';
import AccountTouchableCom from '../component/AccountTouchableCom';
import {getAccountImfo, startL, endL} from '../redux/Slice';
import {useSelector, useDispatch} from 'react-redux';
import FullScreenLoader from '../component/FullScreenLoader';
import ScreenName from '../common/ScreenName';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import DeleteConformation from '../component/DeleteConformation';
import {clearAllData} from '../localStorage/LocalData';
import {CommonActions} from '@react-navigation/native';
import LowOpacityLoader from '../component/LowOpacityLoader';
import Labels from '../common/labels';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../common/images';

const MyAccount = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const accountData = useSelector(state => state.AllData.accountData);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   setLoading(true);
  //   sendRequest({user_id: 'Dummy'}, EndPoints.myAccountDetails, 'POST')
  //     .then(res => {
  //       setLoading(false);
  //       if (res.status === true) {
  //         dispatch(getAccountImfo(res.data));
  //       }
  //     })
  //     .catch(e => {
  //       setLoading(false);
  //     });
  // }, []);
  // Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

  const logout = () => {
    setVisible(false);
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ScreenName.Login}],
          }),
        );
        // return true;
      })
      .catch(() => {
        return false;
      });

    // if (clearAllData()) {
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{name: ScreenName.Login}],
    //   }),
    // );
    // } else {
    //   Alert('Something went wrong');
    // }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      {loading && <LowOpacityLoader />}
      <View style={styles.container}>
        <DeleteConformation
          labelTop={'Logout'}
          labelPositive={'Logout'}
          labelNegative={'Cancel'}
          visible={visible}
          confirmationMessage={'Are you sure you want to  '}
          confirmationMessageHigh={'logout?'}
          onPressPositive={logout}
          closeModal={() => {
            // setError('');
            setVisible(false);
          }}
          onPressNegative={() => {
            setVisible(false);
          }}
        />
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={images.profileIcon} />
          <View style={styles.personalInfoCTNR}>
            <Text style={styles.labelPersonal}>
              {accountData?.data?.usr_firstName}
            </Text>
            <Text style={styles.labelPersonal}>
              {accountData?.data?.usr_email}
            </Text>
          </View>
        </View>

        <View style={styles.staticsContainer}>
          {accountData?.data?.usr_phone && (
            <View style={styles.staticsInnerContainer}>
              <Text style={styles.labelPersonalText(true)}>Phone number</Text>
              <Text style={styles.labelInnerContainer}>
                {accountData?.data?.usr_phone}
              </Text>
            </View>
          )}
          {/* <View style={styles.staticsInnerContainer}>
            <Text style={styles.labelPersonalText(true)}>Current Location</Text>
            <Text style={styles.labelInnerContainer}>Ward no 3 Shukhliya</Text>
          </View> */}
        </View>
        <AccountTouchableCom
          onPress={() => {
            navigation.navigate(ScreenName.Fav);
          }}
          label={Labels.Favourite}
          type={ScreenName.Fav}
          outerContainer={styles.outerContainer}
        />
        <AccountTouchableCom
          onPress={() => {
            navigation.navigate(ScreenName.MyPost);
          }}
          label={Labels.MyPost}
          type={ScreenName.MyPost}
        />
        <AccountTouchableCom
          onPress={() => {
            navigation.navigate(ScreenName.EditProfile);
          }}
          label={'Edit Profile'}
          type={ScreenName.EditProfile}
        />
        <AccountTouchableCom
          onPress={() => {
            navigation.navigate(ScreenName.changePassword);
          }}
          label={'Change Password'}
          type={ScreenName.changePassword}
        />
        <AccountTouchableCom
          label={'App Settings'}
          type={ScreenName.Settings}
          onPress={() => {
            navigation.navigate(ScreenName.AppSettings, {isHideBack: true});
          }}
        />
        <AccountTouchableCom label={'Contact Us'} type={ScreenName.ContactUs} />
        <AccountTouchableCom
          label={'Logout'}
          type={ScreenName.Logout}
          onPress={() => setVisible(true)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: hp(2),
    backgroundColor: 'white',
  },
  boldText: {
    fontSize: RF(2),
    color: 'red',
    marginVertical: hp(2),
    textAlign: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    marginLeft: hp(2.2),
    marginTop: hp(2),
  },
  personalInfoCTNR: {
    alignSelf: 'center',
    marginLeft: hp(2.2),
  },
  profileImage: {
    width: hp(10),
    height: hp(10),
    borderRadius: hp(90),
  },
  labelPersonal: {
    fontSize: RF(2),
    fontWeight: '600',
    color: 'black',
  },
  staticsContainer: {
    flexDirection: 'column',
    marginTop: hp(3),
    marginLeft: hp(2),
  },
  labelPersonalText: isContaint => ({
    fontSize: RF(2),
    color: 'black',
    fontWeight: isContaint ? '700' : '600',
  }),
  staticsInnerContainer: {
    flexDirection: 'column',
    marginTop: hp(0.5),
  },
  labelInnerContainer: {
    flexDirection: 'row',
    color: 'black',
  },
  outerContainer: {
    marginTop: hp(5),
  },
});

export default MyAccount;
