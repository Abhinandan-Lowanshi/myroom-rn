import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import Colors from '../common/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import ScreenName from '../common/ScreenName';
const AccountTouchableCom = ({
  outerContainer,
  label,
  onPress,
  isSubmitDisabled,
  type,
}) => {
  const renderIcon = () => {
    switch (type) {
      case ScreenName.Settings: {
        return (
          <Icon
            style={style.iconStyle}
            name={'setting'}
            size={hp(4)}
            color={Colors.PRIMARY}
          />
        );
      }
      case ScreenName.EditProfile: {
        return (
          <Icon1
            style={style.iconStyle}
            name={'edit'}
            size={hp(4)}
            color={Colors.PRIMARY}
          />
        );
      }
      case ScreenName.changePassword: {
        return (
          <Icon2
            style={style.iconStyle}
            name={'key-change'}
            size={hp(4)}
            color={Colors.PRIMARY}
          />
        );
      }
      case ScreenName.AboutUs: {
        return (
          <Icon3
            style={style.iconStyle}
            name={'people'}
            size={hp(4)}
            color={Colors.PRIMARY}
          />
        );
      }
      case ScreenName.PrivacyPolicy: {
        return (
          <Icon3
            style={style.iconStyle}
            name={'privacy-tip'}
            size={hp(4)}
            color={Colors.PRIMARY}
          />
        );
      }
      case ScreenName.Logout: {
        return (
          <Icon
            style={style.iconStyle}
            name={'logout'}
            size={hp(4)}
            color={Colors.PRIMARY}
          />
        );
      }
      case ScreenName.MyPost: {
        return (
          <Icon2
            style={style.iconStyle}
            name={'post-outline'}
            size={hp(4)}
            color={Colors.PRIMARY}
          />
        );
      }
      case ScreenName.Fav: {
        return (
          <Icon3
            style={style.iconStyle}
            name={'favorite-border'}
            size={hp(4)}
            color={Colors.PRIMARY}
          />
        );
      }
    }
  };
  return (
    <TouchableOpacity
      disabled={isSubmitDisabled}
      onPress={onPress}
      style={[style.outerContainer(isSubmitDisabled), outerContainer]}>
      {renderIcon()}
      <Text style={style.labelStyle}>{label}</Text>
      <Icon
        style={{alignSelf: 'center', position: 'absolute', right: hp(2)}}
        name={'right'}
        size={hp(4)}
        color={Colors.PRIMARY}
      />
    </TouchableOpacity>
  );
};

export default AccountTouchableCom;
const style = StyleSheet.create({
  outerContainer: isSubmitDisabled => ({
    width: '90%',
    flexDirection: 'row',
    height: hp(7),
    marginTop: hp(2),
    backgroundColor: Colors.WHITE,
    borderRadius: hp(0.9),
    elevation: 6,
    alignItems: 'center',
    alignSelf: 'center',
  }),
  labelStyle: {
    color: Colors.BLACK,
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: RF(2),
    marginLeft: hp(3),
  },
  iconStyle: {alignSelf: 'center', marginLeft: hp(3)},
});
