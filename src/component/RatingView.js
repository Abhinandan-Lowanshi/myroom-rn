import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import {RF, hp} from '../common/CommonFunctions';

const RatingView = ({
  rating = 0.0,
  data = {},
  showReview = false,
  containerStyle,
}) => {
  let getStar = [];
  let arr = rating.toString().split('.');
  let startRT = arr[0];
  let last = arr.length > 1 ? arr[1].charAt(0) : 0;
  let checkHalf = true;
  console.log(rating, 'getStar');
  for (let i = 0; i < 5; i++) {
    if (i < startRT) {
      getStar.push(
        <Icon1
          name={'star'}
          backgroundColor="red"
          color={Colors.RED}
          size={hp(1.5)}
          style={{marginHorizontal: hp(0.3)}}
        />,
      );
    } else {
      if (last >= 5 && checkHalf) {
        checkHalf = false;
        getStar.push(
          <Icon1
            name={'star-half-full'}
            backgroundColor="red"
            color={Colors.RED}
            size={hp(1.5)}
            style={{marginHorizontal: hp(0.3)}}
          />,
        );
      } else {
        getStar.push(
          <Icon1
            name={'star-o'}
            backgroundColor="red"
            color={Colors.RED}
            size={hp(1.5)}
            style={{marginHorizontal: hp(0.3)}}
          />,
        );
      }
    }
  }

  return (
    <View
      style={[
        {position: 'absolute', top: hp(0.5), left: hp(1)},
        containerStyle,
      ]}>
      <View style={style.container}>{getStar}</View>
      {showReview && data?.count && (
        <Text style={{fontSize: RF(1.2)}}>{`Reviews - ${data?.count}`}</Text>
      )}
    </View>
  );
};
export default RatingView;
const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: hp(90),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: hp(0.2),
    paddingHorizontal: hp(0.6),
    paddingVertical: hp(0.5),
  },
});
