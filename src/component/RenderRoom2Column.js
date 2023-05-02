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
import data from '../common/SpinnerData';

const RenderRoom2Column = ({
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
  horizontal,
  moreVisible,
}) => {
  const LowOpacityText = ({
    label,
    container,
    textLabel,
    lowOpacityContainer,
    isTime,
  }) => {
    return (
      <View style={container}>
        <View style={[[style.lowOpacityContainer, lowOpacityContainer]]}></View>
        {isTime ? (
          <TimeAgo style={style.labelLow} time={label} />
        ) : (
          <Text style={[style.labelLow, textLabel]}>{label}</Text>
        )}
      </View>
    );
  };

  const getText = item => {
    let message = '';
    if (item?.rm_prking_avblity === data.ROOM_PARKING_AVAILABILITY[0]?.label) {
      message = 'Parking available';
    } else if (item?.rm_depndecy === data.ROOM_PARKING_AVAILABILITY[0]?.label) {
      message = 'Independent Room';
    } else if (
      item?.ROOM_STATUS_FR === data.ROOM_PARKING_AVAILABILITY[1]?.label
    ) {
      message = item?.ROOM_STATUS_FR;
    }
    return message;
  };
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
          {/* <View style={style.containerDate}>
            <LowOpacityText
              label={item?.rm_size}
              container={style.containerRent}
            />
            <LowOpacityText
              label={item?.created_at}
              container={style.containerRent}
              isTime={true}
            />
          </View> */}
        </View>
        <View style={style.containerInfo}>
          <Text style={style.labelName}>{item?.rm_own_Fullname}</Text>
          <Text style={style.labelAddress}>
            {`${item?.rm_house_no} ${item?.rm_colny} ${item?.rm_city}`}
          </Text>
          <View style={style.containerBottom}>
            <LowOpacityText
              label={item?.rm_size}
              lowOpacityContainer={style.containerAvailable}
              container={style.containerAvailable2}
              textLabel={style.labelAvailable}
            />
            {/* {getText(item) === '' ? null : (
              <LowOpacityText
                label={getText(item)}
                lowOpacityContainer={style.containerOptional}
                container={style.containerOptional2}
                textLabel={style.labelAvailable}
              />
            )} */}
            {true && <Text style={style.labelRent}>₹{item?.rm_rent}</Text>}
          </View>
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
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        numColumns={2}
        style={flat || {marginHorizontal: hp(1)}}
        refreshing={refreshing || false}
        onRefresh={onRefresh}
        data={myRoomList}
        renderItem={renderItem}
        horizontal={horizontal}
        maxToRenderPerBatch={5}
        ListFooterComponent={() => {
          if (moreVisible) {
            return (
              <TouchableOpacity>
                <Text
                  style={{
                    height: hp(5),
                    width: '70%',
                    color: Colors.WHITE,
                    fontWeight: '600',
                    backgroundColor: Colors.PRIMARY,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    alignSelf: 'center',
                    marginVertical: hp(2),
                    borderRadius: hp(1),
                  }}>
                  More
                </Text>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

export default RenderRoom2Column;

const style = StyleSheet.create({
  container: {
    width: '49%',
    backgroundColor: Colors.WHITE,
    marginTop: hp(0.5),
    flexDirection: 'column',
    borderRadius: hp(1),
    elevation: hp(0.5),
    marginHorizontal: hp(0.3),
    paddingBottom: hp(2),
    marginBottom: hp(1),
  },
  favImage: {
    right: hp(2),
    top: hp(2),
    position: 'absolute',
    elevation: hp(10),
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
    height: hp(30),
    borderRadius: 100,
  },
  labelRent: {
    color: 'green',
    fontSize: RF(2),
    fontWeight: '700',
    alignSelf: 'flex-end',
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
    borderBottomLeftRadius: hp(1),
    borderBottomRightRadius: hp(1),
  },
  lowOpacityContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: Colors.PRIMARY,
    opacity: 0.7,
    borderRadius: 5,
  },
  labelLow: {
    marginHorizontal: 8,
    marginVertical: 2,
    color: 'white',
  },
  containerRent: {
    borderRadius: 25,
    marginLeft: hp(1),
  },
  containerInfo: {marginHorizontal: hp(1.5)},
  labelName: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },
  labelAddress: {
    color: 'black',
    fontSize: 13,
    fontWeight: '400',
  },
  containerBottom: {
    flexDirection: 'row',
    marginTop: hp(1),
    justifyContent: 'space-between',
  },
  containerAvailable: {
    backgroundColor: Colors.PRIMARY,
    opacity: 0.2,
  },
  containerAvailable2: {
    borderRadius: 10,
  },
  labelAvailable: {
    color: 'black',
    fontSize: 10,
  },
  containerOptional: {
    backgroundColor: Colors.PRIMARY,
    opacity: 0.2,
  },
  containerOptional2: {
    borderRadius: 10,
    marginLeft: 20,
  },
  containerDate: {
    position: 'absolute',
    bottom: hp(2),
    flexDirection: 'row',
  },
});
