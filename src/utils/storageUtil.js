import AsyncStorage from '@react-native-community/async-storage';

const BP_BLE_Registration = 'BP_BLE_Registration';
export const storeRegistration = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(BP_BLE_Registration, jsonValue);
  } catch (e) {
    // saving error
    console.log(e);
    throw e;
  }
};

export const getRegistration = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(BP_BLE_Registration);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
    console.log(e);
    throw e;
  }
};
export const removeRegistration = async () => {
  try {
    const jsonValue = await AsyncStorage.removeRegistration(
      BP_BLE_Registration,
    );
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
    console.log(e);
    throw e;
  }
};
