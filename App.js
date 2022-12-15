import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/Home';
import ScreenName from './src/common/ScreenName';
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenName.Home} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};
export default App;
