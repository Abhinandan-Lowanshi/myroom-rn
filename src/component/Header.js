import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';

const Header = ({label, navigation, container, hideBack, RightIcon}) => {
  return (
    <View style={[style.container, container]}>
      {!hideBack && (
        <TouchableOpacity
          style={style.containerInner}
          onPress={() => {
            navigation?.goBack();
          }}>
          <Icon
            style={style.iconStyle}
            name="left"
            size={hp(3.6)}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
      )}
      <Text style={style.labelSignUp}>{label}</Text>
      <Text style={{color: Colors.WHITE}}>kkkk</Text>
      {RightIcon && <RightIcon />}
    </View>
  );
};

export default Header;

const style = StyleSheet.create({
  container: {
    height: hp(6),
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 15,
    justifyContent: 'space-between',
    paddingHorizontal: hp(1),
  },
  iconStyle: {
    alignSelf: 'center',
  },
  labelSignUp: {
    alignSelf: 'center',
    color: Colors.PRIMARY,
    fontSize: hp(2),
  },
  containerInner: {
    flexDirection: 'row',
  },
});
