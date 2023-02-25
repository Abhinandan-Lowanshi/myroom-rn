// import messaging from '@react-native-firebase/messaging';
// import AsyncKeys from '../localStorage/AsyncKeys';
// import localStorageOp from '../localStorage/LocalData';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFCMToken();
//   }
// }

// const getFCMToken = async () => {
//   let fcmToken = null;
//   localStorageOp(false, AsyncKeys.FCMToken).then(token => {
//     console.log(token, 'fcmToken');
//   });

//   if (!fcmToken) {
//     try {
//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//         console.log(fcmToken, 'fcmToken');
//         localStorageOp(true, AsyncKeys.FCMToken, fcmToken);
//       }
//     } catch (error) {
//       console.log('fcmTokenerror', error);
//     }
//   }
// };

// export const notificationListener = async () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });

//   messaging.onMessage(async remoteMessage => {
//     console.log(
//       'Notification caused app to open from Foreground state:',
//       remoteMessage.notification,
//     );
//   });
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });
// };
