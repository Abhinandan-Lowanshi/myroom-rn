import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
} from 'react-native';
import {hp, RF} from '../common/CommonFunctions';
import Colors from '../common/Colors';
import Header from '../component/Header';
import Value from '../common/AboutUsData';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const AboutUs = ({navigation}) => {
  const onPress = item => {
    if (item?.type === 'GM') {
      if (item?.value) {
        Linking.openURL(`mailto:${item?.value}`);
      }
    } else {
      if (item?.value) {
        Linking.openURL(`https://www.instagram.com/${item?.value}/`);
      }
    }
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header label={'About Us'} navigation={navigation} />
      <ScrollView>
        {Value?.map((data, index) => {
          return (
            <View key={index} style={style.containerRow}>
              <View style={style.containerDot}>
                <View style={style.dot}></View>
                <Text style={style.headerText}>{data?.header}</Text>
              </View>
              {data?.value?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item?.id}
                    style={style.containerContent}
                    disabled={Platform.OS === 'android' ? !item?.type : true}
                    onPress={() => onPress(item)}>
                    <Text style={style.countText}>
                      {!item?.type ? index + 1 : ''}
                    </Text>
                    <MaterialCommunityIcons
                      style={style.icon}
                      size={hp(2.5)}
                      color={Colors.RED}
                      name={item?.icon}
                    />
                    <Text style={style.contentText(item?.type)}>
                      {item?.value}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AboutUs;
const style = StyleSheet.create({
  headerText: {
    color: Colors.PRIMARY,
    fontSize: RF(2.3),
    fontWeight: '600',
    marginLeft: hp(0.8),
  },
  contentText: (type = false) => ({
    alignSelf: 'center',
    flex: 0.94,
    color: Colors.BLACK1,
    fontWeight: type ? '600' : '400',
    fontSize: type ? RF(2) : RF(1.5),
    marginTop: hp(1),
    marginRight: hp(1),
  }),

  countText: {
    flex: 0.06,
    color: Colors.BLACK,
    fontWeight: '600',
    fontSize: RF(1.8),
    marginTop: hp(1),
    marginLeft: hp(2),
  },
  containerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
    marginTop: hp(1),
    marginRight: hp(1),
  },
  containerDot: {
    flexDirection: 'row',
    marginTop: hp(2),
    marginLeft: hp(2),
  },
  dot: {
    height: hp(1.3),
    width: hp(1.3),
    backgroundColor: Colors.PRIMARY,
    borderRadius: hp(90),
    alignSelf: 'center',
  },
  containerRow: {marginBottom: hp(2)},
});
