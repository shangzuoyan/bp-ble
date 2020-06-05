import React, {useEffect} from 'react';

import {
  NEW_BLOOD_PRESSURE_SYNC,
  NEW_BLOOD_PRESSURE_READING,
  SYNC_COMPLETE,
} from '../reducers/bloodPressureReducer';

import BloodPressureContext from '../contexts/BloodPressureContext';
import LogContext from '../contexts/LogContext';

import useConnection from '../hooks/useConnection';
// import useBattery from '../hooks/useBatteryService';
// import useTime from '../hooks/useTimeService';
import useBloodPressureService from '../hooks/useBloodPressureService';

import Error from './Error';
import Loading from './Loading';
import Success from './Success';

import * as BP_Utils from '../utils/bleUtils';

let connectionTimeout;
let notificationTimeout;
export default function SyncContainer({onCancel, onSuccess}) {
  const [{device}, dispatch] = React.useContext(BloodPressureContext);
  const {error: logError, info: logInfo} = React.useContext(LogContext);

  const [timeoutError, setTimeoutError] = React.useState(undefined);

  const {
    connect,
    disconnect,
    error: errorConnecting,
    loading: connecting,
    data: connectionResult,
    bluetoothState,
  } = useConnection();
  // const {data: batteryLevel, getBattery} = useBattery();
  // const {data: time, getTime} = useTime();
  const {
    complete,
    error: bloodPressureServiceError,
    getBloodPressureNotifications,
    cancelNotifications,
  } = useBloodPressureService(bloodPressureReceiveHandler);
  const [startedBloodPressure, setStartedBloodPressure] = React.useState(false);

  useEffect(() => {
    logInfo(
      `SyncContainer: Beginning Connect to monitor with id: ${device.id}`,
    );

    connect(device.id);
    dispatch({
      type: NEW_BLOOD_PRESSURE_SYNC,
      payload: {timeSyncStarted: new Date()},
    });

    //If connection is taking too long
    connectionTimeout = setTimeout(() => {
      logError(
        `SyncContainer: Timout attempting to connect to monitor with id: ${device.id}`,
      );
      setTimeoutError(
        `Timout attempting to connect to monitor with id: ${device.id}`,
      );
      disconnect(device.id);
    }, (BP_Utils.BLE_CONNECTION_TIMEOUT_IN_SECONDS + 10) * 1000);
  }, [device]);

  useEffect(() => {
    if (connectionResult && connectionResult.success && !startedBloodPressure) {
      logInfo(
        `SyncContainer: Subscribe to notifications from monitor with id: ${device.id}`,
      );
      clearTimeout(connectionTimeout);

      setStartedBloodPressure(true);
      // getBattery(device.id);
      getBloodPressureNotifications(device.id);
      // getTime(device.id);
      notificationTimeout = setTimeout(() => {
        logError(
          `SyncContainer: Timout waiting for blood pressure notification from monitor with id: ${device.id}`,
        );
        setTimeoutError(
          `Timout waiting for blood pressure notification from monitor with id: ${device.id}`,
        );
        disconnect(device.id);
      }, BP_Utils.BLE_TIMEOUT_IN_SECONDS * 1000);
    }
  }, [connectionResult, device]);

  function bloodPressureReceiveHandler(error, bloodPressureValue) {
    logInfo(
      `SyncContainer: Received notification from monitor with id: ${
        device.id
      }.  Blood Pressure value: ${JSON.stringify(
        bloodPressureValue,
      )}. Error: ${error}`,
    );
    clearTimeout(notificationTimeout);

    if (!error) {
      if (bloodPressureValue) {
        dispatch({
          type: NEW_BLOOD_PRESSURE_READING,
          payload: bloodPressureValue,
        });
      }
    } else {
      dispatch({
        type: SYNC_COMPLETE,
      });
    }
  }
  if (errorConnecting || timeoutError || bloodPressureServiceError) {
    clearTimeout(connectionTimeout);
    clearTimeout(notificationTimeout);
    return (
      <Error
        onClose={onCancel}
        error={errorConnecting || timeoutError || bloodPressureServiceError}
        message="Cannot connect to blood pressure monitor"
      />
    );
  }

  if (complete) {
    return (
      <Success
        onClose={onSuccess}
        message="Congratulations!  You have synced the blood pressure monitor with your app!"
      />
    );
  }

  return <Loading message="Syncing blood pressure readings." />;
}
