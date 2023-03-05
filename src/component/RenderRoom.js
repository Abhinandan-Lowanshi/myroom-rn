import React, {useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import Colors from '../common/Colors';
import Custom_Image from './Custom_Image';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import TimeAgo from 'react-native-timeago';
const RenderRoom = ({
  myRoomList,
  isFromMyPost,
  onPress,
  onPressFav,
  refreshing,
  onRefresh,
  onPressActive,
  onPressDelete,
  onPressEdit,
  container,
  flat,
}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        activeOpacity={0.8}
        style={[style.container, container]}>
        {isFromMyPost && (
          <View style={style.innerContainer}>
            <TouchableOpacity
              onPress={() => onPressActive(item)}
              activeOpacity={0.7}
              style={style.activeContainer(item?.rm_status)}>
              <Text style={style.labelActive}>
                {item?.rm_status ? 'Active' : 'DeActive'}
              </Text>
            </TouchableOpacity>
            <View style={style.containerEdit}>
              <TouchableOpacity
                onPress={() => onPressEdit(item)}
                activeOpacity={0.7}
                style={style.innerContainerEdit}>
                <Text style={style.labelEdit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onPressDelete(item?.rm_pkey)}
                activeOpacity={0.7}
                style={style.containerDelete}>
                <Text style={style.labelDelete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View>
          <Custom_Image
            uri={item?.images[0]?.img_name}
            container={style.imageContainer}
            imageStyle={style.image}
          />
        </View>
        {!isFromMyPost && (
          <TouchableOpacity
            style={style.favImage}
            onPress={() =>
              onPressFav({roomId: item?.rm_pkey, like: !item?.favorite_key})
            }>
            <Icon1
              name={'heart'}
              backgroundColor="red"
              color={item?.favorite_key === true ? Colors.RED : Colors.WHITE}
              size={hp(3)}
            />
          </TouchableOpacity>
        )}

        <View style={style.bottomContainer}>
          <View style={style.rentContainer}>
            <Text style={style.labelAddress}>
              {'Address  ' +
                item?.rm_house_no +
                ' ' +
                item?.rm_colny +
                ' ' +
                item?.rm_city}
            </Text>
            <Text style={style.labelRent}>{`\u20B9${item?.rm_rent}/m`}</Text>
          </View>
          <View style={style.containerTime}>
            <TimeAgo style={style.timestamp} time={item?.created_at} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        style={flat || {width: '100%'}}
        refreshing={refreshing || false}
        onRefresh={onRefresh}
        data={myRoomList}
        renderItem={renderItem}
      />
    </View>
  );
};

export default RenderRoom;

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: hp(0.5),
    flexDirection: 'column',
    borderRadius: hp(1),
    elevation: hp(1),
    marginHorizontal: hp(0.2),
    paddingBottom: hp(2),
    marginBottom: hp(1),
  },
  rentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lableRow: {
    fontSize: RF(1.2),
    color: Colors.BLACK,
  },
  favImage: {
    right: hp(2),
    top: hp(2),
    position: 'absolute',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(1.1),
  },
  innerContainer: {
    position: 'absolute',
    zIndex: 1000,
    marginHorizontal: hp(3),
    marginTop: hp(1.5),
    flexDirection: 'row',
  },
  activeContainer: isActive => ({
    backgroundColor: isActive ? 'green' : 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: hp(9),
    height: hp(2.7),
    borderRadius: hp(0.7),
  }),
  labelActive: {
    color: 'white',
    alignSelf: 'center',
    fontSize: RF(1.2),
  },
  containerEdit: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  innerContainerEdit: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: hp(7),
    height: hp(2.7),

    borderRadius: hp(0.7),
    alignSelf: 'flex-end',
    marginRight: hp(2),
    elevation: hp(1),
  },
  labelEdit: {
    color: 'black',
    alignSelf: 'center',
    fontSize: RF(1.2),
  },
  containerDelete: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: hp(8),
    height: hp(2.7),
    borderRadius: hp(0.7),
    alignSelf: 'flex-end',
  },
  labelDelete: {
    color: 'white',
    alignSelf: 'center',
    fontSize: RF(1.2),
  },
  imageContainer: {
    height: hp(25),
    borderRadius: 100,
  },
  bottomContainer: {
    marginHorizontal: hp(2),
    // marginTop: hp(1),
  },
  labelAddress: {
    fontSize: RF(1.6),
    color: 'black',
    maxWidth: '70%',
  },
  labelRent: {
    fontSize: RF(2),
    color: 'green',
  },
  timestamp: {
    color: Colors.BLACK,
  },
  containerTime: {
    // backgroundColor: Colors.PRIMARY,
    padding: hp(0.5),
    borderRadius: hp(0.6),
    // marginTop: hp(1),
    marginLeft: hp(1),
  },
  image: {
    flex: 1,
    borderTopEndRadius: 7,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: hp(3),
    borderBottomRightRadius: hp(3),
  },
});
