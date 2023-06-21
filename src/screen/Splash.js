import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import ScreenName from '../common/ScreenName';
import StyleGlobel from '../Style/StyleGlobel';
import localStorageOp from '../localStorage/LocalData';
import AsyncKeys from '../localStorage/AsyncKeys';
import {CommonActions} from '@react-navigation/native';
import {getAccountImfo} from '../redux/Slice';
import {useDispatch} from 'react-redux';
import {getFCMToken} from '../Utils/PushNotification';
const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getFCMToken();
    setTimeout(() => {
      localStorageOp('', AsyncKeys.USERDATA, '').then(res => {
        if (res?.data?.usr_id) {
          dispatch(getAccountImfo(res));
          console.log(res, 'navigation.navigate splash');

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ScreenName.TabComponent}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ScreenName.Login}],
            }),
          );
        }
      });
    }, 2000);
  }, []);
  return (
    <View style={StyleGlobel.containerStyle}>
      <Text style={{fontSize: 20}}>Splash</Text>
    </View>
  );
};

export default Splash;

// useEffect(() => {
//   localStorageOp('', AsyncKeys.DEFAULT_LOCATION, '')
//     .then(value => {
//       if (value) {
//         setTimeout(() => {
//           localStorageOp('', AsyncKeys.USERDATA, '').then(res => {
//             if (res?.data?.usr_id) {
//               dispatch(getAccountImfo(res));
//               console.log(res, 'navigation.navigate splash');

//               navigation.dispatch(
//                 CommonActions.reset({
//                   index: 0,
//                   routes: [{name: ScreenName.TabComponent}],
//                 }),
//               );
//             } else {
//               navigation.dispatch(
//                 CommonActions.reset({
//                   index: 0,
//                   routes: [{name: ScreenName.Login}],
//                 }),
//               );
//             }
//           });
//         }, 2000);
//       } else {
//         navigation.dispatch(
//           CommonActions.reset({
//             index: 0,
//             routes: [{name: ScreenName.AppSettings}],
//           }),
//         );
//       }
//     })
//     .catch(() => {
//       navigation.dispatch(
//         CommonActions.reset({
//           index: 0,
//           routes: [{name: ScreenName.AppSettings}],
//         }),
//       );
//     });
// }, []);
