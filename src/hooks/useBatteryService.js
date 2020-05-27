import React from 'react';
import {fullUUID} from 'react-native-ble-plx';

import * as BP_Utils from '../utils/bleUtils';
import * as StorageUtils from '../utils/storageUtil';
import {Buffer} from 'buffer';
import Context from '../contexts/BP_BLE_Context';
export const BLE_BP_BATTERY_SERVICE = '180F';

const BATTERY_LEVEL_CHARACTERISTIC = '2A19';
export default function useBatteryService() {
  const {bleManager} = React.useContext(Context);

  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  const onReceiveBatteryValue = (error, batteryLevelChar) => {
    if (!error) {
      const batteryBuffer = Buffer.from(batteryLevelChar.value, 'base64');

      const batteryLevel = batteryBuffer.toString();
      setData({data: batteryLevel});
    } else {
      console.log(error);
      // setError(JSON.stringify(error));
    }
  };

  async function getBattery(deviceId) {
    console.log('getBattery');
    const subscribeToChanges = bleManager.monitorCharacteristicForDevice(
      deviceId,
      BLE_BP_BATTERY_SERVICE,
      BATTERY_LEVEL_CHARACTERISTIC,
      onReceiveBatteryValue,
    );
  }

  return {data, getBattery};
}
