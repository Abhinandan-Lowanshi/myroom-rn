import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';
import Labels from '../common/labels';
import data from '../common/SpinnerData';
import CustomPicker from '../component/CustomPicker';
import Header from '../component/Header';
import StyleGlobel from '../Style/StyleGlobel';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchRoomData} from '../redux/Slice';
import RenderRoom from '../component/RenderRoom';
import FullScreenLoader from '../component/FullScreenLoader';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import ScreenName from '../common/ScreenName';
import {favFunction} from '../common/APIFunctions';

const Search = ({navigation}) => {
  const [radius, setAvailableStatus] = useState('');
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState('');
  const [Loading, setLoading] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [roomData, setRoomData] = useState([]);
  // const [searchRooms, setSearchRooms] = useState({});
  const dispatch = useDispatch();
  const searchRooms = useSelector(state => state.AllData.roomDataHome);
  useEffect(() => {
    setRoomData(searchRooms);
  }, [searchRooms]);
  const [data, setData] = React.useState([
    {value: 'Single Room', id: 1, isApplied: false},
    {value: '1RK', id: 2, isApplied: false},
    {value: '1BHK', id: 3, isApplied: false},
    {value: '2BHK', id: 4, isApplied: false},
    {value: '3BHK', id: 5, isApplied: false},
    {value: 'More then 3BHK', id: 6, isApplied: false},
  ]);
  const getRooms = (location = null) => {
    // setIsFaild(false);
    setLoading(true);
    if (location) {
      sendRequest(
        {
          user_id: 'Dummy',
          latitude: location?.lat,
          longitude: location?.lng,
          radius: 5,
        },
        EndPoints.findRoom,
        'POST',
      )
        .then(res => {
          setLoading(false);
          if (res.status === true) {
            console.log(res.data.length, 'res');
            removeFilter();
            if (res.data.length > 0) {
              // setSearchRooms(res?.data);
            } else {
              // setError({
              //   error: 'No rooms find at your location',
              //   header: 'Sorry!',
              // });
            }
          } else {
            // setIsFaild(true);
            // setError({
            //   error: res.message,
            //   header: '',
            // });
          }
        })
        .catch(err => {
          console.log(err, 'location.lat && location.lon 55');
          removeFilter();
          setLoading(false);
          // setIsFaild(true);
          // setRefreshing(false);
          // dispatch(startL(false));
          // setError({
          //   error: '',
          //   header: '',
          // });
        });
    }
  };
  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        textInputProps={{
          placeholderTextColor: Colors.BLACK,
        }}
        onFail={error => {
          console.log(error, 'errorerror');
        }}
        // autoFillOnNotFound={error => {
        //   console.log(error, 'errorerror100');
        // }}
        onTimeout={error => {
          console.log(error, 'errorerror');
        }}
        keepResultsAfterBlur={true}
        keyboardShouldPersistTaps={'always'}
        styles={{
          textInputContainer: {},
          textInput: {
            height: hp(6.5),
            color: Colors.BLACK,
            fontSize: 16,
            elevation: hp(2),
            borderColor: Colors.GREY,
            borderWidth: hp(0.25),
            borderRadius: hp(1),
            marginHorizontal: hp(2),
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {
            color: Colors.BLACK,
          },
          description: {color: Colors.BLACK},
        }}
        placeholder="Search location"
        fetchDetails={true}
        onPress={(data, details = null) => {
          setLocation(details?.geometry?.location);
          getRooms(details?.geometry?.location);
        }}
        getCurrentLocation={data => {}}
        query={{
          key: 'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc',
          language: 'en',
        }}
      />
    );
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const onPressRoom = item => {
    navigation.navigate(ScreenName.DetailsScreen, {
      item,
      onPressFav,
    });
  };
  const performFavOp = data => {
    let temp = JSON.parse(JSON.stringify(roomData));
    temp.map(item => {
      if (item?.rm_pkey === data?.roomId) {
        return (item.favorite_key = data?.like);
      } else return item;
    });
    dispatch(setRoomData(temp));
  };
  const onPressFav = async value1 => {
    let value = {...value1};
    let data = {
      user_id: 2,
      room_id: value?.roomId,
      fav_type: value?.like === true ? 1 : 0,
    };
    performFavOp(value);

    try {
      const response = await favFunction(data);
      if (response.status === true) {
        if (
          response?.message === 'Room removed to favorite list successfully.' ||
          response?.message === 'Room added to favorite list successfully.'
        ) {
          // setIsUpdate(!isUpdate);
          // dispatch(updateHome(true));
          // showToast(response?.message);
          return true;
        } else {
          performFavOp({
            ...value,
            like: value?.like === true ? false : true,
          });
          return false;
        }
      } else {
        performFavOp({
          ...value,
          like: value?.like === true ? false : true,
        });
        showToast(response?.message);
        return false;
      }
    } catch (error) {
      console.log(error, 'error|||||||||||||');
      performFavOp({
        ...value,
        like: value?.like === true ? false : true,
      });
      return false;
    }
  };
  const removeFilter = () => {
    let temp = JSON.parse(JSON.stringify(data));
    temp?.map(item1 => {
      item1.isApplied = false;
      return item1;
    });
    setData(temp);
    setIsFilterApplied(false);
    setFilterVisible(false);
  };
  const getFilteredData = (temp, filterA) => {
    if (filterA) {
      let tempRoomData = JSON.parse(JSON.stringify(searchRooms));
      let tempSearchRoom = [];
      temp?.forEach(filter => {
        if (filter.isApplied === true) {
          tempRoomData.map(item => {
            if (filter.value === item?.rm_size) {
              tempSearchRoom.push(item);
            }
          });
        }
      });
      console.log(tempSearchRoom, 'tempSearchRoom');
      setRoomData(tempSearchRoom);
    } else {
      console.log(searchRooms, 'tempSearchRoom');
      setRoomData(searchRooms);
    }
  };

  const RenderFilter = () => {
    return (
      <View
        style={{
          width: '90%',
          position: 'absolute',
          top: hp(7),
          alignSelf: 'center',
          backgroundColor: Colors.WHITE,
          borderRadius: hp(1),
          elevation: 10,
          borderColor: isFilterApplied ? Colors.PRIMARY : Colors.WHITE,
          borderWidth: hp(0.2),
          marginTop: hp(7),
        }}>
        <View
          style={{
            height: hp(0.5),
            borderTopLeftRadius: hp(1),
            borderTopRightRadius: hp(1),
          }}></View>
        <View
          style={{
            paddingHorizontal: hp(2),
            paddingVertical: hp(1),
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: isFilterApplied ? Colors.PRIMARY : Colors.BLACK,
                fontSize: hp(2),
              }}>
              {isFilterApplied ? 'Filter applied' : 'Apply filter'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setFilterVisible(!filterVisible);
              }}>
              <AntDesign
                name={filterVisible ? 'upcircleo' : 'downcircleo'}
                size={hp(3)}
                color={isFilterApplied ? Colors.PRIMARY : Colors.GREY}
              />
            </TouchableOpacity>
          </View>
          {filterVisible ? (
            <FlatList
              data={data}
              numColumns={3}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      marginHorizontal: hp(1),
                      alignSelf: 'center',
                      marginTop: hp(1),
                    }}>
                    <Text
                      onPress={() => {
                        let temp = JSON.parse(JSON.stringify(data));
                        temp?.map(item1 => {
                          if (item1?.id === item?.id) {
                            item1.isApplied = !item1?.isApplied;
                          }
                          return item1;
                        });
                        console.log();
                        let filterApplied = temp?.some(item => {
                          return item?.isApplied === true;
                        });
                        setData(temp);
                        setIsFilterApplied(filterApplied);
                        getFilteredData(temp, filterApplied);
                      }}
                      style={{
                        alignSelf: 'flex-end',
                        fontSize: hp(1.8),
                        paddingHorizontal: hp(1.8),
                        paddingVertical: hp(0.6),
                        backgroundColor: item.isApplied
                          ? Colors.PRIMARY
                          : Colors.PRIMARYLITE1,
                        borderRadius: hp(1),
                        color: Colors.WHITE,
                      }}>
                      {item.value}
                    </Text>
                  </View>
                );
              }}></FlatList>
          ) : null}
        </View>
      </View>
    );
  };
  const SearchView = () => {
    return <View style={style.searchContainer}></View>;
  };
  return (
    <View style={StyleGlobel.containerStyle}>
      <Header label={Labels?.Search} navigation={navigation} />
      <View style={{zIndex: 2}}>
        <GooglePlacesInput />
      </View>
      <View
        style={{
          marginHorizontal: hp(1),
          marginTop: hp(7),
        }}>
        {Loading ? (
          <FullScreenLoader />
        ) : (
          <View style={{}}>
            <RenderRoom
              myRoomList={roomData}
              onPress={onPressRoom}
              onPressFav={onPressFav}
              refreshing={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Search;
const style = StyleSheet.create({
  InputTextStyleRadius: {
    height: hp(4),
  },
  searchContainer: {
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
  },
  inputRadius: {
    width: hp(18),
    height: hp(6),
    fontSize: hp(1.6),
    borderRadius: hp(1),
    borderColor: Colors.PRIMARY,
  },
  placeholder: {
    backgroundColor: 'red',
  },
});
