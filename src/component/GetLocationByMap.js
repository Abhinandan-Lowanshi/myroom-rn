import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Colors from '../common/Colors';
import {hp, RF} from '../common/CommonFunctions';
import C_Button from './C_Button';
import MapView, {Marker} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';

const GetLocationByMap = props => {
  const data = useSelector(state => state.AllData.locationInfo);

  return (
    <View style={style.parentContainer}>
      {data.length === 0 ? (
        <LowOpacityLoader />
      ) : (
        <View style={style.mapContainer}>
          <MapView
            apikey={'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc'}
            style={style.map}
            initialRegion={{
              latitude: 22.7196,
              longitude: 75.8577,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}></MapView>
        </View>
      )}
    </View>
  );
};
export default GetLocationByMap;

const style = StyleSheet.create({
  lowOpacity: value => ({
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
    opacity: value ? 1.0 : 0.5,
    position: 'absolute',
  }),
  parentContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
