import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';
import Icon from './Icon';
const CustomCheckBox = ({check}) => {
  return (
    <View style={style.container(check)}>
      <Icon
        name={'check'}
        size={hp(1.6)}
        color={Colors.WHITE}
        iconCommunity={'Feather'}
      />
    </View>
  );
};

export default CustomCheckBox;

const style = StyleSheet.create({
  container: check => ({
    borderWidth: hp(0.2),
    height: hp(2),
    width: hp(2),
    borderColor: Colors.PRIMARY,
    backgroundColor: check ? Colors.PRIMARY : Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }),
});
