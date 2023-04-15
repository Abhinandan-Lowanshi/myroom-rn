import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Colors from '../common/Colors';
import {hp, RF} from '../common/CommonFunctions';
import C_Button from './C_Button';
import MapView, {Marker} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/Foundation';
import Header from './Header';
import Labels from '../common/labels';
import ScreenName from '../common/ScreenName';
import LowOpacityLoader from './LowOpacityLoader';
import {setIsMapVisited, setRoomLocationMain} from '../redux/Slice';
import {useEffect} from 'react';
import InfoModal from './InfoModal';

const GetLocationByMap = props => {
  const {navigation} = props;
  const {onMapData, roomLocation} = props?.route?.params;
  const [visible, setVisible] = useState(true);
  const data = useSelector(state => state.AllData.locationInfo);
  const [roomLocationMain, setRoomLocationMain] = useState(data);
  const dispatch = useDispatch();
  // const renderInfoModal = () => {
  //   return (
  //     <Modal visible={visible} transparent={true}>
  //       <View style={style.lowOpacity}></View>
  //       <View style={style.containerInfo}>
  //         <View style={style.containerLabel}>
  //           <Text style={style.labelInfo}>
  //             Drag the map to above your room if the marker not point to your
  //             room.
  //           </Text>
  //           <C_Button
  //             outerContainer={style.outerContainerDismiss}
  //             isLoading={false}
  //             onPress={() => setVisible(false)}
  //             // outerContainer={style.outerContainer}
  //             isSubmitDisabled={false}
  //             label={'Dismiss'}
  //           />
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // };

  const saveLocation = () => {
    onMapData(roomLocationMain);
    navigation.goBack();
  };

  const handleModal = () => {
    setVisible(false);
  };
  return (
    <View style={style.parentContainer}>
      <Header label={Labels?.RoomLocation} navigation={navigation} />
      {data.length === 0 ? (
        <LowOpacityLoader />
      ) : (
        <MapView
          apikey={'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc'}
          style={style.map}
          initialRegion={{
            latitude: parseFloat(
              Object.keys(roomLocation).length !== 0
                ? roomLocation?.latitude
                : data?.latitude,
            ),
            longitude: parseFloat(
              Object.keys(roomLocation).length !== 0
                ? roomLocation?.longitude
                : data?.longitude,
            ),
            latitudeDelta:
              Object.keys(roomLocation).length !== 0
                ? roomLocation?.latitudeDelta
                : 0.005,
            longitudeDelta:
              Object.keys(roomLocation).length !== 0
                ? roomLocation?.longitudeDelta
                : 0.005,
          }}
          onRegionChangeComplete={coords => {
            setRoomLocationMain(coords);
          }}></MapView>
      )}
      <View
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={'marker'} size={hp(5)} color={Colors.PRIMARY} />
      </View>
      <Text style={style.label}> Point the marker to above your room</Text>
      <C_Button
        outerContainer={style.outerContainer}
        isLoading={false}
        onPress={() => saveLocation()}
        isSubmitDisabled={false}
        label={'Save Location & Exit'}
      />
      <InfoModal
        label={
          'Drag the map to above your room if the marker not point to your room.'
        }
        visible={visible}
        buttonLabel={'Dismiss'}
        onPress={handleModal}></InfoModal>
    </View>
  );
};
export default GetLocationByMap;

const style = StyleSheet.create({
  parentContainer: {flex: 1},
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
  outerContainer: {
    position: 'absolute',
    bottom: hp(1),
    height: hp(5),
  },
  label: {
    position: 'absolute',
    bottom: hp(7),
    color: Colors.BLACK,
    alignSelf: 'center',
  },
});
