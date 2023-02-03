import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';

const Header = ({label, navigation}) => {
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.containerInner}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          style={style.iconStyle}
          name="left"
          size={hp(3.6)}
          color={Colors.PRIMARY}
        />
      </TouchableOpacity>
      <Text style={style.labelSignUp}>{label}</Text>
      <Text style={{color: Colors.WHITE}}>kkkk</Text>
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
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: hp(0.8),
  },
  labelSignUp: {
    fontSize: hp(3),
    alignSelf: 'center',
    color: Colors.PRIMARY,
    fontSize: hp(2.6),
  },
  containerInner: {
    flexDirection: 'row',
  },
});
