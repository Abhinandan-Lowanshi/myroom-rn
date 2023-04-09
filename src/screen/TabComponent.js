import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import UploadNavigator from './Upload';
import Fav from './Fav';
import MyAccount from './MyAccount';
import MapSearch from './MapSearch';
import ChatList from './Chat/ChatList';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../common/Colors';
import {hp} from '../common/CommonFunctions';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenName from '../common/ScreenName';
import AppLogo from '../component/applogo/AppLogo';
import {useDispatch, useSelector} from 'react-redux';
const Tab = createBottomTabNavigator();
import {setHomeNavigation} from '../redux/Slice';
import Labels from '../common/labels';
const TabComponent = ({navigation}) => {
  const loading = useSelector(state => state.AllData.loading);

  return (
    <>
      <View style={style.headerContainer}>
        <AppLogo style={style.logo} textStyle={style.textStyle} />
        {loading ? (
          <ActivityIndicator
            style={style.loaderHome}
            color={Colors.PRIMARY}
            size={hp(3)}></ActivityIndicator>
        ) : null}
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenName.Notification);
            }}>
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
            tabBarLabel: Labels.Home,
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
            tabBarLabel: Labels.Map,
            tabBarIcon: ({color, size, focused}) => (
              <Icon2
                name="map-legend"
                color={focused ? Colors.PRIMARY : Colors.PRIMARYLITE1}
                size={size}
              />
            ),
          }}
          name={ScreenName.MapSearch}
          component={MapSearch}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: {paddingBottom: hp(0.5)},
            tabBarLabel: Labels.Upload,
            tabBarIcon: ({color, size, focused}) => (
              <Icon1
                name="cloud-upload"
                color={focused ? Colors.PRIMARYDARK : Colors.PRIMARYLITE1}
                size={size}
              />
            ),
          }}
          name={ScreenName.UploadNavigator}
          component={UploadNavigator}
        />
        {/* <Tab.Screen
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
        /> */}
        {/* <Tab.Screen
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
        /> */}
        <Tab.Screen
          options={{
            tabBarLabelStyle: {paddingBottom: hp(0.5)},
            tabBarLabel: Labels.Chat,
            tabBarIcon: ({color, size, focused}) => (
              <Icon
                name="message1"
                color={focused ? Colors.PRIMARYDARK : Colors.PRIMARYLITE1}
                size={size}
              />
            ),
          }}
          name={ScreenName.ChatList}
          component={ChatList}
        />
        <Tab.Screen
          options={{
            tabBarLabelStyle: {paddingBottom: hp(0.5)},
            tabBarLabel: Labels.MyAccount,
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
  loaderHome: {
    marginLeft: hp(1),
  },
});
