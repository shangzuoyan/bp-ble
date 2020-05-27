import React, {useEffect} from 'react';

import {
  DEVICE_IS_PAIRED,
  NEW_BLOOD_PRESSURE_SYNC,
  NEW_BLOOD_PRESSURE_READING,
  SYNC_COMPLETE,
} from '../reducers/bloodPressureReducer';

import BloodPressureContext from '../contexts/BloodPressureContext';

// import useBattery from '../hooks/useBatteryService';
import useConnection from '../hooks/useConnection';
import useDeviceInformationService from '../hooks/useDeviceInformationService';
import useBloodPressureService from '../hooks/useBloodPressureService';
// import useTime from '../hooks/useTimeService';
// import useUserIndex from '../hooks/useUserIndex';

import Error from './Error';
import Loading from './Loading';
import Success from './Success';

export default function RegisterContainer({onCancel, onSuccess, device}) {
  const [state, dispatch] = React.useContext(BloodPressureContext);
  const {
    connect,
    error: errorConnecting,
    loading: connecting,
    data: connectionResult,
  } = useConnection();

  const {
    getDeviceInfo,
    loading: deviceServiceLoading,
    error: deviceError,
    data: deviceData,
  } = useDeviceInformationService();
  // const {data: batteryLevel, getBattery} = useBattery();
  // const {data: time, getTime} = useTime();
  const {complete, getBloodPressureNotifications} = useBloodPressureService(
    bloodPressureReceiveHandler,
  );

  // const {
  //   error: userError,
  //   loading: userLoading,
  //   writeUserIndex,
  //   getUserIndex,
  // } = useUserIndex(userIndexHandler);

  const [startedBloodPressure, setStartedBloodPressure] = React.useState(false);

  useEffect(() => {
    connect(device.id);
    dispatch({
      type: NEW_BLOOD_PRESSURE_SYNC,
      payload: {timeSyncStarted: new Date()},
    });
  }, []);

  useEffect(() => {
    if (connectionResult && connectionResult.success && !startedBloodPressure) {
      setStartedBloodPressure(true);
      // getBattery(device.id);
      // getUserIndex(device.id);

      getBloodPressureNotifications(device.id);
      // getDeviceInfo(device.id);
      // getTime(device.id);
      // writeUserIndex(device.id);
    }
  }, [connectionResult]);

  function bloodPressureReceiveHandler(error, bloodPressureValue) {
    console.log('bloodPressureReceiveHandler', bloodPressureValue);
    if (!error) {
      if (bloodPressureValue) {
        dispatch({
          type: NEW_BLOOD_PRESSURE_READING,
          payload: bloodPressureValue,
        });
      }
    } else {
      dispatch({
        type: DEVICE_IS_PAIRED,
        payload: device,
      });
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
  if (deviceError || errorConnecting) {
    return (
      <Error
        onClose={onCancel}
        message="Error registering with blood pressure monitor.  Please try again."
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
