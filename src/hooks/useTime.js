import React from 'react';
import {fullUUID} from 'react-native-ble-plx';

import * as BP_Utils from '../utils/bleUtil';
import * as StorageUtils from '../utils/storageUtil';
import {Buffer} from 'buffer';
import Context from '../contexts/BP_BLE_Context';

const BATTERY_LEVEL_CHARACTERISTIC = '2A19';
export default () => {
  const {bleManager} = React.useContext(Context);

  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  const onReceiveTimeValue = (error, timeChar) => {
    console.log('onReceiveonReceiveBatteryValueBloodPressure', error, timeChar);
    console.log('Current time', timeChar);
    if (!error) {
      const timeBuffer = Buffer.from(timeChar.value, 'base64');

      const timeValue = timeBuffer.toString();
      setData({data: timeValue});
    } else {
      console.log(error);
      // setError(JSON.stringify(error));
    }
  };

  async function getTime(deviceId) {
    console.log('getBattery');
    const subscribeToChanges = bleManager.monitorCharacteristicForDevice(
      deviceId,
      fullUUID('1805'),
      fullUUID('2A2B'),
      onReceiveTimeValue,
    );
  }

  return {data, getTime};
};
