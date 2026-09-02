import React from 'react';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import Colors from '../common/Colors';
const AllRooms = () => {
  const [data, setData] = React.useState({});
  const tokyoRegion = {
    latitude: 22.757,
    longitude: 75.8775,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  const latlon = [
    {
      latitude: 22.757,
      longitude: 75.8775,
      area: 'Hera nagar thana',
      uri: 'https://source.unsplash.com/user/c_v_r/1900x800',
    },
    {
      latitude: 22.7533,
      longitude: 75.8937,
      area: 'Vijay nagar',
      uri: 'https://source.unsplash.com/user/c_v_r/1600×900',
    },
    {
      latitude: 22.7594,
      longitude: 75.8664,
      area: 'Veena nagar',
      uri: 'https://source.unsplash.com/user/c_v_r/1900x800',
    },
    {
      latitude: 22.7641,
      longitude: 75.8704,
      area: 'Mr 10',
      uri: 'https://source.unsplash.com/user/c_v_r/1600×900',
    },
  ];

  return (
    <View style={{}}>
      <FlatList
        data={latlon}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              //  activeOpacity={1}
              style={{
                backgroundColor: 'white',
                margin: 10,
                borderRadius: 10,
                flexDirection: 'column',
                shadowColor: '#52006A',
                elevation: 20,
                shadowOffset: { width: -2, height: 4 },
                shadowColor: '#171717',
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                  marginHorizontal: 15,
                  marginTop: 8,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 17,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: 'white', alignSelf: 'center', fontSize: 10 }}>
                    Active
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignSelf: 'flex-end',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      backgroundColor: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 17,
                      borderRadius: 5,
                      alignSelf: 'flex-end',
                      marginRight: 8,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        alignSelf: 'center',
                        fontSize: 10,
                      }}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 17,
                      borderRadius: 5,
                      alignSelf: 'flex-end',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        alignSelf: 'center',
                        fontSize: 10,
                      }}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 180,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}></Image>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 5,
                }}>
                <Text style={{ fontSize: 9, color: Colors.BLACK }}>DemoText</Text>
                <Text style={{ fontSize: 9, color: Colors.BLACK }}>
                  DemoText no 2
                </Text>
                <Text style={{ fontSize: 9, color: Colors.BLACK }}>
                  Demo no 3 ........
                </Text>
              </View>
              <View style={{ marginHorizontal: 15, marginTop: 3 }}>
                <View>
                  <Text style={{ fontSize: 12, color: 'black' }}>
                    {item.body}
                  </Text>
                </View>
                <Text style={{ color: 'green', marginBottom: 12 }}>$12000</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AllRooms;
