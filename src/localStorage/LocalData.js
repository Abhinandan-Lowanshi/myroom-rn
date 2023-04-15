import AsyncStorage from '@react-native-async-storage/async-storage';
const setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
export const clearAllData = () => {
  // AsyncStorage.getAllKeys()
  //   .then(keys => AsyncStorage.multiRemove(keys))
  //   .then(() => {
  //     return true;
  //   })
  //   .catch(() => {
  //     return false;
  //   });
};
const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const localStorageOp = (isSet = false, key, value) => {
  if (isSet) {
    setData(key, value);
  } else {
    return getData(key);
  }
};
export default localStorageOp;
