import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/Home';
import Login from './src/screen/Login';
import SignUp from './src/screen/SignUp';
import ForgotPassword from './src/screen/ForgotPassword';
import ScreenName from './src/common/ScreenName';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {/* <Stack.Screen name={ScreenName.Home} component={HomeScreen} /> */}
          <Stack.Screen name={ScreenName.Login} component={Login} />
          <Stack.Screen name={ScreenName.SignUp} component={SignUp} />
          <Stack.Screen name={ScreenName.ForgotPassword} component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
