import React, {useEffect} from 'react';

import Loading from './Loading';
import MonitorNotFoundError from './MonitorNotFoundError';
import Success from './Success';
import useConnection from '../hooks/useConnection';
import useDeviceInformation from '../hooks/useDeviceInformation';
import useBattery from '../hooks/useBattery';
import useTime from '../hooks/useTime';
import useGetBloodPressure from '../hooks/useGetBloodPressure';
export default function Registering({onCancel, onSuccess, device}) {
  const {connect, error, loading, data: connectionResult} = useConnection();
  const {
    getDeviceInfo,
    loading: deviceServiceLoading,
    error: deviceError,
    data: deviceData,
  } = useDeviceInformation();
  const {data: batteryLevel, getBattery} = useBattery();
  const {data: time, getTime} = useTime();
  const {data: blood, getBloodPressure} = useGetBloodPressure();

  useEffect(() => {
    connect(device.id);
  }, []);

  useEffect(() => {
    if (connectionResult && connectionResult.success) {
      getBattery(device.id);
      getBloodPressure(device.id);
      getDeviceInfo(device.id);
      getTime(device.id);
    }
  }, [connectionResult]);

  if (deviceError || error) {
    return <MonitorNotFoundError onClose={onCancel} />;
  }

  if (blood) {
    console.log(JSON.stringify(blood));

    return <Success onClose={onSuccess} />;
  }

  return (
    <Loading loading={true} operation="Registering Blood Pressure Monitor" />
  );
}
