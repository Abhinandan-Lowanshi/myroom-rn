import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  Linking,
  Platform,
} from 'react-native';
import FullScreenLoader from '../component/FullScreenLoader';
import {useSelector, useDispatch} from 'react-redux';
import StyleGlobel from '../Style/StyleGlobel';
import Custom_Image from '../component/Custom_Image';
import Header from '../component/Header';

import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {RF, hp} from '../common/CommonFunctions';
import labels from '../common/labels';
import Labels from '../common/labels';
import IconName from '../common/IconName';
import Colors from '../common/Colors';
import ImageScaleType from '../common/ImageScaleType';
import MapScreen, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import ErrorModal from '../component/ErrorModal';
import LowOpacityLoader from '../component/LowOpacityLoader';
import Toast from 'react-native-simple-toast';
import images from '../common/images';
import ScreenName from '../common/ScreenName';
import {styles} from 'react-native-image-slider-banner/src/style';
import Icon from '../component/Icon';
import {logout} from '../component/LogOut';
import RatingView from '../component/RatingView';
import ReviewRow from '../component/ReviewRow';
import RatingListView from '../component/RatingListView';
import {setReviews} from '../redux/Slice';

const DetailsScreen = props => {
  const {navigation} = props;
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [apiError, setApiError] = useState('');
  const [mapOnFocus, setMapOnFocus] = useState(false);
  const [imageData, setImageData] = useState({});
  const propData = props?.route?.params?.item;
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState(null);
  const [imageBottomData, setImageBottomData] = useState([]);
  const onPressFav = props?.route?.params?.onPressFav;
  const roomInfo = props?.route?.params.roomInfo;
  const disabled = props?.route?.params.disabled;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const data = useSelector(state => state.AllData.locationInfo);
  const reviews = useSelector(state => state.AllData.reviews);
  const [locationData, setLocationData] = useState({});
  const [ratingVisible, setRatingVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const flatlistRef = useRef();
  const flatlistRefModal = useRef();
  const dispatch = useDispatch();
  const currentLocationName = useSelector(
    state => state.AllData.currentLocationName,
  );
  let lastIndex = 0;

  useEffect(() => {
    setLike(propData?.favorite_key);
    setItem(propData);
    if (roomInfo?.isServer) {
      setLoading(true);
      getRoomFromServer(roomInfo?.roomId);
    } else setCheck(true);
  }, []);

  useEffect(() => {
    console.log(item, 'useEffect');

    if (item?.images) {
      console.log(item, 'useEffect');
      prepareImage(item?.images);
    }
    if (item?.reviews) dispatch(setReviews(item?.reviews));
  }, [item]);

  const prepareImage = data => {
    let temp = [];
    temp = data?.map((item, index) => {
      return {...item, active: index === 0 ? true : false};
    });
    console.log(temp, 'setImageBottomData');
    setImageBottomData(temp);
  };

  const getRoomFromServer = roomId => {
    sendRequest(
      {
        user_id: 'dummy',
        room_id: roomId,
      },
      EndPoints.viewRoomDetails,
      'POST',
    )
      .then(res => {
        setLoading(false);
        if (res.status === true) {
          if (res.message === 'Room details get successfully.') {
            setItem(res?.data);
            setLike(res?.data?.favorite_key);
            setCheck(true);
          } else {
            setApiError(
              'Room details not found, may be room has been deleted or de-activated by the owner of the room.',
            );
            if (response?.message === 'Invalid authentication.') {
              logout(navigation);
            }
          }
        }
      })
      .catch(err => {
        setLoading(false);
        setApiError(err.toString());
      });
  };

  const renderFullImages = ({item}) => {
    console.log(item, 'renderFullImages');
    return (
      <View style={{}}>
        <Custom_Image
          resizeMode={ImageScaleType.contain}
          uri={item?.img_name}
          container={{width: windowWidth}}
        />
      </View>
    );
  };

  const ShowFullImage = () => {
    return (
      <Modal
        // transparent={true}
        animationType={'slide'}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={{flex: 1}}>
          <FlatList
            style={{flex: 1}}
            horizontal={true}
            data={imageBottomData}
            renderItem={renderFullImages}
          />

          <IconButton_MaterialCommunityIcons
            onPress={() => {
              setVisible(false);
            }}
            iconContainer={{position: 'absolute', right: hp(2), top: hp(1)}}
            fValue={IconName?.close}
          />
        </View>
      </Modal>
    );
  };

  const handleCall = (number = '') => {
    if (number !== '') {
      let phoneNumber;
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
      } else {
        phoneNumber = `telprompt:${number}`;
      }
      Linking.openURL(phoneNumber);
    } else {
      Toast.show('Something went wrong', Toast.LONG);
    }
  };

  const handleChat = () => {
    console.log(item);
    if (item?.rm_usr_fkey && item?.rm_own_Fullname) {
      let ob = {
        user_id: item?.rm_usr_fkey,
        usr_first_name: item?.rm_own_Fullname,
      };
      navigation.navigate(ScreenName.Chat, {item: ob});
    }
  };

  const handleMessage = (phoneNumber = '') => {
    if (phoneNumber !== '') {
      let url = `sms:${phoneNumber}${
        Platform.OS === 'ios' ? '&' : '?'
      }body=${''}`;
      Linking.openURL(url);
    } else {
      Toast.show('Something went wrong', Toast.LONG);
    }
  };

  const renderImages = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          onPressFullImage(index);
        }}>
        <Custom_Image
          uri={item?.img_name}
          container={style.image(windowWidth)}
        />
      </TouchableOpacity>
    );
  };

  const onPressFullImage = index => {
    setVisible(true);
    setImageData(item);
    setTimeout(() => {
      if (flatlistRefModal.current) {
        flatlistRefModal.current.scrollToIndex({
          animated: true,
          index: index,
        });
      }
    }, 50);
  };

  const IconButton_Entypo = props => {
    return (
      <TouchableOpacity
        style={[style.iconContainer, props?.iconContainer]}
        onPress={props?.onPress}>
        <Icon
          name={props?.value ? props?.tValue : props.fValue}
          size={props?.iconSize || hp(3)}
          color={props?.iconColor || Colors.RED}
        />
      </TouchableOpacity>
    );
  };

  const IconButton_MaterialCommunityIcons = props => {
    return (
      <TouchableOpacity
        style={[style.iconContainer, props?.iconContainer]}
        onPress={props?.onPress}>
        <Icon
          name={props?.value ? props?.tValue : props.fValue}
          size={props?.iconSize || hp(5)}
          color={props?.iconColor || Colors.RED}
          iconCommunity={'MaterialCommunityIcons'}
        />
      </TouchableOpacity>
    );
  };

  const getFullAddress = () => {
    let data = locationData?.end_address;
    let address = '----------------';
    if (data) {
      let addressArray = data?.split(',');
      addressArray.shift();
      address = addressArray.toString();
    }
    return address;
  };

  const handleDismiss = () => {
    setApiError('');
    navigation.goBack();
  };

  const changeImageIndex = (indexF, fromMain = false) => {
    if (fromMain) {
      flatlistRef.current.scrollToIndex({animated: true, index: indexF});
    }
    let temp = [];
    temp = imageBottomData?.map((item, index) => {
      return {...item, active: index === indexF ? true : false};
    });
    console.log(temp, 'indexF === index');
    setImageBottomData(temp);
  };

  const renderBottomImages = ({item, index}) => {
    return (
      <TouchableOpacity
        style={style.imageBottomContainer(item?.active)}
        activeOpacity={0.9}
        onPress={() => changeImageIndex(index, true)}>
        <Custom_Image uri={item?.img_name} container={style.imageBottom} />
      </TouchableOpacity>
    );
  };
  const handleScroll = event => {
    let index = Math.ceil(event.nativeEvent.contentOffset.x / windowWidth);

    if (index => 0) {
      lastIndex = index;
      setIndex(index);
      changeImageIndex(index);
    }
  };

  const imageCount = (images = []) => {
    if (images?.length) {
      return (
        <View style={style.imageCountContainer}>
          <Text style={style.imageCountLabel}>{`${index + 1}/${
            images?.length
          }`}</Text>
        </View>
      );
    }
  };

  const shareProperty = () => {
    return (
      <View style={style.shareContainer}>
        <IconButton_MaterialCommunityIcons
          fValue={'share-variant'}
          iconSize={hp(2.4)}
          iconColor={Colors.WHITE}
          iconContainer={style.shareInnerContainer}
        />
        <Text style={style.shareLabel}>Share property with your friend</Text>
        <IconButton_MaterialCommunityIcons
          fValue={'chevron-right'}
          iconSize={hp(4)}
          iconColor={Colors.WHITE}
          iconContainer={style.arrowContainer}
        />
      </View>
    );
  };

  const rentView = () => {
    return (
      <View style={style.containerRent}>
        <Text style={style.rent}>
          {`\u20B9 ${item?.rm_rent}`}
          <Text
            style={
              style.month
            }>{` / Month (\u20B9 ${item?.deposit} Deposit)`}</Text>
        </Text>
      </View>
    );
  };

  const roomSize = () => {
    return <Text style={style.size}>{item?.rm_size}</Text>;
  };

  const FullAddress = () => {
    return (
      <View style={style.addressContainer}>
        <Text style={style.address}>
          {`${item?.rm_house_no},${item?.rm_colny}, ${item?.rm_city}`}
        </Text>
      </View>
    );
  };

  const MapButton = ({
    container,
    leftIconStyle,
    leftIcon,
    rightIconStyle,
    rightIcon,
    label,
    labelStyle,
    rightColor,
    rightSize,
    leftSize,
    leftColor,
    iconCommunity,
    onPress,
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={container}>
        {leftIcon && (
          <Icon
            style={leftIconStyle}
            name={leftIcon || leftIcon}
            color={leftColor || Colors.GREY4}
            size={leftSize || hp(2.5)}
            iconCommunity={iconCommunity}
          />
        )}
        <Text style={[{color: Colors.GREY4, fontSize: RF(1.3)}, labelStyle]}>
          {label}
        </Text>
        {rightIcon && (
          <Icon
            style={rightIconStyle}
            name={rightIcon || rightIcon}
            color={rightColor || Colors.GREY4}
            size={rightSize || hp(3)}
            iconCommunity={iconCommunity}
          />
        )}
      </TouchableOpacity>
    );
  };

  const NameRow = ({label1, label2, style}) => {
    return (
      <View style={style}>
        <Text
          style={{
            color: Colors.BLACK,
            fontSize: RF(1.8),
            fontWeight: '500',
          }}>
          {label1}
        </Text>
        <Text style={{color: Colors.GREY4, fontSize: RF(1.6)}}>{label2}</Text>
      </View>
    );
  };

  const contactView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingHorizontal: hp(3),
          paddingBottom: hp(1),
          // borderTopLeftRadius: hp(5),
          // borderTopRightRadius: hp(5),
          backgroundColor: Colors.GREY5,
          paddingTop: hp(1),
        }}>
        <MapButton
          container={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: Colors.PRIMARY,
            height: hp(4.8),
            alignItems: 'center',
            paddingHorizontal: hp(1),
            borderRadius: hp(1.2),
            alignSelf: 'center',
            marginHorizontal: hp(2),
            justifyContent: 'center',
          }}
          label={'Call'}
          labelStyle={{color: Colors.WHITE, marginLeft: hp(1.2)}}
          leftIcon={'phone-call'}
          leftColor={Colors.WHITE}
          iconCommunity={'Feather'}
          onPress={() => {
            handleCall(item?.rm_own_mble_num);
          }}
        />
        <MapButton
          container={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: Colors.PRIMARY,
            height: hp(4.8),
            alignItems: 'center',
            paddingHorizontal: hp(1),
            borderRadius: hp(1.2),
            alignSelf: 'center',
            marginHorizontal: hp(2),
            justifyContent: 'center',
          }}
          label={'Sms'}
          labelStyle={{color: Colors.WHITE, marginLeft: hp(1.2)}}
          leftIcon={'message-circle'}
          leftColor={Colors.WHITE}
          iconCommunity={'Feather'}
          onPress={() => {
            handleMessage(item?.rm_own_mble_num);
          }}
        />
      </View>
    );
  };
  const getDate = data => {
    let date = '';
    date = new Date(data);
    return date.toLocaleString();
  };

  const ownerView = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.GREY5,
          marginHorizontal: hp(1.5),
          paddingVertical: hp(1.2),
          paddingHorizontal: hp(1.5),
          marginBottom: hp(2),
          borderRadius: hp(1),
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <NameRow
              label1={item?.rm_own_Fullname}
              label2={item?.rm_own_mble_num}
            />
            <NameRow
              style={{marginTop: hp(1)}}
              label1={'Posted On'}
              label2={getDate(item?.created_at)}
            />
          </View>
          <MapButton
            container={{
              flexDirection: 'row',
              backgroundColor: Colors.PRIMARY,
              height: hp(4.8),
              alignItems: 'center',
              paddingHorizontal: hp(1),
              borderRadius: hp(1.2),
              alignSelf: 'center',
            }}
            label={'Chat with Owner'}
            // leftIcon={'map-o'}
            rightIcon={'angle-right'}
            labelStyle={{color: Colors.WHITE}}
            rightColor={Colors.WHITE}
            onPress={handleChat}
          />
        </View>
      </View>
    );
  };
  const SpecificationDetails = props => {
    return (
      <View style={[style.containerInside, props?.containerInside]}>
        <Text style={[style.labelSt, props?.labelSt]}>{props?.label}</Text>
        <Text style={[style.labelANS, props?.labelANS]}>{props?.labelAns}</Text>
      </View>
    );
  };
  const RoomInformation = () => {
    console.log(locationData, 'locationData');
    return (
      <View
        style={{
          marginBottom: hp(3),
        }}>
        <MoreDetails
          name={'address'}
          color={Colors.GREY}
          size={hp(3.2)}
          header={'Location based address'}
          data={getFullAddress()}
          iconCommunity={'Entypo'}
        />
        <MoreDetails
          name={'signal-distance-variant'}
          color={Colors.GREY}
          size={hp(3.2)}
          header={labels?.Distance}
          data={locationData?.distance?.text || '-------'}
          iconCommunity={'MaterialCommunityIcons'}
        />
        <MoreDetails
          name={'timer-sand'}
          color={Colors.GREY}
          size={hp(3.2)}
          header={labels?.Time}
          data={locationData?.distance?.text || '-------'}
          iconCommunity={'MaterialCommunityIcons'}
        />
      </View>
    );
  };

  const onPressMap = () => {
    navigation.navigate(ScreenName.MapScreen, {
      desRm_latitude: item?.rm_latitude,
      desRm_longitude: item?.rm_longitude,
      OrRm_latitude: data?.latitude,
      OrRm_longitude: data?.longitude,
    });
  };

  const onPressRating = () => {
    setRatingVisible(!ratingVisible);
  };

  const ListFooterComponent = () => {
    if (
      reviews?.reviewList?.length <= 5 ||
      !ratingVisible ||
      reviews?.reviewList?.length === undefined
    ) {
      return <></>;
    }
    return (
      <TouchableOpacity onPress={onPressAllReview}>
        <Text style={style.labelViewAllReview}>View All Review</Text>
      </TouchableOpacity>
    );
  };

  const onPressAllReview = () => {
    navigation.navigate(ScreenName.ReviewScreen, {
      item: item,
      isFrom: props?.route?.params?.isFrom ? props?.route?.params?.isFrom : '',
    });
  };

  const showRating = () => {
    return (
      <View style={style.reviewContainerMain}>
        <View style={style.containerRatingView}>
          <TouchableOpacity onPress={onPressAllReview}>
            <Text style={style.labelReview}>{`Reviews  (${
              reviews?.reviewList?.length || 0
            })`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressRating}>
            <Icon
              name={ratingVisible ? 'chevrons-up' : 'chevrons-down'}
              color={Colors.GREY4}
              size={hp(3)}
              iconCommunity={'Feather'}
            />
          </TouchableOpacity>
        </View>
        <RatingListView
          data={
            ratingVisible
              ? reviews?.reviewList?.length > 5
                ? reviews?.reviewList?.slice(0, 5)
                : reviews?.reviewList
              : reviews?.reviewList?.slice(0, 1)
          }
          ListFooterComponent={ListFooterComponent}
        />
      </View>
    );
  };
  const openInstagram = () => {
    Linking.openURL(
      `https://instagram.com/impactservices_pvt.ltd?igshid=MzRlODBiNWFlZA==`,
    );
  };

  const checkIsLocal = () => {
    return currentLocationName?.locationName?.includes('Indore', 'indore');
  };

  const PackerContact = ({phone}) => {
    return (
      <TouchableOpacity style={style.containerName} onPress={openInstagram}>
        <Icon
          name={'instagram'}
          color={Colors.RED}
          size={hp(2)}
          iconCommunity={'Feather'}
          style={style.phone}
        />
        <Text style={style.labelPackerPhone}>{phone}</Text>
      </TouchableOpacity>
    );
  };
  const packerMoverDetails = () => {
    return checkIsLocal() ? (
      <View style={style.containerPacker}>
        <Text style={style.labelCompanyName}>
          Instant Mover And Commercial Transportation Services Indore
        </Text>
        <View style={style.containerContact}>
          <TouchableOpacity onPress={() => handleCall(8135178283)}>
            <Text style={style.labelPackerPhone}>{8135178283}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCall(8823072388)}>
            <Text style={style.labelPackerPhone}>{`,  ${8823072388}`}</Text>
          </TouchableOpacity>
          <PackerContact phone={'impactservices_pvt.ltd'} />
        </View>
      </View>
    ) : null;
  };

  const getDeposit = () => {
    let str = '';
    if (item?.monthly_maintain) {
      str = `\u20B9 ${item?.monthly_maintain}/month maintenance`;
    }
    if (item?.deposit) {
      str = str + `, \u20B9 ${item?.deposit} fix deposit`;
    }
    return str;
  };

  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <ShowFullImage />
      <Header label={Labels?.Details} navigation={navigation} />
      {roomInfo?.isServer && loading && <LowOpacityLoader />}
      {check && (
        <>
          <ScrollView style={{opacity: visible ? 0.2 : 1}}>
            <View>
              {item?.images?.length === 0 ? (
                <Custom_Image
                  resizeMode={ImageScaleType.contain}
                  container={{width: windowWidth, height: hp(30)}}
                />
              ) : (
                <View>
                  <FlatList
                    onScroll={handleScroll}
                    ref={flatlistRef}
                    horizontal={true}
                    data={item?.images}
                    renderItem={renderImages}
                  />
                  {imageCount(item?.images)}
                </View>
              )}
              <RatingView rating={reviews?.reviewData?.avg} />
            </View>
            {/* <View style={style.imageContainer}>
              <FlatList
                ref={flatlistRefBottom}
                horizontal={true}
                data={imageBottomData}
                renderItem={renderBottomImages}
              />
            </View> */}
            <View style={style.contentContainer}>
              {shareProperty()}

              {rentView()}
              {roomSize()}
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <FullAddress />
                <MapButton
                  container={{
                    flexDirection: 'row',
                    flex: 0.38,
                    backgroundColor: Colors.GREY5,
                    height: hp(4.8),
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingHorizontal: hp(1),
                    marginLeft: hp(1),
                    borderRadius: hp(1.2),
                  }}
                  label={'See on Map'}
                  leftIcon={'map-o'}
                  rightIcon={'angle-right'}
                  iconCommunity={'FontAwesome'}
                  onPress={onPressMap}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: hp(1),
                }}>
                <Text
                  style={{
                    color: Colors.GREY4,
                    fontSize: RF(1.5),
                    fontWeight: '500',
                  }}>
                  Prefered balant type :{' '}
                </Text>
                <Text
                  style={{
                    color: Colors.GREY3,
                    fontSize: RF(1.3),
                    fontWeight: '400',
                    alignSelf: 'center',
                  }}>
                  {item?.rm_availble}
                </Text>
              </View>
              <View style={{marginVertical: hp(2), marginLeft: hp(0.5)}}>
                <MoreDetails
                  name={'floor-plan'}
                  color={Colors.GREY}
                  size={hp(3.2)}
                  header={'Floor'}
                  data={`Proper is on ${item?.rm_flor}`}
                  iconCommunity={'MaterialCommunityIcons'}
                />
                <MoreDetails
                  name={'car-brake-parking'}
                  color={Colors.GREY}
                  size={hp(3.2)}
                  header={'Parking'}
                  data={'Open parking available'}
                  iconCommunity={'MaterialCommunityIcons'}
                />
                <MoreDetails
                  name={'chain-broken'}
                  color={Colors.GREY}
                  size={hp(3.2)}
                  header={'Independent'}
                  data={`${item?.rm_depndecy}`}
                  fontAwesome={true}
                  iconCommunity={'FontAwesome'}
                />
                <MoreDetails
                  name={'table-furniture'}
                  color={Colors.GREY}
                  size={hp(3.2)}
                  header={'Furnished'}
                  data={`${item?.rm_furnisd_status}`}
                  iconCommunity={'MaterialCommunityIcons'}
                />
                <MoreDetails
                  name={'iobroker'}
                  color={Colors.GREY}
                  size={hp(3.2)}
                  header={'maintenance, Deposit'}
                  data={getDeposit()}
                  iconCommunity={'MaterialCommunityIcons'}
                />
              </View>
              {ownerView()}
              {showRating()}
              {packerMoverDetails()}
              <RoomInformation />
            </View>

            {item?.rm_latitude && (
              <View style={style.mapContainer(windowHeight, mapOnFocus)}>
                <MapScreen
                  style={style.map}
                  zoomEnabled={true}
                  initialRegion={{
                    latitude: item ? parseFloat(item?.rm_latitude) : 0.0,
                    longitude: item ? parseFloat(item?.rm_longitude) : 0.0,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  }}>
                  <MapViewDirections
                    onReady={item => {
                      setLocationData(item?.legs[0]);
                    }}
                    optimizeWaypoints={true}
                    splitWaypoints={true}
                    origin={{
                      latitude: data?.latitude,
                      longitude: data?.longitude,
                    }}
                    destination={{
                      latitude: parseFloat(item?.rm_latitude),
                      longitude: parseFloat(item?.rm_longitude),
                    }}
                    apikey={'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc'}
                    strokeWidth={hp(0.5)}
                    strokeColor={Colors.PRIMARY}
                  />
                  <Marker
                    title={'Room location'}
                    pinColor={'green'}
                    key={0}
                    coordinate={{
                      latitude: parseFloat(item?.rm_latitude),
                      longitude: parseFloat(item?.rm_longitude),
                    }}></Marker>
                  <Marker
                    title={'Your location'}
                    key={1}
                    coordinate={{
                      latitude: data?.latitude,
                      longitude: data?.longitude,
                    }}></Marker>
                </MapScreen>
                <TouchableOpacity
                  style={style.fullMapContainer}
                  onPress={() => {
                    setMapOnFocus(!mapOnFocus);
                  }}>
                  <MaterialIcons
                    size={hp(4.5)}
                    color={Colors.BLACK}
                    name={mapOnFocus ? 'fullscreen-exit' : 'fullscreen'}
                  />
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
          {contactView()}
        </>
      )}
      {apiError && (
        <ErrorModal
          onPress={handleDismiss}
          hideBackground={true}
          label={apiError}
          visible={apiError ? true : false}></ErrorModal>
      )}
    </SafeAreaView>
  );
};

export default DetailsScreen;
const style = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: hp(1),
    marginHorizontal: hp(1),
    borderRadius: hp(90),
    height: hp(5),
    width: hp(5),
  },
  image: width => ({
    height: hp(30),
    width: width - hp(2),
    margin: hp(1),
  }),
  map: {
    flex: 1,
  },
  mapContainer: (windowHeight, isMapOnFocus) => ({
    height: isMapOnFocus ? windowHeight - hp(0.1) : hp(0.1),
    borderRadius: hp(10),
  }),
  fullMapContainer: {
    position: 'absolute',
    marginLeft: hp(1.5),
    marginTop: hp(0.6),
  },
  imageBottom: {
    height: hp(8),
    width: hp(8),
    borderRadius: 10,
  },
  imageBottomContainer: active => ({
    borderWidth: active ? 2 : 0,
    borderColor: Colors.PRIMARY,
    margin: hp(1),
    borderRadius: 10,
  }),
  imageContainer: {
    marginTop: hp(2),
    marginHorizontal: hp(1),
  },
  imageCountContainer: {
    position: 'absolute',
    backgroundColor: Colors.BLACK1,
    borderRadius: hp(1),
    bottom: hp(2),
    left: hp(2),
  },
  imageCountLabel: {
    fontSize: RF(1.2),
    marginHorizontal: hp(2),
    marginVertical: hp(0.3),
    color: Colors.WHITE,
  },
  shareContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    marginVertical: hp(1),
    borderRadius: hp(1.6),
  },
  shareIcon: {},
  shareLabel: {
    alignSelf: 'center',
    fontSize: RF(1.5),
    color: Colors.WHITE,
  },
  arrow: {},
  shareInnerContainer: {
    backgroundColor: Colors.RED,
    marginVertical: hp(1),
    marginLeft: hp(1),
    height: hp(4),
    width: hp(4),
  },
  arrowContainer: {
    backgroundColor: Colors.PRIMARY,
    elevation: 0,
    alignSelf: 'center',
    position: 'absolute',
    right: hp(0),
    height: hp(4),
    width: hp(4),
  },
  rent: {
    color: Colors.BLACK,
    fontSize: RF(2),
    fontWeight: '600',
  },
  month: {
    color: Colors.BLACK1,
    fontSize: RF(1.4),
    fontWeight: '500',
  },
  containerRent: {},
  contentContainer: {
    marginHorizontal: hp(1.5),
  },
  size: {
    color: Colors.BLACK,
    fontSize: RF(2.1),
    fontWeight: '500',
    marginTop: hp(1),
  },
  address: {
    color: Colors.GREY4,
    fontSize: RF(1.4),
  },
  addressContainer: {
    flexDirection: 'row',
    marginTop: hp(1),
    flex: 0.6,
  },
  containerMapButton: {},
  labelMap: {},
  containerRatingView: {
    flexDirection: 'row',
    marginBottom: hp(1),
    justifyContent: 'space-between',
  },
  labelReview: {
    color: Colors.BLACK,
    fontSize: RF(1.7),
    fontWeight: '500',
    marginLeft: hp(1),
  },
  labelViewAllReview: {
    color: Colors.PRIMARY,
    fontSize: RF(1.5),
    alignSelf: 'center',
    marginTop: hp(1),
  },
  reviewContainerMain: {
    // marginBottom: hp(2),
  },
  containerPacker: {
    backgroundColor: Colors.GREY5,
    paddingHorizontal: hp(3),
    paddingVertical: hp(1.5),
    marginHorizontal: hp(1.1),
  },
  containerName: {
    flex: 1,
    flexDirection: 'row',
    // marginTop: hp(0.5),
    marginLeft: hp(1),
  },
  labelPackerPhone: {
    color: Colors.GREY3,
    fontSize: RF(1.4),
    marginLeft: hp(0.5),
  },
  packerShare: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  labelCompanyName: {
    color: Colors.BLACK,
    fontSize: RF(1.5),
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
  },
  phone: {
    marginLeft: hp(1),
  },
  whatsApp: {
    marginLeft: hp(1),
  },
  containerContact: {
    flexDirection: 'row',
    marginLeft: hp(1),
    marginTop: hp(0.8),
  },
});

export const MoreDetails = ({
  color,
  name,
  size,
  header,
  data,
  image,
  iconCommunity,
}) => {
  return (
    <View style={{flexDirection: 'row', marginTop: hp(1)}}>
      {name && (
        <Icon
          name={name}
          color={color}
          size={size}
          iconCommunity={iconCommunity}
        />
      )}
      <View style={{}}>
        <Text
          style={{
            marginLeft: hp(1),
            color: Colors.BLACK,
            fontWeight: '600',
            fontSize: RF(1.5),
          }}>
          {header}
        </Text>
        <Text
          style={{
            marginLeft: hp(1.8),
            color: Colors.GREY3,

            fontSize: RF(1.3),
          }}>
          {data}
        </Text>
      </View>
    </View>
  );
};
