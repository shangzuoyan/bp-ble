import React from 'react';

import Loading from './Loading';
import MonitorNotFoundError from './MonitorNotFoundError';
import RegisterDevice from './RegisterDevice';
import useScanBloodPressureMonitor from '../hooks/useScanBloodPressureMonitor';
export default function Scan({onCancel}) {
  React.useEffect(() => {
    scan();
  }, [scan]);
  const {scan, loading, error, data} = useScanBloodPressureMonitor();

  if (loading) {
    return <Loading loading={true} operation="Scanning" />;
  }
  if (error) {
    console.log(JSON.stringify(error));
    return <MonitorNotFoundError onClose={onCancel} />;
  }
  if (data) {
    console.log(JSON.stringify(data));

    return <RegisterDevice device={data.device} onCancel={onCancel} />;
  }
  return null;
}
