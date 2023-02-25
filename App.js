import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/Home';
import Login from './src/screen/Login';
import SignUp from './src/screen/SignUp';
import ForgotPassword from './src/screen/ForgotPassword';
import TabComponent from './src/screen/TabComponent';
import ScreenName from './src/common/ScreenName';
import {store} from './src/redux/store';
import Search from './src/screen/Search';
import Splash from './src/screen/Splash';
import EmailVerify from './src/screen/EmailVerify';
import EditProfile from './src/screen/EditProfile';
import DetailsScreen from './src/screen/DetailsScreen';
import MyPost from './src/screen/MyPost';
import ChangePassword from './src/screen/ChangePassword';
import {Provider} from 'react-redux';
import UploadFormSTP2 from './src/screen/UploadFormSTP2';
import localStorageOp from './src/localStorage/LocalData';
import Notification from './src/screen/Notification';
// import {
//   requestUserPermission,
//   notificationListener,
// } from './src/Utils/notificationServices';
const Stack = createNativeStackNavigator();
const App = () => {
  //   useEffect(() => {
  //     requestUserPermission();
  //     notificationListener();
  //   }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={ScreenName.Splash} component={Splash} />
          <Stack.Screen name={ScreenName.Login} component={Login} />
          <Stack.Screen name={ScreenName.Home} component={HomeScreen} />
          <Stack.Screen name={ScreenName.SignUp} component={SignUp} />
          <Stack.Screen name={ScreenName.EmailVerify} component={EmailVerify} />
          <Stack.Screen
            name={ScreenName.ForgotPassword}
            component={ForgotPassword}
          />

          <Stack.Screen
            name={ScreenName.TabComponent}
            component={TabComponent}
          />
          <Stack.Screen name={ScreenName.MyPost} component={MyPost} />
          <Stack.Screen name={ScreenName.EditProfile} component={EditProfile} />
          <Stack.Screen
            name={ScreenName.Notification}
            component={Notification}
          />
          <Stack.Screen
            name={ScreenName.changePassword}
            component={ChangePassword}
          />
          <Stack.Screen
            name={ScreenName.UploadFormSTP2}
            component={UploadFormSTP2}
          />
          <Stack.Screen name={ScreenName.Search} component={Search} />
          <Stack.Screen
            name={ScreenName.DetailsScreen}
            component={DetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
