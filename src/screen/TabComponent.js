import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Upload from './Upload';
import Fav from './Fav';
import MyAccount from './MyAccount';
import MyPost from './MyPost';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScreenName from '../common/ScreenName';
import AppLogo from '../component/applogo/AppLogo';

const Tab = createBottomTabNavigator();

const TabComponent = ({navigation}) => {
  return (
    <>
      <View style={style.headerContainer}>
        <AppLogo style={style.logo} textStyle={style.textStyle}></AppLogo>
        <View style={style.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenName.Search);
            }}>
            <Icon
              style={style.searchIcon}
              name="search1"
              color={Colors.PRIMARYLITE1}
              size={hp(2.8)}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon1
              style={style.notificationIcon}
              name="notifications-none"
              color={Colors.PRIMARYLITE1}
              size={hp(3)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarInactiveTintColor: Colors.PRIMARYLITE1,
        }}>
        <Tab.Screen
          options={{
            tabBarLabelStyle: {paddingBottom: hp(0.5)},
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size, focused}) => (
              <Icon
                name="home"
                color={focused ? Colors.PRIMARY : Colors.PRIMARYLITE1}
                size={size}
              />
            ),
          }}
          name={ScreenName.Home}
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: {paddingBottom: hp(0.5)},
            tabBarLabel: 'Upload',
            tabBarIcon: ({color, size, focused}) => (
              <Icon1
                name="cloud-upload"
                color={focused ? Colors.PRIMARYDARK : Colors.PRIMARYLITE1}
                size={size}
              />
            ),
          }}
          name={ScreenName.Upload}
          component={Upload}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: {paddingBottom: hp(0.5)},
            tabBarLabel: 'My Post',
            tabBarIcon: ({color, size, focused}) => (
              <Icon1
                name="post-add"
                color={focused ? Colors.PRIMARYDARK : Colors.PRIMARYLITE1}
                size={size}
              />
            ),
          }}
          name={ScreenName.MyPost}
          component={MyPost}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: {paddingBottom: hp(0.5)},
            tabBarLabel: 'Favorite',
            tabBarIcon: ({color, size, focused}) => (
              <Icon1
                name="favorite-border"
                color={focused ? Colors.PRIMARYDARK : Colors.PRIMARYLITE1}
                size={size}
              />
            ),
          }}
          name={ScreenName.Fav}
          component={Fav}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: {paddingBottom: hp(0.5)},
            tabBarLabel: 'My Account',
            tabBarIcon: ({color, size, focused}) => (
              <Icon2
                name="account-circle-outline"
                color={focused ? Colors.PRIMARYDARK : Colors.PRIMARYLITE1}
                size={size}
              />
            ),
          }}
          name={ScreenName.MyAccount}
          component={MyAccount}
        />
      </Tab.Navigator>
    </>
  );
};
export default TabComponent;

const style = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.WHITE,
    elevation: hp(1),
    alignItems: 'center',
    height: hp(5),
  },
  searchIcon: {alignSelf: 'flex-end', marginRight: hp(1)},
  notificationIcon: {alignSelf: 'flex-end', marginRight: hp(1.5)},
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textStyle: {fontSize: hp(2.8)},
  logo: {
    marginLeft: hp(2),
  },
});
