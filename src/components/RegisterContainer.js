import React, {useEffect} from 'react';

import {
  DEVICE_IS_PAIRED,
  NEW_BLOOD_PRESSURE_SYNC,
  NEW_BLOOD_PRESSURE_READING,
  SYNC_COMPLETE,
} from '../reducers/bloodPressureReducer';

import BloodPressureContext from '../contexts/BloodPressureContext';

import useBattery from '../hooks/useBattery';
import useConnection from '../hooks/useConnection';
import useDeviceInformation from '../hooks/useDeviceInformation';
import useGetBloodPressure from '../hooks/useGetBloodPressure';
import useTime from '../hooks/useTime';

import Error from './Error';
import Loading from './Loading';
import Success from './Success';

export default function RegisterContainer({onCancel, onSuccess, device}) {
  const [state, dispatch] = React.useContext(BloodPressureContext);
  const {connect, error, loading, data: connectionResult} = useConnection();
  const {
    getDeviceInfo,
    loading: deviceServiceLoading,
    error: deviceError,
    data: deviceData,
  } = useDeviceInformation();
  const {data: batteryLevel, getBattery} = useBattery();
  const {data: time, getTime} = useTime();
  const {data: blood, getBloodPressure} = useGetBloodPressure(
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
      getBattery(device.id);
      getBloodPressure(device.id);
      getDeviceInfo(device.id);
      getTime(device.id);
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

      dispatch({
        type: DEVICE_IS_PAIRED,
        payload: device,
      });
    }
  }
  if (deviceError || error) {
    return (
      <Error
        onClose={onCancel}
        message="Cannot connect to blood pressure monitor"
      />
    );
  }

  if (blood) {
    console.log(JSON.stringify(blood));

    return (
      <Success
        onClose={onSuccess}
        message="You have registered your Omron BP monitor successfully!"
      />
    );
  }

  return <Loading message="Registering Blood Pressure Monitor" />;
}
