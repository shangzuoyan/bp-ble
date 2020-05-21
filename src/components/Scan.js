import React from 'react';

import Loading from './Loading';
import MonitorNotFoundError from './MonitorNotFoundError';
import Register from './Register';
import useScanBloodPressureMonitor from '../hooks/useScanBloodPressureMonitor';
export default function Scan({onCancel, onSuccess}) {
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

    return (
      <Register
        device={data.device}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }
  return null;
}
