import react, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';
import Labels from '../common/labels';
import data from '../common/SpinnerData';
import CustomPicker from '../component/CustomPicker';
import Header from '../component/Header';
import StyleGlobel from '../Style/StyleGlobel';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const Search = ({navigation}) => {
  const [radius, setAvailableStatus] = useState('');
  const [location, setLocation] = useState({});

  const getRooms = () => {};
  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        currentLocation={true}
        placeholder="Search location
        "
        fetchDetails={true}
        onPress={(data, details = null) => {
          setLocation(details?.geometry?.location);
          getRooms();
        }}
        getCurrentLocation={data => {
          // 'details' is provided when fetchDetails = true
          // console.log(data);
        }}
        query={{
          key: 'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc',
          language: 'en',
        }}
      />
    );
  };

  const SearchView = () => {
    return (
      <View style={style.searchContainer}>
        <GooglePlacesInput></GooglePlacesInput>

        <CustomPicker
          // labelTop={'Select availability of room'}
          placeholder={'Select radius'}
          container={style.inputRadius}
          onItemChange={value => setAvailableStatus(value?.value)}
          data={data.ROOM_RADIUS}
        />
      </View>
    );
  };
  return (
    <View style={StyleGlobel.containerStyle}>
      <Header label={Labels?.Search} navigation={navigation} />
      <SearchView />
    </View>
  );
};

export default Search;
const style = StyleSheet.create({
  InputTextStyleRadius: {
    // marginTop: hp(1),
    height: hp(4),
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: hp(2),
    marginTop: hp(2),
  },
  containerStylePLocation: {
    width: '90%',
  },
  containerStylePRadius: {
    width: '10%',
  },
  InputTextStyle: {
    fontSize: hp(1.6),
    flex: 1,
    height: hp(6),
    borderRadius: hp(1),
    borderColor: Colors.PRIMARY,
    borderWidth: 2,
    marginRight: hp(1),
    paddingLeft: hp(2),
    // backgroundColor: 'red',
  },
  inputRadius: {
    width: hp(18),
    height: hp(6),
    fontSize: hp(1.6),
    borderRadius: hp(1),
    borderColor: Colors.PRIMARY,
  },
});
