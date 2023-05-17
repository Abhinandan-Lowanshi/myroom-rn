import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../common/Colors';
import {hp, RF} from '../common/CommonFunctions';
import Labels from '../common/labels';
import StyleGlobel from '../Style/StyleGlobel';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import RenderRoom from '../component/RenderRoom';
import ScreenName from '../common/ScreenName';
import {favFunction} from '../common/APIFunctions';
import Filter from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import RenderRecentSearch from '../component/RenderRecentSearch';
import localStorageOp from '../localStorage/LocalData';
import AsyncKeys from '../localStorage/AsyncKeys';
import LowOpacityLoader from '../component/LowOpacityLoader';
import GooglePlacesInput from '../component/GooglePlacesInput';
import {updateHome, searchUpdate} from '../redux/Slice';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {filterData, filterRoom, getRoomCount} from '../common/FIlterData';

const Search = ({navigation}) => {
  const [location, setLocation] = useState({});
  const [filter, setFilter] = useState(false);
  const [totalRoom, setTotalRoom] = useState(0);
  const [totalMain, setTotalMain] = useState(0);
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [actualData, setActualData] = useState({});
  const [message, setMessage] = useState('Search rooms around you');
  const [recent, setRecent] = useState([]);
  const dispatch = useDispatch();

  const [data, setData] = React.useState(filterData);

  useEffect(() => {
    localStorageOp('', AsyncKeys.RECENT_SERCHES, '')
      .then(data => {
        setRecent(data);
      })
      .catch(() => {});
  }, []);

  const getRooms = (location = null) => {
    setMessage('');
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
            setTotalMain(res?.data?.length);
            setActualData(res?.data);
            calculateRoomCount(res?.data);
            setRoomData(res?.data);
            if (res.data?.length > 0) {
            } else {
              setMessage('No room found');
              setActualData({});
            }
          } else {
            setActualData({});
            setMessage('Something went wrong');
          }
        })
        .catch(err => {
          console.log(err, 'location.lat && location.lon 55');
          setLoading(false);
          setMessage('Something went wrong');
          setActualData({});
        });
    }
  };

  const calculateRoomCount = rooms => {
    let temp = getRoomCount(data, rooms);
    if (temp) {
      setData(temp);
      removeFilter();
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
        <TouchableOpacity
          style={style.containerFilter}
          onPress={() => setFilter(!filter)}>
          <Filter
            style={style.iconStyle}
            name={checkFilterApplied() ? 'filter-check' : 'filter'}
            size={hp(3.6)}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // const GooglePlacesInput = () => {
  //   return (
  //     <GooglePlacesAutocomplete
  //       style={style.containerPlaceHolder}
  //       onFail={error => {}}
  //       onTimeout={error => {}}
  //       textInputProps={{
  //         placeholderTextColor: Colors.BLACK,
  //         returnKeyType: 'search',
  //       }}
  //       keepResultsAfterBlur={true}
  //       keyboardShouldPersistTaps={'always'}
  //       styles={{
  //         textInputContainer: {},
  //         textInput: {
  //           height: hp(6),
  //           color: Colors.BLACK,
  //           fontSize: 16,
  //           elevation: hp(2),
  //           borderColor: Colors.GREY,
  //           borderWidth: hp(0.25),
  //           borderRadius: hp(1),
  //           marginHorizontal: hp(1),
  //           marginTop: hp(1),
  //         },
  //         predefinedPlacesDescription: {
  //           color: '#1faadb',
  //         },
  //         description: {color: Colors.BLACK},
  //       }}
  //       placeholder="Search location"
  //       fetchDetails={true}
  //       onPress={(data, details = null) => {
  //         setLocation(details?.geometry?.location);
  //         getRooms(details?.geometry?.location);
  //         handleRecent(details);
  //       }}
  //       getCurrentLocation={data => {}}
  //       query={{
  //         key: 'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc',
  //         language: 'en',
  //       }}
  //     />
  //   );
  // };

  const handleRecent = data => {
    let ob = {
      name: data?.name,
      location: data?.geometry?.location,
      status: false,
    };
    localStorageOp('', AsyncKeys.RECENT_SERCHES, '')
      .then(oldData => {
        if (oldData) {
          let temp = JSON.parse(JSON.stringify(oldData));
          if (!checkIsPresent(temp, ob)) {
            if (temp?.length > 10) temp?.pop();
            temp?.unshift(ob);
            localStorageOp(true, AsyncKeys.RECENT_SERCHES, temp);
            setRecent(temp);
          } else {
            temp?.map(item => {
              if (item?.name !== ob?.name) return item;
            });
            temp = temp.filter(item => item?.name !== ob?.name);
            temp.unshift(ob);
            localStorageOp(true, AsyncKeys.RECENT_SERCHES, temp);
            setRecent(temp);
          }
        } else {
          let rec = [];
          rec.push(ob);
          localStorageOp(true, AsyncKeys.RECENT_SERCHES, rec);
          setRecent(rec);
        }
      })
      .catch(() => {});
  };

  const handleRecentAPI = data => {
    if (data?.location) {
      getRooms(data?.location);
      handleRecentStatus(data);
    }
  };

  const handleRecentStatus = data => {
    let temp = JSON.parse(JSON.stringify(recent));
    temp.map(item => {
      return (item.status = item?.name === data?.name ? true : false);
    });
    setRecent(temp);
    recent;
  };

  const checkIsPresent = (data, recent) => {
    return data?.some(item => {
      return item.name === recent?.name;
    });
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
    setRoomData(temp);
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
          Toast.show(response?.message, Toast.LONG);
          dispatch(searchUpdate(true));
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
  };

  const getFilteredData = (temp, filterA) => {
    if (filterA) {
      let tempRoomData = JSON.parse(JSON.stringify(actualData));
      let tempSearchRoom = [];
      if (tempRoomData.length > 0) {
        tempSearchRoom = filterRoom(temp, tempRoomData);
        setRoomData(tempSearchRoom);
      }
    } else {
      setRoomData(actualData);
    }
  };

  const checkFilterApplied = () => {
    return data?.some(item => {
      return item?.isApplied === true;
    });
  };
  const calculateTotalAvailableRoom = value => {
    let totalRoom = 0;
    value?.map(item => {
      if (item?.isApplied === true) {
        totalRoom = totalRoom + item?.availableRooms;
      }
    });
    setTotalRoom(totalRoom);
  };

  const manageFilter = (item, isFrom) => {
    let temp = JSON.parse(JSON.stringify(data));
    switch (isFrom) {
      case Labels.FILTER:
        {
          temp?.map(item1 => {
            if (item1?.id === item?.id) {
              item1.isApplied = !item1?.isApplied;
            }
            return item1;
          });
        }
        break;
      case Labels.RESET:
        {
          temp?.map(item1 => {
            item1.isApplied = false;
            return item1;
          });
        }
        break;
      case Labels.ALL:
        {
          temp?.map(item1 => {
            item1.isApplied = true;
            return item1;
          });
        }
        break;
      default: {
        {
          temp?.map(item1 => {
            item1.isApplied = false;
            return item1;
          });
        }
      }
    }
    calculateTotalAvailableRoom(temp);
    setData(temp);
    let check = temp?.some(item => {
      return item?.isApplied === true;
    });
    getFilteredData(temp, check);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          manageFilter(item, Labels.FILTER);
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
            {item?.availableRooms}
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
        visible={filter}>
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
            paddingVertical: hp(3),
            paddingHorizontal: hp(2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: hp(1),
            }}>
            <Text
              style={{
                color: Colors.BLACK1,
                fontWeight: '600',
                fontSize: RF(2.5),
              }}>
              Room Categories
            </Text>
            <TouchableOpacity
              style={style.closeIcon}
              onPress={() => setFilter(false)}>
              <MaterialCommunityIcons
                name={'close'}
                size={hp(3)}
                color={Colors.BLACK}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => manageFilter({}, Labels.ALL)}>
              <Text style={{color: Colors.PRIMARY, fontSize: RF(1.8)}}>
                Select all
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: hp(2)}}
              onPress={() => {
                manageFilter({}, Labels.RESET);
                getFilteredData(data, false);
              }}>
              <Text style={{color: Colors.PRIMARY, fontSize: RF(1.8)}}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <Text
            style={{
              color: Colors.BLACK1,
              fontWeight: '600',
              fontSize: RF(2.1),
              marginTop: hp(0.5),
            }}>
            {`View ${
              checkFilterApplied() ? totalRoom : totalMain
            } out of ${totalMain}`}
          </Text>
        </View>
      </Modal>
    );
  };

  const onSearch = details => {
    setLocation(details?.geometry?.location);
    getRooms(details?.geometry?.location);
    handleRecent(details);
  };

  return (
    <View style={StyleGlobel.containerStyle}>
      <Header label={Labels?.Search} navigation={navigation} />
      {/* <ScrollView> */}
      {loading && <LowOpacityLoader />}
      <GooglePlacesInput onSearch={onSearch} />
      {filter && RenderFilter()}
      <View style={style.containerList}>
        <RenderRecentSearch data={recent} onPress={handleRecentAPI} />
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
          flat={style.flat}
          myRoomList={roomData}
          onPress={onPressRoom}
          onPressFav={onPressFav}
        />
      </View>
      {/* </ScrollView> */}
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
    bottom: hp(0),
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
    marginRight: hp(1),
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  outerContainer: {
    height: hp(5),
  },
  flat: {
    height: '85%',
    marginHorizontal: hp(1),
    marginTop: hp(1),
  },
});
