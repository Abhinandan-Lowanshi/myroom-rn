import messaging from '@react-native-firebase/messaging';
import localStorageOp from '../localStorage/LocalData';
import AsyncKeys from '../localStorage/AsyncKeys';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
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
      }
    })
    .catch(error => {});
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(async remoteMessage => {});

  messaging().onMessage(async remoteMessage => {});

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {});
};
