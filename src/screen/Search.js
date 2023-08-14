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
import {hp, RF, updateRating} from '../common/CommonFunctions';
import Labels from '../common/labels';
import StyleGlobel from '../Style/StyleGlobel';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';
import ScreenName from '../common/ScreenName';
import {favFunction} from '../common/APIFunctions';
import Filter from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import RenderRecentSearch from '../component/RenderRecentSearch';
import localStorageOp from '../localStorage/LocalData';
import AsyncKeys from '../localStorage/AsyncKeys';
import LowOpacityLoader from '../component/LowOpacityLoader';
import GooglePlacesInput from '../component/GooglePlacesInput';
import {updateHome, searchUpdate, setFilterData} from '../redux/Slice';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {applyFilter, filterDataAll} from '../common/FIlterData';
import RenderRoom2Column from '../component/RenderRoom2Column';
import RenderFilter from '../component/RenderFilter';
import row_filter_data from '../common/FilterRowData';
const Search = ({navigation}) => {
  const [filter, setFilter] = useState(false);
  const [totalFilter, setTotalFilter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [actualData, setActualData] = useState({});
  const [message, setMessage] = useState('Search rooms around you');
  const [recent, setRecent] = useState([]);
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.AllData.reviews);
  const filterData = useSelector(state => state.AllData.filterData);

  useEffect(() => {
    localStorageOp('', AsyncKeys.RECENT_SERCHES, '')
      .then(data => {
        setRecent(data);
      })
      .catch(() => {});
    dispatch(setFilterData(row_filter_data));
  }, []);

  useEffect(() => {
    let tmp = updateRating(roomData, reviews);
    setRoomData(tmp);
  }, [reviews]);

  useEffect(() => {
    let count = 0;
    filterData?.map(item => {
      if (item?.data?.some(item => item?.isApplied === true)) {
        count = count + 1;
      }
      setTotalFilter(count);
    });
  }, [filterData]);

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
            dispatch(setFilterData(row_filter_data));
            setActualData(res?.data);
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
            name={'filter'}
            size={hp(3.6)}
            color={Colors.PRIMARY}
          />
          <Text style={style.filterCount}>{totalFilter}</Text>
        </TouchableOpacity>
      </View>
    );
  };

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

  const onSearch = details => {
    getRooms(details?.geometry?.location);
    handleRecent(details);
  };

  const onPressClose = () => {
    setFilter(false);
    if (actualData?.length > 0) {
      let filerData1 = applyFilter(actualData, filterData);
      setRoomData(filerData1);
    }
  };
  return (
    <View style={StyleGlobel.containerStyle}>
      <Header label={Labels?.Search} navigation={navigation} />
      {/* <ScrollView> */}
      {loading && <LowOpacityLoader />}
      <GooglePlacesInput onSearch={onSearch} />
      <RenderFilter visible={filter} onPressClose={onPressClose} />
      <View style={style.containerList}>
        <RenderRecentSearch data={recent} onPress={handleRecentAPI} />
        {message && <Text style={style.message}>{message}</Text>}
        <RenderRoom2Column
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
  filterCount: {
    color: Colors.BLACK,
    position: 'absolute',
    backgroundColor: Colors.WHITE,
    borderRadius: hp(90),
    fontSize: RF(1),
    padding: hp(0.3),
    elevation: hp(1),
    right: hp(0.2),
  },
  message: {
    color: 'black',
    alignSelf: 'center',
    fontSize: RF(2),
    marginTop: '50%',
  },
});
