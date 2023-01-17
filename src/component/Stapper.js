import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';

const Stapper = ({fromSTP1}) => {
  return (
    <View style={style.container}>
      <View style={style.roundView(fromSTP1)}>
        <Text style={style.stp1label(fromSTP1)}>1</Text>
      </View>
      <View style={style.line(fromSTP1)} />
      <View style={style.roundView2(fromSTP1)}>
        <Text style={style.stp1label1(fromSTP1)}>2</Text>
      </View>
      {/* <View style={style.line} /> */}
    </View>
  );
};
export default Stapper;
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundView: fromSTP1 => ({
    height: hp(4),
    width: hp(4),
    borderColor: fromSTP1 ? Colors.PRIMARY : Colors.GREEN,
    borderWidth: 2,
    borderRadius: hp(50),
    justifyContent: 'center',
  }),
  roundView2: fromSTP1 => ({
    height: hp(4),
    width: hp(4),
    borderColor: fromSTP1 ? Colors.GREY : Colors.PRIMARY,
    borderWidth: 2,
    borderRadius: hp(50),
    justifyContent: 'center',
  }),
  stp1label: fromSTP1 => ({
    alignSelf: 'center',
    color: fromSTP1 ? Colors.PRIMARY : Colors.GREEN,
    fontSize: hp(1.8),
  }),
  stp1label1: fromSTP1 => ({
    alignSelf: 'center',
    color: fromSTP1 ? Colors.GREY : Colors.PRIMARY,
    fontSize: hp(1.8),
  }),
  line: fromSTP1 => ({
    height: 1,
    width: hp(10),
    borderWidth: 1,
    borderColor: fromSTP1 ? Colors.PRIMARY : Colors.GREEN,
  }),
});
