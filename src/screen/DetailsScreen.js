import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import FullScreenLoader from '../component/FullScreenLoader';
import {useSelector, useDispatch} from 'react-redux';
import StyleGlobel from '../Style/StyleGlobel';
import Custom_Image from '../component/Custom_Image';
import Header from '../component/Header';
import Icon from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {RF, hp} from '../common/CommonFunctions';
import labels from '../common/labels';
import Labels from '../common/labels';
import IconName from '../common/IconName';
import Colors from '../common/Colors';
import ImageScaleType from '../common/ImageScaleType';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import ErrorModal from '../component/ErrorModal';
const DetailsScreen = props => {
  const {navigation} = props;
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [mapOnFocus, setMapOnFocus] = useState(false);
  const [imageData, setImageData] = useState({});
  const propData = props?.route?.params?.item;
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({});
  const onPressFav = props?.route?.params?.onPressFav;
  const roomInfo = props?.route?.params;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const data = useSelector(state => state.AllData.locationInfo);
  const [locationData, setLocationData] = useState({});
  useEffect(() => {
    setLike(propData?.favorite_key);
    setItem(propData);
    if (roomInfo?.isServer) {
      setLoading(true);
      getRoomFromServer(roomInfo?.roomId);
    }
  }, []);

  const setZoom = () => {
    let level = 0.001;
    //   let distance = 1;
    //   if (locationData?.distance?.value) {
    //     distance = locationData?.distance?.value;
    //     console.log(distance);
    //     if (distance < 500) {
    //       level = 0.001;
    //       return level;
    //       console.log(0.001);
    //     } else if (distance < 1000) {
    //       level = 0.002;
    //       return level;
    //       console.log(0.002);
    //     } else if (distance < 1500) {
    //       level = 0.05;
    //       return level;
    //       console.log(0.004);
    //     } else if (distance < 2000) {
    //       level = 0.005;
    //       console.log(0.005);
    //     } else if (distance < 4000) {
    //       level = 0.007;
    //       return level;
    //       console.log(0.007);
    //     } else if (distance < 7000) {
    //       level = 0.009;
    //       return level;
    //       console.log(0.009);
    //     } else if (distance < 11000) {
    //       level = 0.01;
    //       return level;
    //       console.log(0.01);
    //     } else if (distance < 15000) {
    //       level = 0.03;
    //       return level;
    //       console.log(0.03);
    //     } else if (distance < 25000) {
    //       level = 0.05;
    //       return level;
    //       console.log(0.05);
    //     } else {
    //       level = 0.07;
    //       return level;
    //       console.log(0.07);
    //     }
    //     return level;
    //   }
    return level;
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
          if (!res?.data?.length === 0) {
            setItem(res?.data);
          } else {
            console.log(res?.data, '124');
            setApiError(res?.message);
          }
        }
      })
      .catch(err => {
        setLoading(false);
        setApiError(err.toString());
      });
  };
  const ShowFullImage = () => {
    return (
      <Modal
        // transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <Custom_Image
          resizeMode={ImageScaleType.contain}
          uri={imageData?.img_name}
          container={{width: '100%', height: '97%', borderRadius: hp(2)}}
        />
        <IconButton_MaterialCommunityIcons
          onPress={() => {
            setVisible(false);
          }}
          iconContainer={{position: 'absolute', right: hp(2), top: hp(1)}}
          fValue={IconName?.close}
        />
      </Modal>
    );
  };

  const ShareLayout = () => {
    return (
      <View style={style.containeshare}>
        <IconButton_MaterialCommunityIcons
          iconContainer={style.iconeShareContainer}
          fValue={IconName?.googlemaps}
          iconColor={Colors.GREEN1}
        />
        <IconButton_MaterialCommunityIcons
          iconContainer={style.iconeShareContainer}
          fValue={IconName?.whatsapp}
          iconColor={Colors.GREEN2}
        />
        <IconButton_MaterialCommunityIcons
          iconContainer={style.iconeShareContainer}
          fValue={IconName?.share}
        />
      </View>
    );
  };

  const ContentHeader = props => {
    return (
      <View style={[style.headerContainer, props.headerContainer]}>
        <Text style={style.labelOwnerInfo}>{props?.label}</Text>
      </View>
    );
  };
  const renderImages = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          setVisible(true);
          setImageData(item);
        }}>
        <Custom_Image
          uri={item?.img_name}
          container={style.image(windowWidth)}
        />
      </TouchableOpacity>
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
        <MaterialCommunityIcons
          name={props?.value ? props?.tValue : props.fValue}
          size={props?.iconSize || hp(5)}
          color={props?.iconColor || Colors.RED}
        />
      </TouchableOpacity>
    );
  };

  const getFullAddress = () => {
    let data = locationData?.end_address;
    let address = '-------';
    if (data) {
      let addressArray = data?.split(',');
      addressArray.shift();
      address = addressArray.toString();
    }
    return address;
  };

  const RoomInformation = () => {
    console.log(locationData, 'locationData');
    return (
      <View style={style.containerAddressView}>
        <ContentHeader label={labels?.LocationInfo} />
        <SpecificationDetails
          containerInside={style.containerAddress}
          labelANS={style.fullAddressStyle}
          label={labels?.fullAddress}
          labelAns={getFullAddress()}
        />

        <SpecificationDetails
          containerInside={style.containerAddress}
          labelANS={style.fullAddressStyle}
          label={labels?.Distance}
          labelAns={locationData?.distance?.text || '-------'}
        />
        <SpecificationDetails
          containerInside={style.containerAddress}
          labelANS={style.fullAddressStyle}
          label={labels?.Time}
          labelAns={locationData?.duration?.text || '-------'}
        />
      </View>
    );
  };

  const ownerDetails = () => {
    return (
      <View style={style.ownerView}>
        <Image
          style={style.ownerImage}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
          }}></Image>
        <View style={style.ownerNameContainer}>
          <Text style={style.labelName}>{item?.rm_own_Fullname}</Text>
          <Text style={style.labelmoble}>{item?.rm_own_Fullname}</Text>
        </View>
        <View style={style.containerContact}>
          <IconButton_Entypo
            fValue={IconName?.message}
            iconColor={Colors.BLUE2}
          />
          <IconButton_Entypo
            fValue={IconName?.phone}
            iconColor={Colors.GREEN1}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={StyleGlobel.containerStyle}>
      <ShowFullImage />
      <Header label={Labels?.Details} navigation={navigation} />
      {roomInfo?.isServer && loading ? (
        <FullScreenLoader />
      ) : (
        <ScrollView style={{opacity: visible ? 0.2 : 1}}>
          <FlatList
            horizontal={true}
            data={item?.images}
            renderItem={renderImages}
          />
          <View style={style.contentContainer}>
            <View style={style.addressView}>
              <View style={style.addressContainer}>
                <Text style={style.sizelabel}>{item?.rm_size}</Text>
                <Text style={style.labelAddress}>
                  {`${item?.rm_house_no},${item?.rm_colny}, ${item?.rm_city}`}
                </Text>
              </View>
              {props?.route?.params?.isFrom === 'MyPost' ? null : (
                <IconButton_Entypo
                  value={like}
                  tValue={IconName?.heartActive}
                  fValue={IconName?.heartDeActive}
                  isLike={true}
                  onPress={() => {
                    setLike(!like);
                    onPressFav({roomId: item?.rm_pkey, like: !like}).then(
                      res => {
                        if (res === false) {
                          setLike(like);
                        }
                      },
                    );
                  }}
                />
              )}
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <ContentHeader
                label={labels.ListingAgent}
                headerContainer={{marginTop: 0}}
              />
              <Text style={style.labelRent}>{`\u20B9${item?.rm_rent}`}</Text>
            </View>

            {ownerDetails()}
            <ContentHeader label={labels.Specification} />
            <View style={style.contantConatainer2}>
              <SpecificationDetails
                label={labels?.Availablefor}
                labelAns={item?.rm_availble}
              />
              <SpecificationDetails
                label={labels?.ParkingAvailability}
                labelAns={item?.rm_prking_avblity}
              />
              <SpecificationDetails
                label={labels?.WhichFloor}
                labelAns={item?.rm_flor}
              />
              <SpecificationDetails
                label={labels?.Dependency}
                labelAns={item?.rm_depndecy}
              />
              <SpecificationDetails
                label={labels?.Furnished}
                labelAns={item?.rm_furnisd_status}
              />
            </View>
            <ContentHeader label={labels?.Description} />
            <Text style={style.labelDescription}>{item?.rm_description}</Text>
            {/* <ShareLayout /> */}
            <RoomInformation />
          </View>
          {item?.rm_latitude && (
            <View style={style.mapContainer(windowHeight, mapOnFocus)}>
              <MapView
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
              </MapView>
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

          {roomInfo?.isServer && (
            <ErrorModal
              onPress={() => {
                setApiError('');
              }}
              label={apiError}
              visible={apiError ? true : false}></ErrorModal>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DetailsScreen;
const style = StyleSheet.create({
  headerContainer: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.PRIMARY,
    marginTop: hp(3),
    paddingHorizontal: hp(2),
    borderRadius: hp(0.5),
    paddingVertical: hp(0.2),
    elevation: hp(0.5),
  },
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

  labelDescription: {
    color: Colors.GREY2,
    marginTop: hp(1),
    fontWeight: '600',
    fontSize: RF(2),
    marginLeft: hp(0.8),
  },
  containerInside: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelSt: {
    fontWeight: '600',
    marginLeft: hp(0.8),
    fontSize: RF(1.8),
    color: Colors.BLACK,
  },
  labelANS: {
    color: Colors.GREY2,
    marginLeft: hp(0),
    fontSize: RF(1.8),
    fontWeight: '600',
    marginRight: hp(1.5),
  },

  contantConatainer2: {
    marginTop: 5,
  },
  contentContainer: {
    marginHorizontal: hp(2),
  },
  containerContact: {
    flexDirection: 'row',
  },
  ownerNameContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: hp(1.3),
  },
  image: width => ({
    height: hp(60),
    width: width,
  }),
  addressView: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
  sizelabel: {
    color: Colors.BLACK,
    fontSize: RF(3),
    fontWeight: '700',
  },
  labelAddress: {
    color: Colors.GREY2,
    fontSize: hp(2.2),
    fontWeight: '600',
  },
  addressContainer: {
    flex: 1,
  },
  labelOwnerInfo: {
    fontSize: RF(2),
    color: Colors.WHITE,
    fontWeight: '600',
  },
  ownerView: {
    flexDirection: 'row',
    marginTop: hp(1.5),
  },
  ownerImage: {
    height: hp(8),
    width: hp(8),
    borderRadius: hp(90),
  },
  labelName: {
    color: Colors.BLACK,
    fontWeight: '600',
    fontSize: RF(2.2),
  },
  labelmoble: {
    color: Colors.GREY2,
    fontWeight: '600',
    marginTop: hp(0.2),
  },
  containeshare: {
    flexDirection: 'row',
    backgroundColor: Colors.GREY,
    marginBottom: hp(10),
    marginTop: hp(4),
    borderRadius: hp(1.5),
    // elevation: 10,
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
  },
  iconeShareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    elevation: hp(1),
    marginHorizontal: hp(2),
    borderRadius: hp(90),
    height: hp(7.2),
    width: hp(7.2),
    marginVertical: hp(1.5),
  },
  labelRent: {
    fontSize: RF(2.5),
    color: Colors.GREEN1,
    fontWeight: '700',
  },
  map: {
    flex: 1,
  },
  mapContainer: (windowHeight, isMapOnFocus) => ({
    height: isMapOnFocus ? windowHeight - hp(25) : hp(30),
    borderRadius: hp(10),
  }),
  fullScreenIcon: {
    position: 'absolute',
  },
  labelRoomInformation: {
    color: Colors.GREY2,
    fontWeight: '600',
    fontSize: RF(2),
    marginLeft: hp(0.8),
  },
  fullAddressStyle: {
    marginLeft: hp(2),
    maxWidth: '70%',
  },
  containerAddress: {
    marginTop: hp(0.8),
  },
  containerAddressView: {
    marginBottom: hp(2),
  },
  fullMapContainer: {
    position: 'absolute',
    marginLeft: hp(1.5),
    marginTop: hp(0.6),
  },
});
