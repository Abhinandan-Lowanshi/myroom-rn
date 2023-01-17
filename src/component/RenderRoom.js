import React from 'react';
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
import Custome_Image from './Custome_Image';
import Icon1 from 'react-native-vector-icons/FontAwesome';

const RenderRoom = ({myRoomList, isFromMyPost, onPress, onPressFav}) => {
  console.log(myRoomList, 'myRoomList line 13');
  return (
    <View>
      <FlatList
        data={myRoomList}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(item)}
              activeOpacity={0.8}
              //  activeOpacity={1}
              style={style.container}>
              {isFromMyPost && (
                <View style={style.innerContainer}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={style.activeContainer(item?.rm_status)}>
                    <Text style={style.labelActive}>
                      {item?.rm_status ? 'Active' : 'DeActive'}
                    </Text>
                  </TouchableOpacity>
                  <View style={style.containerEdit}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={style.innerContainerEdit}>
                      <Text style={style.labelEdit}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={style.containerDelete}>
                      <Text style={style.lableDelete}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <Custome_Image
                uri={item?.images[0]?.img_name}
                container={style.image}
              />
              <TouchableOpacity
                style={style.favImage}
                onPress={() => onPressFav(item)}>
                <Icon1
                  name={'heart'}
                  backgroundColor="red"
                  color={
                    item?.favorite_key === 'true' ? Colors.RED : Colors.WHITE
                  }
                  size={hp(4)}
                />
              </TouchableOpacity>

              {/* <Image
                source={{uri: item?.images[0]?.img_name}}
                style={style.image}></Image> */}
              <View style={style.containerRow}>
                <Text style={style.lableRow}>{item?.rm_size}</Text>
                <Text style={style.lableRow}>{item?.rm_availble}</Text>
                <Text style={style.lableRow}>{item?.rm_furnisd_status}</Text>
              </View>
              <View style={style.bottomContainer}>
                <View>
                  <Text style={style.labelAddress}>
                    {'Address  ' +
                      item?.rm_house_no +
                      ' ' +
                      item?.rm_colny +
                      ' ' +
                      item?.rm_city}
                  </Text>
                </View>
                <Text style={style.labelRent}>{'Rent  ' + item?.rm_rent}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default RenderRoom;

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // margin: hp(2),
    marginTop: hp(2),
    // borderRadius: hp(2),
    flexDirection: 'column',
    // shadowColor: '#52006A',
    // elevation: 20,
    // shadowOffset: {width: -2, height: 4},
    // shadowColor: '#171717',
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
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
    marginTop: hp(2),
    flexDirection: 'row',
  },
  activeContainer: isActive => ({
    backgroundColor: isActive ? 'green' : 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: hp(9),
    height: hp(2.2),
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
    height: hp(2.2),
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
    height: hp(2.2),
    borderRadius: hp(0.7),
    alignSelf: 'flex-end',
  },
  lableDelete: {
    color: 'white',
    alignSelf: 'center',
    fontSize: RF(1.2),
  },
  image: {
    height: hp(25),
    // borderBottomLeftRadius: hp(2),
    // borderBottomRightRadius: hp(2),
    // borderTopLeftRadius: hp(1.2),
    // borderTopRightRadius: hp(1.2),
  },
  bottomContainer: {
    marginHorizontal: hp(2),
    marginTop: hp(1),
  },
  labelAddress: {
    fontSize: RF(1.6),
    color: 'black',
  },
  labelRent: {
    fontSize: RF(1.6),
    color: 'green',
    marginBottom: hp(2),
  },
});
