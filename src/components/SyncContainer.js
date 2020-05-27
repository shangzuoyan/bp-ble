import React, {useEffect} from 'react';

import {
  NEW_BLOOD_PRESSURE_SYNC,
  NEW_BLOOD_PRESSURE_READING,
  SYNC_COMPLETE,
} from '../reducers/bloodPressureReducer';

import BloodPressureContext from '../contexts/BloodPressureContext';

import useConnection from '../hooks/useConnection';
// import useBattery from '../hooks/useBatteryService';
// import useTime from '../hooks/useTimeService';
import useBloodPressureService from '../hooks/useBloodPressureService';

import Error from './Error';
import Loading from './Loading';
import Success from './Success';

export default function SyncContainer({onCancel, onSuccess}) {
  const [{device}, dispatch] = React.useContext(BloodPressureContext);
  const {
    connect,
    error: errorConnecting,
    loading: connecting,
    data: connectionResult,
  } = useConnection();
  // const {data: batteryLevel, getBattery} = useBattery();
  // const {data: time, getTime} = useTime();
  const {complete, getBloodPressureNotifications} = useBloodPressureService(
    bloodPressureReceiveHandler,
  );
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
      getBloodPressureNotifications(device.id);
      // getTime(device.id);
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
        type: SYNC_COMPLETE,
      });
    }
  }
  if (errorConnecting) {
    return (
      <Error
        onClose={onCancel}
        message="Cannot connect to blood pressure monitor"
      />
    );
  }

  if (complete) {
    console.log('Syncing complete');

    return (
      <Success
        onClose={onSuccess}
        message="Congratulations!  You have synced the blood pressure monitor with your app!"
      />
    );
  }

  return <Loading message="Syncing blood pressure readings." />;
}
