import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import ScreenName from '../common/ScreenName';

export const logout = navigation => {
  AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: ScreenName.Login}],
        }),
      );
      // return true;
    })
    .catch(error => {
      return false;
    });
};
