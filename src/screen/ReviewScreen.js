import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import Header from '../component/Header';
import Labels from '../common/labels';
import {useSelector, useDispatch} from 'react-redux';
import RatingListView from '../component/RatingListView';
import {hp} from '../common/CommonFunctions';
import Icon from '../component/Icon';
import Colors from '../common/Colors';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CustomInputText from '../component/InputText';
import C_Button from '../component/C_Button';
import StyleGlobel from '../Style/StyleGlobel';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import localStorageOp from '../localStorage/LocalData';
import Toast from 'react-native-simple-toast';
import {setReviews} from '../redux/Slice';

const ReviewScreen = props => {
  const {navigation} = props;
  const {item} = props?.route?.params;
  const reviews = useSelector(state => state.AllData.reviews);
  const [review, setReview] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [rating, setRating] = useState(2.5);
  const dispatch = useDispatch();
  useEffect(() => {
    if (review?.trim().length < 10) {
      setIsSubmitDisabled(true);
    } else {
      setIsSubmitDisabled(false);
    }
  }, [review]);

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressOpenModal}>
        <Icon
          name={'pluscircleo'}
          size={hp(3)}
          color={Colors.PRIMARY}
          iconCommunity={'AntDesign'}
        />
      </TouchableOpacity>
    );
  };

  const onChangeText = value => {
    setReview(value);
    if (value?.trim() !== '' && value?.trim().length < 10) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const updateRating = data => {
    if (data) {
      if (Object.keys(reviews).length === 0) {
        let ratingArray = {...data, isReviewed: true};
        let tmp = [];
        tmp.push(ratingArray);
        let reviewTMP = {
          reviewData: {
            count: 1,
            rating: data?.rating,
            avg: data?.rating,
            isReviewed: true,
          },
          reviewList: tmp,
        };
        dispatch(setReviews(reviewTMP));
      } else {
        let temp = JSON.parse(JSON.stringify(reviews));
        console.log(temp, 'line86');
        temp?.reviewList.push({...data, isReviewed: true});
        console.log(temp, 'line88');

        let tmpRate = temp?.reviewData?.rating + data?.ratings;
        console.log(data, 'line91');
        let tmpcount = temp?.reviewData?.count + 1;
        let tmpAvg = tmpRate / tmpcount;
        console.log(tmpRate, tmpcount, tmpRate / tmpcount, 'line94');

        let tmpReviewData = {
          count: temp?.reviewData?.count + 1,
          rating: tmpRate,
          avg: tmpAvg,
          isReviewed: true,
        };
        console.log(tmpReviewData, 'line102');

        temp.reviewData = {...tmpReviewData};
        console.log(temp, 'line105');

        dispatch(setReviews(temp));
      }

      // let tempReview = JSON.parse(JSON.stringify(reviews));
      // tempReview?.reviewList.push(tempReview)
    }
  };
  const submitReview = async () => {
    setLoading(true);
    var userData = await localStorageOp(false, AsyncKeys.USERDATA, '');
    if (
      !item?.rm_pkey ||
      item?.rm_pkey === '' ||
      review === '' ||
      rating === '' ||
      userData?.data?.usr_firstName === ''
    ) {
      return;
    }
    sendRequest(
      {
        room_id: item?.rm_pkey,
        user_id: 5,
        review: review,
        ratingCount: rating,
        user_name: userData?.data?.usr_firstName,
      },
      EndPoints.addReview,
      'POST',
    )
      .then(res => {
        Toast.show(res?.message, Toast.LONG);
        if (res?.status == true) {
          updateRating(res?.data);
          setVisible(false);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        Toast.show('Something went wrong', Toast.LONG);
      });
  };

  const onPressOpenModal = () => {
    setVisible(true);
  };

  const onPresClose = () => {
    setVisible(false);
  };

  const onRatingChange = value => {
    setRating(value);
  };

  const addReview = () => {
    return (
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={style.lowOpacity}></View>
        <View style={style.container}>
          <View style={style.container1}>
            <TouchableOpacity onPress={onPresClose} style={style.close}>
              <Icon
                name={'closecircleo'}
                size={hp(3)}
                color={Colors.GREY2}
                iconCommunity={'AntDesign'}
              />
            </TouchableOpacity>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={hp(4)}
              showRating={true}
              fractions={1}
              jumpValue={0.5}
              minValue={0}
              style={style.starContainerStyle}
              ratingTextColor={Colors.PRIMARY}
              onFinishRating={onRatingChange}
              // onSwipeRating={e => {
              //   console.log(e, 'ratingTextColor');
              // }}
              // selectedColor={'red'}
              // ratingContainerStyle={{backgroundColor: 'red'}}
              // unSelectedColor={Colors.PRIMARY}
              //   onFinishRating={this.ratingCompleted}
            />
            <CustomInputText
              value={review}
              placeholder={'Review'}
              errorMessage={'Review cant be empty'}
              onChangeText={onChangeText}
              multiline={true}
              textAlignVertical={'top'}
              numberOfLines={3}
              maxLength={200}
              error={error}
              showLimit
              maxHeight={hp(12)}
            />
            <C_Button
              isLoading={loading}
              onPress={submitReview}
              isSubmitDisabled={isSubmitDisabled}
              label={'Submit review'}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <Header
        label={Labels?.Review}
        navigation={navigation}
        RightIcon={RightIcon}
      />
      <RatingListView data={reviews?.reviewList} styleRow={style.styleRow} />
      {addReview()}
    </SafeAreaView>
  );
};

export default ReviewScreen;

const style = StyleSheet.create({
  styleRow: {marginHorizontal: hp(1)},
  lowOpacity: {
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
    opacity: 0.5,
    position: 'absolute',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  container1: {
    width: '96%',
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    paddingBottom: hp(4),
    borderRadius: hp(1),
  },
  starContainerStyle: {
    marginBottom: hp(3),
  },
  close: {
    alignSelf: 'flex-end',
    marginRight: hp(1.8),
    marginTop: hp(1.7),
  },
});
