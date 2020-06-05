import React, {useEffect} from 'react';

import {
  DEVICE_IS_PAIRED,
  NEW_BLOOD_PRESSURE_SYNC,
  NEW_BLOOD_PRESSURE_READING,
  SYNC_COMPLETE,
} from '../reducers/bloodPressureReducer';

import BloodPressureContext from '../contexts/BloodPressureContext';
import LogContext from '../contexts/LogContext';

// import useBattery from '../hooks/useBatteryService';
import useConnection from '../hooks/useConnection';
import useDeviceInformationService from '../hooks/useDeviceInformationService';
import useBloodPressureService from '../hooks/useBloodPressureService';
// import useTime from '../hooks/useTimeService';
// import useUserIndex from '../hooks/useUserIndex';

import Error from './Error';
import Loading from './Loading';
import Success from './Success';

import * as BP_Utils from '../utils/bleUtils';

let connectionTimeout;
let notificationTimeout;

export default function RegisterContainer({onCancel, onSuccess, device}) {
  const [state, dispatch] = React.useContext(BloodPressureContext);
  const {error: logError, info: logInfo} = React.useContext(LogContext);
  const [timeoutError, setTimeoutError] = React.useState(undefined);
  const {
    connect,
    error: errorConnecting,
    loading: connecting,
    data: connectionResult,
    disconnect,
  } = useConnection();

  // const {
  //   getDeviceInfo,
  //   loading: deviceServiceLoading,
  //   error: deviceError,
  //   data: deviceData,
  // } = useDeviceInformationService();
  // const {data: batteryLevel, getBattery} = useBattery();
  // const {data: time, getTime} = useTime();
  const {
    complete,
    error: bloodPressureServiceError,
    getBloodPressureNotifications,
  } = useBloodPressureService(bloodPressureReceiveHandler);

  // const {
  //   error: userError,
  //   loading: userLoading,
  //   writeUserIndex,
  //   getUserIndex,
  // } = useUserIndex(userIndexHandler);

  const [startedBloodPressure, setStartedBloodPressure] = React.useState(false);

  useEffect(() => {
    logInfo(`RegisterContainer: Connecting to monitor with id: ${device.id})}`);
    connect(device.id);
    dispatch({
      type: NEW_BLOOD_PRESSURE_SYNC,
      payload: {timeSyncStarted: new Date()},
    });
    //If connection is taking too long
    connectionTimeout = setTimeout(() => {
      logError(
        `RegisterContainer: Timeout attempting to connect to monitor with id: ${device.id}`,
      );
      setTimeoutError(
        `Timout attempting to connect to monitor with id: ${device.id}`,
      );
      disconnect(device.id);
    }, (BP_Utils.BLE_CONNECTION_TIMEOUT_IN_SECONDS + 10) * 1000);
  }, []);

  useEffect(() => {
    if (connectionResult && connectionResult.success && !startedBloodPressure) {
      logInfo(
        `RegisterContainer: Subscribe to notifications from monitor with id: ${device.id}`,
      );
      clearTimeout(connectionTimeout);
      setStartedBloodPressure(true);
      // getBattery(device.id);
      // getUserIndex(device.id);

      getBloodPressureNotifications(device.id);
      // getDeviceInfo(device.id);
      // getTime(device.id);
      // writeUserIndex(device.id);
      notificationTimeout = setTimeout(() => {
        logError(
          `RegisterContainer: Timeout waiting for blood pressure notification from monitor with id: ${device.id}`,
        );
        setTimeoutError(
          `Timeout waiting for blood pressure notification from monitor with id: ${device.id}`,
        );
        disconnect(device.id);
      }, BP_Utils.BLE_CONNECTION_TIMEOUT_IN_SECONDS * 1000);
    }
  }, [connectionResult]);

  function bloodPressureReceiveHandler(error, bloodPressureValue) {
    logInfo(
      `RegisterContainer: Received notification from monitor with id: ${
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
      if (error === 'Disconnected') {
        dispatch({
          type: DEVICE_IS_PAIRED,
          payload: {id: device.id, name: connectionResult.name || device.name},
        });
      }
      dispatch({
        type: SYNC_COMPLETE,
      });
    }
  }

  // function userIndexHandler(error, userIndexValue) {
  //   console.log('userIndexHandler', userIndexValue);
  //   if (error) console.log('userIndexHandler', error);
  //   // if (!error) {
  //   //   if (bloodPressureValue) {
  //   //     dispatch({
  //   //       type: NEW_BLOOD_PRESSURE_READING,
  //   //       payload: bloodPressureValue,
  //   //     });
  //   //   }
  //   // } else {
  //   //   dispatch({
  //   //     type: SYNC_COMPLETE,
  //   //   });

  //   //   dispatch({
  //   //     type: DEVICE_IS_PAIRED,
  //   //     payload: device,
  //   //   });
  //   // }
  // }
  if (errorConnecting || timeoutError || bloodPressureServiceError) {
    clearTimeout(connectionTimeout);
    clearTimeout(notificationTimeout);
    return (
      <Error
        onClose={onCancel}
        error={errorConnecting || timeoutError || bloodPressureServiceError}
        message="Error"
      />
    );
  }

  if (complete) {
    return (
      <Success
        onClose={onSuccess}
        message="You have registered your Omron BP monitor successfully!"
      />
    );
  }

  return <Loading message="Registering Blood Pressure Monitor" />;
}
