import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Custom_Image from './Custom_Image';
import images from '../common/images';
import {RF, hp} from '../common/CommonFunctions';
import {symbol} from 'prop-types';
import RatingView from './RatingView';
import Colors from '../common/Colors';

const ReviewRow = ({data, styleRow}) => {
  return (
    <View style={[style.container, styleRow]}>
      <Image style={style.profileImage} source={images.profileIcon} />
      <View style={{flex: 1}}>
        <View style={style.containerName}>
          <View style={style.containerName1}>
            <Text style={style.labelName}>{`${data?.user_name}`}</Text>
            {data?.isReviewed && <Text style={style.author}>{'Author'}</Text>}
          </View>
          <RatingView
            rating={data?.ratings}
            containerStyle={style.containerRating}
          />
        </View>
        <Text style={style.labelReview}>
          {data?.review || '- - - - - - - - -'}
        </Text>
      </View>
    </View>
  );
};

export default ReviewRow;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: hp(1),
    backgroundColor: Colors.GREY5,
    padding: hp(1),
    marginVertical: hp(0.3),
  },
  profileImage: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(90),
  },
  containerName: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  labelName: {
    marginLeft: hp(1),
    color: Colors.BLACK,
    fontSize: RF(1.5),
    alignSelf: 'center',
  },
  containerRating: {
    position: 'relative',
    top: 0,
    left: 0,
    alignSelf: 'flex-end',
    // flex: 0.32,
  },
  labelReview: {
    fontSize: RF(1.3),
    marginLeft: hp(1.5),
    marginTop: hp(1),
    color: Colors.GREY4,
  },
  containerName1: {
    flexDirection: 'row',
  },
  author: {
    color: Colors.BLACK,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    fontSize: RF(1.2),
    marginLeft: hp(1),
    paddingHorizontal: hp(1),
    paddingVertical: hp(0.2),
    borderRadius: hp(1),
  },
});
