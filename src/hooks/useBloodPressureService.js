import React from 'react';
import {fullUUID, BleErrorCode} from 'react-native-ble-plx';

import Context from '../contexts/BP_BLE_Context';
import * as BP_Utils from '../utils/bleUtils';

export const BLE_BLOOD_PRESSURE_MEASURE_CHARACTERISTIC = '2A35';

const MonitorBloodPressureId = 'MonitorBloodPressure';
export default function useBloodPressureService(onReceiveBloodPressure) {
  const {bleManager, logError, logInfo} = React.useContext(Context);

  const [complete, setComplete] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const notificationSubscriptionRef = React.useRef(null);

  const _onReceiveBloodPressure = (_error, bloodChar) => {
    logInfo('useBloodPressureService: Received blood pressure notification:');
    if (!_error) {
      const bloodCharValue = bloodChar.value;
      logInfo(
        `useBloodPressureService: Blood pressure value (base64):${bloodCharValue}`,
      );

      const bloodMeasure = BP_Utils.parseBloodPressureMeasure(bloodCharValue);

      onReceiveBloodPressure(null, bloodMeasure);
    } else {
      setComplete(true);
      if (_error.errorCode === BleErrorCode.DeviceDisconnected) {
        logInfo(
          `useBloodPressureService: Blood pressure monitor disconnected: ${JSON.stringify(
            _error,
          )}`,
        );
        onReceiveBloodPressure('Disconnected', null);
      } else {
        logError(
          `useBloodPressureService: Received blood pressure notification error: ${JSON.stringify(
            _error,
          )}`,
        );
        setError(_error);
      }
    }
  };

  function getBloodPressureNotifications(deviceId) {
    logInfo('useBloodPressureService: Begin blood pressure notifications');
    try {
      notificationSubscriptionRef.current = bleManager.monitorCharacteristicForDevice(
        deviceId,
        fullUUID(BP_Utils.BLE_BLOOD_PRESSURE_SERVICE),
        fullUUID(BLE_BLOOD_PRESSURE_MEASURE_CHARACTERISTIC),
        _onReceiveBloodPressure,
        MonitorBloodPressureId,
      );
    } catch (err) {
      logError(
        `useBloodPressureService: Received blood pressure notification error: ${JSON.stringify(
          err,
        )}`,
      );
      setError(err);
    }
  }

  function cancelNotifications() {
    logInfo('useBloodPressureService: cancel blood pressure notifications');
    bleManager.cancelTransaction(MonitorBloodPressureId);
    if (notificationSubscriptionRef.current)
      notificationSubscriptionRef.current.remove();
  }

  return {complete, error, getBloodPressureNotifications, cancelNotifications};
}
