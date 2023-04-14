import React, {useState, useEffect} from 'react';
import {openSettings} from 'react-native-permissions';
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
import {setLocation, setCurrentLocationName} from '../redux/Slice';
const getLocation = () => {
  const [coords, setCoords] = useState('');
  const [update, setUpdate] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      // subscribeLocationLocation();
      // dispatch(setLocation(coords));
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
          // subscribeLocationLocation();
          // dispatch(setLocation(coords));
        } else {
        }
      } catch (err) {}
    }
  };

  const getAddressFromCoordinates = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          latitude +
          ',' +
          longitude +
          '&key=' +
          'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc',
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status === 'OK') {
            dispatch(
              setCurrentLocationName({
                locationName: responseJson?.results?.[0]?.formatted_address,
              }),
            );
            resolve(responseJson?.results?.[0]?.formatted_address);
          } else {
            reject('not found');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  const getOneTimeLocation = () => {
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        // setCoords(position.coords);
        // if (update) {
        // setUpdate(false);
        dispatch(setLocation(position.coords));
        getAddressFromCoordinates(
          position.coords.latitude,
          position.coords.longitude,
        );

        // }
      },
      error => {
        //   setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
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
        setCoords(position.coords);
        // if (update) {
        //   setUpdate(false);
        //   dispatch(setLocation(position.coords));
        // }
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
