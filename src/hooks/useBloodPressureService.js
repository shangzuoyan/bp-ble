import React from 'react';
import {fullUUID} from 'react-native-ble-plx';

import Context from '../contexts/BP_BLE_Context';

import * as BP_Utils from '../utils/bleUtils';

export const BLE_BLOOD_PRESSURE_MEASURE_CHARACTERISTIC = '2A35';

export default function useBloodPressureService(onReceiveBloodPressure) {
  const {bleManager, logError, logInfo, logWarn} = React.useContext(Context);

  const [complete, setComplete] = React.useState(false);

  const _onReceiveBloodPressure = (_error, bloodChar) => {
    logInfo(
      `useBloodPressureService: Received blood pressure notification: ${bloodChar}(Base64)`,
    );
    if (!_error) {
      const bloodCharValue = bloodChar.value;
      const bloodMeasure = BP_Utils.parseBloodPressureMeasure(bloodCharValue);
      onReceiveBloodPressure(null, bloodMeasure);
    } else {
      logError(
        `useBloodPressureService: Received blood pressure notification error: ${_error}`,
      );
      setComplete(true);
      onReceiveBloodPressure('Disconnected', null);
    }
  };

  function getBloodPressureNotifications(deviceId) {
    logInfo('useBloodPressureService: Begin blood pressure notifications');
    const subscription = bleManager.monitorCharacteristicForDevice(
      deviceId,
      fullUUID(BP_Utils.BLE_BLOOD_PRESSURE_SERVICE),
      fullUUID(BLE_BLOOD_PRESSURE_MEASURE_CHARACTERISTIC),
      _onReceiveBloodPressure,
    );
  }

  return {complete, getBloodPressureNotifications};
}
