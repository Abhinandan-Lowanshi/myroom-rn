import React from 'react';
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
import {Provider} from 'react-redux';
const Stack = createNativeStackNavigator();
const App = () => {
  console.log('DATATATTAA');

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {/* <Stack.Screen name={ScreenName.Splash} component={Splash} />
          <Stack.Screen name={ScreenName.Login} component={Login} />
          <Stack.Screen name={ScreenName.Home} component={HomeScreen} />
          <Stack.Screen name={ScreenName.SignUp} component={SignUp} />
          <Stack.Screen name={ScreenName.EmailVerify} component={EmailVerify} />
          <Stack.Screen
            name={ScreenName.ForgotPassword}
            component={ForgotPassword}
          /> */}

          <Stack.Screen
            name={ScreenName.TabComponent}
            component={TabComponent}
          />
          <Stack.Screen name={ScreenName.Search} component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
