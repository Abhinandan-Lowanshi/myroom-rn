import React from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GooglePlacesInput = props => {
  return (
    <GooglePlacesAutocomplete
      style={[style.containerPlaceHolder, props?.containerPlaceHolder]}
      onFail={error => {}}
      onTimeout={error => {}}
      textInputProps={{
        placeholderTextColor: Colors.BLACK,
        returnKeyType: 'search',
      }}
      keepResultsAfterBlur={true}
      keyboardShouldPersistTaps={'always'}
      styles={{
        textInputContainer: {},
        textInput: {
          height: hp(6),
          color: Colors.BLACK,
          fontSize: 16,
          elevation: hp(2),
          borderColor: Colors.GREY,
          borderWidth: hp(0.25),
          borderRadius: hp(1),
          marginHorizontal: hp(1),
          marginTop: hp(1),
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
        description: {color: Colors.BLACK},
      }}
      placeholder={props.placeholder || 'Search Location'}
      fetchDetails={true}
      onPress={(data, details = null) => {
        props?.onSearch(details);
        // setLocation(details?.geometry?.location);
        // getRooms(details?.geometry?.location);
        // handleRecent(details);
      }}
      getCurrentLocation={data => {}}
      query={{
        key: 'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc',
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;

const style = StyleSheet.create({
  containerPlaceHolder: {
    position: 'absolute',
    top: hp(7.5),
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginHorizontal: hp(1),
    elevation: hp(5),
  },
});
