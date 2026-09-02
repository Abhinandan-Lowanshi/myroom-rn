import React, {useState, useEffect} from 'react';
import {openSettings} from 'react-native-permissions';
// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  Modal,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import {setLocation} from '../redux/Slice';
const getLocation = () => {
  console.log('getLocation');
  const [update, setUpdate] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted

          getOneTimeLocation();
          subscribeLocationLocation();
        } else {
        }
      } catch (err) {}
    }
  };
  const getOneTimeLocation = () => {
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        if (update) {
          setUpdate(false);
          dispatch(setLocation(position.coords));
          console.log(position, 'subscribeLocationLocation55');
        }
      },
      error => {
        //   setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        //   setLocationStatus('You are Here');
        if (update) {
          setUpdate(false);
          dispatch(setLocation(position.coords));
          console.log(position, 'subscribeLocationLocation55');
        }
        // setTimeout(() => {
        //   dispatch(setLocation(position.coords));
        // }, 5000);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        //   setCurrentLongitude(currentLongitude);

        //   //Setting Latitude state
        //   setCurrentLatitude(currentLatitude);
      },
      error => {
        //   setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return <></>;
};
export default getLocation;
