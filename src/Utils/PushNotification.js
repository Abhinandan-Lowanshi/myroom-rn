import messaging from '@react-native-firebase/messaging';
import localStorageOp from '../localStorage/LocalData';
import AsyncKeys from '../localStorage/AsyncKeys';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const getFCMToken = async () => {
  localStorageOp('', AsyncKeys.FCMToken, '')
    .then(data => {
      if (!data) {
        messaging()
          .getToken()
          .then(fcmToken => {
            localStorageOp(true, AsyncKeys.FCMToken, {token: fcmToken});
          })
          .catch(() => {});
      } else {
        console.log(data, 'getFCMToken');
      }
    })
    .catch(error => {
      console.log(error, 'error');
    });
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(remoteMessage, 'onNotificationOpenedApp');
  });
  messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage, 'onMessage');
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log(remoteMessage, 'getInitialNotification');
    });
};
