import EndPoints from './EndPoints';
import localStorageOp from '../localStorage/LocalData';
import {Platform} from 'react-native';
import AsyncKeys from '../localStorage/AsyncKeys';
const sendRequest = async (payload, endPoint, method) => {
  try {
    let temp = {...payload};
    var userData = await localStorageOp(false, AsyncKeys.USERDATA, '');
    if (payload?.user_id) {
      temp = {...temp, user_id: userData?.data?.usr_id};
    }
    const response = await fetch(EndPoints.baseUrl + endPoint, {
      method: method,
      headers: {
        Authorization: `Bearer ${userData?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(temp),
    });
    const data = await response.json();
    return data;
  } catch (e) {}
};

export const uploadImage = async (payload, endPoint, method) => {
  try {
    // let temp = {...payload};
    // var userData = await localStorageOp(false, AsyncKeys.USERDATA, '');
    // if (payload?.user_id) {
    //   temp = {...temp, user_id: userData?.data?.usr_id};
    // }
    console.log(payload, 'payload');
    var userData = await localStorageOp(false, AsyncKeys.USERDATA, '');

    const response = await fetch(EndPoints.baseUrl + endPoint, {
      method: method,
      headers: {
        Authorization: `Bearer ${userData?.token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: payload,
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e, 'error');
  }
};
export default sendRequest;
