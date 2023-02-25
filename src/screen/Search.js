import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../common/Colors';
import {hp, RF} from '../common/CommonFunctions';
import Labels from '../common/labels';
import data from '../common/SpinnerData';
import CustomPicker from '../component/CustomPicker';
// import Header from '../component/Header';
import StyleGlobel from '../Style/StyleGlobel';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import {useDispatch, useSelector} from 'react-redux';
import {setRoomDataHome, setSearchRoomData, updateHome} from '../redux/Slice';
import RenderRoom from '../component/RenderRoom';
import FullScreenLoader from '../component/FullScreenLoader';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import ScreenName from '../common/ScreenName';
import {favFunction} from '../common/APIFunctions';
import Filter from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import C_Button from '../component/C_Button';
import {useMemo} from 'react';

const Search = ({navigation}) => {
  const [radius, setAvailableStatus] = useState('');
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [searchRooms, setSearchRooms] = useState({});
  const [message, setMessage] = useState('Search rooms around you');
  const dispatch = useDispatch();
  useEffect(() => {
    setRoomData(searchRooms);
    dispatch(updateHome(false));
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
    setMessage('');
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
              setSearchRooms(res?.data);
            } else {
              setMessage('No room at your searched location');
              setSearchRooms({});
            }
          } else {
            setSearchRooms({});
            setMessage('Something went wrong');
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
          setMessage('Something went wrong');
          setSearchRooms({});
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
  const Header = ({label, navigation}) => {
    return (
      <View style={style.container}>
        <TouchableOpacity
          style={style.containerInner}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            style={style.iconStyle}
            name="left"
            size={hp(3.6)}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
        <Text style={style.labelSignUp}>{label}</Text>
        <TouchableOpacity style={style.containerFilter}>
          <Filter
            style={style.iconStyle}
            name={'filter'}
            size={hp(3.6)}
            color={Colors.PRIMARY}
          />
          <View
            style={{
              borderRadius: hp(90),
              backgroundColor: Colors.WHITE,
              elevation: hp(5),
              justifyContent: 'center',
              alignItems: 'center',
              height: hp(1.7),
              width: hp(1.7),
              position: 'absolute',
              right: 0,
            }}>
            <Text
              style={{
                color: Colors.BLACK,
                alignSelf: 'center',
                fontSize: RF(1.4),
              }}>
              1
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        style={style.containerPlaceHolder}
        onFail={error => {
          console.log(error, 'errorerror');
        }}
        onTimeout={error => {
          console.log(error, 'errorerror');
        }}
        textInputProps={{
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
          // predefinedPlacesDescription: {
          //   color: '#1faadb',
          // },
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
    dispatch(setRoomDataHome(temp));
  };
  const onPressFav = async value1 => {
    console.log('onPressFav');
    let value = {...value1};
    let data = {
      user_id: 2,
      room_id: value?.roomId,
      fav_type: value?.like === true ? 1 : 0,
    };
    performFavOp(value);

    try {
      console.log('onPressFav181');
      const response = await favFunction(data);
      if (response.status === true) {
        if (
          response?.message === 'Room removed to favorite list successfully.' ||
          response?.message === 'Room added to favorite list successfully.'
        ) {
          // setIsUpdate(!isUpdate);
          // dispatch(updateHome(true));
          // showToast(response?.message);
          // dispatch(updateHome(true));
          // dispatch(updateFav(true));
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
  const RenderFilterItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let temp = JSON.parse(JSON.stringify(data));
          temp?.map(item1 => {
            if (item1?.id === item?.id) {
              item1.isApplied = !item1?.isApplied;
            }
            return item1;
          });
          let filterApplied = temp?.some(item => {
            return item?.isApplied === true;
          });
          setData(temp);
          setIsFilterApplied(filterApplied);
          // getFilteredData(temp, filterApplied);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: hp(2),
                height: hp(2),
                borderWidth: hp(0.1),
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: hp(0.4),
                // backgroundColor: '#8a8888',
                backgroundColor: Colors.PRIMARYLITE,
                borderColor: Colors.PRIMARY,
              }}>
              <MaterialCommunityIcons
                name={'check'}
                size={hp(1.5)}
                color={Colors.WHITE}
              />
            </View>
            <Text
              style={{
                fontSize: hp(1.8),
                paddingVertical: hp(1),
                color: Colors.BLACK,
                fontWeight: '600',
                marginLeft: hp(1),
              }}>
              {item.value}
            </Text>
          </View>
          <Text
            style={[
              {
                fontSize: hp(1.8),
                paddingVertical: hp(1),
                color: Colors.BLACK,
                fontWeight: '600',
                marginLeft: hp(1),
              },
              {alignSelf: 'flex-end'},
            ]}>
            1
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  //   [data],
  // );
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let temp = JSON.parse(JSON.stringify(data));
          temp?.map(item1 => {
            if (item1?.id === item?.id) {
              item1.isApplied = !item1?.isApplied;
            }
            return item1;
          });
          setData(temp);

          // let filterApplied = temp?.some(item => {
          //   return item?.isApplied === true;
          // });
          // setIsFilterApplied(filterApplied);
          // getFilteredData(temp, filterApplied);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: hp(2),
                height: hp(2),
                borderWidth: hp(0.1),
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: hp(0.4),
                // backgroundColor: '#8a8888',
                backgroundColor: item?.isApplied
                  ? Colors.PRIMARYLITE
                  : Colors.WHITE,
                borderColor: Colors.PRIMARY,
              }}>
              {item?.isApplied && (
                <MaterialCommunityIcons
                  name={'check'}
                  size={hp(1.5)}
                  color={Colors.WHITE}
                />
              )}
            </View>
            <Text
              style={{
                fontSize: hp(1.8),
                paddingVertical: hp(1),
                color: Colors.BLACK,
                fontWeight: '600',
                marginLeft: hp(1),
              }}>
              {item?.value}
            </Text>
          </View>
          <Text
            style={[
              {
                fontSize: hp(1.8),
                paddingVertical: hp(1),
                color: Colors.BLACK,
                fontWeight: '600',
                marginLeft: hp(1),
              },
              {alignSelf: 'flex-end'},
            ]}>
            1
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const RenderFilter = () => {
    return (
      <Modal
        transparent={true}
        style={{
          flex: 1,
        }}
        visible={true}>
        <View style={{flex: 1, backgroundColor: 'grey', opacity: 0.5}}></View>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: hp(0),
            alignSelf: 'center',
            backgroundColor: Colors.WHITE,
            borderRadius: hp(1),
            elevation: 10,
            // borderColor: isFilterApplied ? Colors.PRIMARY : Colors.WHITE,
            // borderWidth: hp(0.2),
            paddingVertical: hp(3),
            paddingHorizontal: hp(2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: hp(2),
            }}>
            <Text
              style={{
                color: Colors.BLACK1,
                fontWeight: '600',
                fontSize: RF(2.5),
              }}>
              Room Categories
            </Text>
            <TouchableOpacity style={style.closeIcon}>
              <MaterialCommunityIcons
                name={'close'}
                size={hp(3)}
                color={Colors.BLACK}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <C_Button
            onPress={() => {}}
            outerContainer={style.outerContainer}
            isSubmitDisabled={false}
            label={'show 2 rooms'}
          />
        </View>
      </Modal>
    );
  };

  const SearchView = () => {
    return <View style={style.searchContainer}></View>;
  };
  return (
    <View style={StyleGlobel.containerStyle}>
      <Header label={Labels?.Search} navigation={navigation} />
      <GooglePlacesInput />
      <RenderFilter />
      {loading ? (
        <FullScreenLoader />
      ) : (
        <View style={style.containerList}>
          {message && (
            <Text
              style={{
                color: 'black',
                alignSelf: 'center',
                fontSize: RF(2.3),
                marginTop: '50%',
              }}>
              {message}
            </Text>
          )}
          <RenderRoom
            myRoomList={searchRooms}
            onPress={onPressRoom}
            onPressFav={onPressFav}
            refreshing={false}
          />
        </View>
      )}
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
  containerList: {
    width: '100%',
    top: hp(7.5),
    zIndex: -1,
    bottom: hp(1),
  },
  containerPlaceHolder: {
    position: 'absolute',
    top: hp(7.5),
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginHorizontal: hp(1),
    elevation: hp(5),
  },
  container: {
    height: hp(6),
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 15,
    justifyContent: 'space-between',
    paddingHorizontal: hp(1),
  },
  iconStyle: {
    alignSelf: 'center',
  },
  labelSignUp: {
    fontSize: hp(3),
    alignSelf: 'center',
    color: Colors.PRIMARY,
    fontSize: hp(2.6),
  },
  containerInner: {
    flexDirection: 'row',
  },
  containerFilter: {
    alignSelf: 'center',
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  outerContainer: {
    height: hp(5),
  },
});
