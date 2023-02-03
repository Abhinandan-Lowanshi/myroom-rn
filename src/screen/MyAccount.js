import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
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
const MyAccount = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const accountData = useSelector(state => state.AllData.accountData);
  const loading = useSelector(state => state.AllData.loading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startL());
    sendRequest({user_id: 'Dummy'}, EndPoints.myAccountDetails, 'POST')
      .then(res => {
        dispatch(endL());

        if (res.status === true) {
          dispatch(getAccountImfo(res.data));
        }
      })
      .catch(e => {
        dispatch(endL());
      });
  }, []);

  const logout = () => {
    setVisible(false);
    clearAllData();
    navigation.navigate(ScreenName.Login);
  };

  return loading ? (
    <FullScreenLoader />
  ) : (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
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
            setError('');
            setVisible(false);
          }}
          onPressNegative={() => {
            setVisible(false);
          }}
        />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: 'https://source.unsplash.com/user/c_v_r/1900x800',
            }}
          />
          <View style={styles.personalInfoCTNR}>
            <Text style={styles.labelPersonal}>
              {accountData?.usr_firstName}
            </Text>
            <Text style={styles.labelPersonal}>{accountData?.usr_email}</Text>
          </View>
        </View>

        <View style={styles.staticsContainer}>
          {accountData?.usr_phone && (
            <View style={styles.staticsInnerContainer}>
              <Text style={styles.labelPersonalText(true)}>Phone number</Text>
              <Text style={styles.labelInnerContainer}>
                {accountData?.usr_phone}
              </Text>
            </View>
          )}
          <View style={styles.staticsInnerContainer}>
            <Text style={styles.labelPersonalText(true)}>Current Location</Text>
            <Text style={styles.labelInnerContainer}>Ward no 3 Shukhliya</Text>
          </View>
        </View>
        <AccountTouchableCom
          label={'Settings'}
          type={ScreenName.Settings}
          outerContainer={styles.outerContainer}
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
