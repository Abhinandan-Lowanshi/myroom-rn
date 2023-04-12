import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FullScreenLoader from '../component/FullScreenLoader';
import {useSelector, useDispatch} from 'react-redux';
import {startL, updateHome} from '../redux/Slice';
import StyleGlobel from '../Style/StyleGlobel';
import getLocation from '../geoLocation/GetLocation';
import sendRequest from '../networking/ApiFunctions';
import RenderRoom from '../component/RenderRoom';
import EndPoints from '../networking/EndPoints';
import {setRoomDataHome, updateFav, setSearchUpdate} from '../redux/Slice';
import ScreenName from '../common/ScreenName';
import {favFunction} from '../common/APIFunctions';
import {useIsFocused} from '@react-navigation/native';
import NodataFound from '../component/NodataFound';
import {ImageSlider} from 'react-native-image-slider-banner';
import {RF, hp} from '../common/CommonFunctions';
import LowOpacityLoader from '../component/LowOpacityLoader';
import Toast from 'react-native-simple-toast';
import {LogBox} from 'react-native';
import images from '../common/images';
import SliderView from '../component/sliderView/SliderView';
import {filterDataAll, filterRoom, getRoomCount} from '../common/FIlterData';
import Colors from '../common/Colors';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AsyncKeys from '../localStorage/AsyncKeys';
import localStorageOp from '../localStorage/LocalData';

const Home = ({route, navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filterList, setFilterList] = useState(filterDataAll);
  const [error, setError] = useState({error: '', header: ''});
  const data = useSelector(state => state.AllData.locationInfo);
  const favUpdate = useSelector(state => state.AllData.isFavUpdate);
  const searchUpdate = useSelector(state => state.AllData.searchUpdate);
  const roomDataHome = useSelector(state => state.AllData.roomDataHome);
  const currentLocationName = useSelector(
    state => state.AllData.currentLocationName,
  );
  const accountData = useSelector(state => state.AllData.accountData);
  console.log(currentLocationName, 'currentLocationName');
  const dispatch = useDispatch();
  let counter = 10;
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('UseEffect');
    if (searchUpdate) {
      dispatch(startL(true));
      getData();
      dispatch(setSearchUpdate(false));
    }
  }, [searchUpdate]);

  useEffect(() => {
    if (favUpdate) {
      dispatch(startL(true));
      getData();
      dispatch(updateFav(false));
    }
  }, [isFocused]);
  useEffect(() => {
    console.log(data, 'isFocuseduseEffect');
    setLoading(true);
    getData();
  }, [data]);
  const onPressRoom = item => {
    navigation.navigate(ScreenName.DetailsScreen, {
      item,
      onPressFav,
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'Non-serializable values were found in the navigation state',
    ]);
  }, []);

  const calculateRoomCount = (filter, rooms) => {
    let temp = getRoomCount(filter, rooms);
    if (temp) {
      temp.map(item => {
        if (item?.id === 7) {
          return (item.availableRooms = rooms?.length);
        } else return item;
      });
      console.log(temp, 'calculateRoomCount');
      setFilterList(temp);
    }
  };
  const onReload = () => {
    setLoading(true);
    getData();
  };
  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };
  const performFavOp = data => {
    let temp = JSON.parse(JSON.stringify(roomDataHome));
    temp.map(item => {
      if (item?.rm_pkey === data?.roomId) {
        return (item.favorite_key = data?.like);
      } else return item;
    });
    let tempFil = JSON.parse(JSON.stringify(filteredData));
    tempFil.map(item => {
      if (item?.rm_pkey === data?.roomId) {
        return (item.favorite_key = data?.like);
      } else return item;
    });
    setFilteredData(tempFil);
    console.log(tempFil, 'tempFil');
    dispatch(setRoomDataHome(temp));
  };

  const showToast = message => {
    Toast.show(message, Toast.LONG);
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
          setIsUpdate(!isUpdate);
          dispatch(updateHome(true));
          showToast(response?.message);
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

  const prepareData = data => {
    let arr = data;
    if (data.length > 0) {
    }
    return arr;
  };
  const getData = () => {
    setIsFailed(false);
    if (data.longitude && data.latitude) {
      console.log(data.longitude, data.latitude, 'data.longitude');
      sendRequest(
        {
          user_id: 'Dummy',
          latitude: data.latitude,
          longitude: data.longitude,
          radius: 10,
        },
        EndPoints.findRoom,
        'POST',
      )
        .then(res => {
          setLoading(false);
          setRefreshing(false);
          dispatch(startL(false));
          if (res.status === true) {
            console.log(res.data.length, 'res');
            if (res.data.length > 0) {
              dispatch(setRoomDataHome(prepareData(res?.data)));
              calculateRoomCount(filterDataAll, res?.data);
              setFilteredData(res?.data);
            } else {
              setError({
                error:
                  'No rooms find at your location \n You can also search nearby rooms by Area name ',
                header: 'Sorry!',
              });
              setIsFailed(true);
            }
          } else {
            setIsFailed(true);
            setError({
              error: res.message,
              header: '',
            });
          }
        })
        .catch(err => {
          setLoading(false);
          setIsFailed(true);
          setRefreshing(false);
          dispatch(startL(false));
          setError({
            error: '',
            header: '',
          });
        });
    }
  };

  const gotoUpload = () => {
    navigation.navigate(ScreenName.UploadNavigator);
  };

  const gotoSearch = () => {
    navigation.navigate(ScreenName.Search);
  };

  const checkFilterApplied = () => {
    return filterList?.some(item => {
      return item?.isApplied === true;
    });
  };

  const checkLastFilter = item => {
    if (item?.isApplied === true) {
      let count = 0;
      filterList?.forEach(item => {
        if (item?.isApplied === true) {
          count = count + 1;
        }
      });
      if (count > 1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  const manageFilter = item => {
    if (item?.id === 7 || checkLastFilter(item)) {
      setFilteredData(roomDataHome);
      let temp = JSON.parse(JSON.stringify(filterList));
      temp?.map(item1 => {
        return (item1.isApplied = false);
      });
      temp[0].isApplied = true;
      setFilterList(temp);
    } else {
      let tempSearchRoom = [];
      let temp = JSON.parse(JSON.stringify(filterList));
      temp?.map(item1 => {
        if (item1?.id === item?.id) {
          item1.isApplied = !item1?.isApplied;
        }
        return item1;
      });
      temp[0].isApplied = false;
      setFilterList(temp);
      tempSearchRoom = filterRoom(temp, roomDataHome);
      setFilteredData(tempSearchRoom);
    }
  };

  const filterRender = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={style.containerFilter(item?.isApplied)}
          onPress={() => {
            if (item?.availableRooms > 0) {
              manageFilter(item);
            } else {
              Toast.show(`No room Available for filter ${item?.value}`);
            }
          }}>
          <Text style={style.labelFilter}>{item?.value}</Text>
        </TouchableOpacity>
        <View style={style.containerCount}>
          <Text style={style.labelCount}>{item?.availableRooms}</Text>
        </View>
      </>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={StyleGlobel.containerStyle}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {getLocation()}
      <View style={style.locationNameContainer}>
        <View style={style.innerContainerName}>
          <MaterialIcons
            size={hp(2.5)}
            color={Colors.PRIMARY}
            name={'my-location'}
            style={style.iconLOcation}
          />
          <Text style={style.labelOwnerName}>
            {`Welcome ${accountData?.data?.usr_firstName}`}
          </Text>
        </View>
        <Text style={style.labelLocation}>
          1017, Sukhlia, Pandit Dindayal Upadhyay Nagar, Ward 11, Indore, Madhya
          Pradesh 452015, India
        </Text>
      </View>
      <SliderView
        isFocused={isFocused}
        onPresUpload={() => {
          gotoUpload();
        }}
        onPresSearch={() => {
          gotoSearch();
        }}
      />
      {filteredData?.length > 0 ? (
        <FlatList
          horizontal
          data={filterList}
          renderItem={filterRender}
          style={style.filterFlatlist}
        />
      ) : null}
      {loading ? (
        <LowOpacityLoader />
      ) : isFailed ? (
        <NodataFound message={error.error} header={error.header} />
      ) : (
        <View style={{marginHorizontal: hp(1)}}>
          {filteredData?.length > 0 ? (
            <RenderRoom
              myRoomList={filteredData}
              onPress={onPressRoom}
              onPressFav={onPressFav}
              refreshing={false}
            />
          ) : null}
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
const style = StyleSheet.create({
  containerFilter: isApplied => ({
    backgroundColor: isApplied ? Colors.PRIMARY : Colors.PRIMARYLITE,
    height: hp(7),
    width: hp(7),
    borderRadius: hp(90),
    marginHorizontal: hp(0.4),
    justifyContent: 'center',
    marginVertical: hp(1),
  }),
  labelFilter: {
    color: Colors.WHITE,
    alignSelf: 'center',
    fontSize: RF(1.3),
  },
  labelCount: {
    color: Colors.BLACK,
    alignSelf: 'center',
    marginHorizontal: hp(0.7),
    marginVertical: hp(0.3),
    fontSize: RF(1.3),
  },
  containerCount: {
    borderRadius: hp(90),
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: hp(1),
    right: hp(2),
    elevation: hp(2),
  },
  filterFlatlist: {
    maxHeight: hp(9),
    marginHorizontal: hp(1),
  },
  locationNameContainer: {
    marginHorizontal: hp(1.2),
    marginBottom: hp(2),
  },
  labelOwnerName: {
    color: Colors.BLACK,
    fontSize: RF(2.2),
    marginLeft: hp(0.4),
    fontWeight: '600',
  },
  labelLocation: {
    color: Colors.BLACK,
    fontSize: RF(1.4),
    fontWeight: '600',
  },
  iconLOcation: {},
  iconArrow: {},
  innerContainerName: {
    flexDirection: 'row',
    marginTop: hp(1),
  },
});
