import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {RF, hp} from '../common/CommonFunctions';
import {MoreDetails} from '../screen/DetailsScreen';
import images from '../common/images';
import Colors from '../common/Colors';
import Labels from '../common/labels';
import Icon from './Icon';
import Header from './Header';
const MapScreen = props => {
  const {navigation} = props;

  const [open, setOpen] = useState(false);
  const [locationInfoData, setLocationInfoData] = useState({});
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message:
              'This App needscontainerLocationInfo to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation();
        } else {
          // setVisible(true);
        }
      } catch (err) {}
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {},
      error => {},
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const locationInfo = () => {
    return (
      <View style={style.mainContainer}>
        <TouchableOpacity style={style.header} onPress={() => setOpen(!open)}>
          <Icon
            name={open ? 'up' : 'down'}
            color={Colors.BLACK}
            size={hp(3)}
            iconCommunity={'AntDesign'}
          />
        </TouchableOpacity>
        {open && (
          <View style={style.containerLocationInfo}>
            <MoreDetails
              name={'address'}
              color={Colors.GREY}
              size={hp(3.2)}
              header={'Location based address'}
              data={locationInfoData?.end_address || '-------'}
              iconCommunity={'Entypo'}
            />
            <MoreDetails
              name={'signal-distance-variant'}
              color={Colors.GREY}
              size={hp(3.2)}
              header={Labels?.Distance}
              data={locationInfoData?.distance?.text || '-------'}
              iconCommunity={'MaterialCommunityIcons'}
            />
            <MoreDetails
              name={'timer-sand'}
              color={Colors.GREY}
              size={hp(3.2)}
              header={Labels?.Time}
              data={locationInfoData?.duration?.text || '-------'}
              iconCommunity={'MaterialCommunityIcons'}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header label={Labels?.Route} navigation={navigation} />
      {props?.route?.params.desRm_latitude &&
        props?.route?.params.desRm_longitude &&
        props?.route?.params?.OrRm_latitude &&
        props?.route?.params?.OrRm_longitude && (
          <MapView
            style={style.map}
            zoomEnabled={true}
            initialRegion={{
              latitude: props?.route?.params.desRm_latitude
                ? parseFloat(props?.route?.params.desRm_latitude)
                : 0.0,
              longitude: props?.route?.params.desRm_longitude
                ? parseFloat(props?.route?.params.desRm_longitude)
                : 0.0,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}>
            <MapViewDirections
              onReady={item => {
                setLocationInfoData(item?.legs[0]);
              }}
              optimizeWaypoints={true}
              splitWaypoints={true}
              origin={{
                latitude: props?.route?.params?.OrRm_latitude,
                longitude: props?.route?.params?.OrRm_longitude,
              }}
              destination={{
                latitude: parseFloat(props?.route?.params.desRm_latitude),
                longitude: parseFloat(props?.route?.params.desRm_longitude),
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
                latitude: parseFloat(props?.route?.params.desRm_latitude),
                longitude: parseFloat(props?.route?.params.desRm_longitude),
              }}>
              <Image
                style={{height: hp(8), width: hp(8)}}
                source={images.homeMapIcon}></Image>
            </Marker>
            <Marker
              title={'Your location'}
              key={1}
              coordinate={{
                latitude: props?.route?.params?.OrRm_latitude,
                longitude: props?.route?.params?.OrRm_longitude,
              }}>
              <Image
                style={{height: hp(5.5), width: hp(5.5)}}
                source={images.personIcon}></Image>
            </Marker>
          </MapView>
        )}
      {locationInfo()}
    </View>
  );
};

export default MapScreen;
const style = StyleSheet.create({
  map: {
    flex: 1,
  },
  mapContainer: (windowHeight, isMapOnFocus) => ({
    height: isMapOnFocus ? windowHeight - hp(25) : hp(30),
    borderRadius: hp(10),
  }),
  containerLocationInfo: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    alignSelf: 'center',
    paddingHorizontal: hp(2),
    paddingVertical: hp(1.3),
  },
  header: {
    alignSelf: 'center',
    width: hp(20),
    // height: hp(2.5),
    backgroundColor: Colors.WHITE,
    elevation: hp(1),
    borderTopLeftRadius: hp(2),
    borderTopRightRadius: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(0.5),
  },
  mainContainer: {
    width: '100%',
    position: 'absolute',
    bottom: hp(0),
    elevation: hp(2),
  },
});
