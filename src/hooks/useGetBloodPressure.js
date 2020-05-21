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

  const onReceiveBloodPressure = (error, bloodChar) => {
    console.log('onReceiveBloodPressure', error, bloodChar);
    if (!error) {
      const bloodCharValue = bloodChar.value;
      console.log('bloodPressure', bloodCharValue);

      const bloodMeasure = BP_Utils.parseBloodPressureMeasure(bloodCharValue);

      setData({
        data: {
          bloodPressure: [
            ...(data ? data.bloodPressure : []),
            {
              userIndex: bloodMeasure.userIndex,
              systolic: bloodMeasure.systolic,
              diastolic: bloodMeasure.diastolic,
              timeStamp: bloodMeasure.timeStamp,
              pulseRate: bloodMeasure.pulseRate,
            },
          ],
        },
      });
    }
  };

  async function getBloodPressure(deviceId) {
    console.log('getBattery');
    const subscribeToChanges = bleManager.monitorCharacteristicForDevice(
      deviceId,
      fullUUID(BP_Utils.BLE_BLOOD_PRESSURE_SERVICE),
      fullUUID(BP_Utils.BLE_BLOOD_PRESSURE_MEASURE_CHARACTERISTIC),
      onReceiveBloodPressure,
    );
  }

  return {data, getBloodPressure};
};
