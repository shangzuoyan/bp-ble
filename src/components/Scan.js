import React, {useEffect} from 'react';

import Loading from './Loading';
import MonitorNotFoundError from './MonitorNotFoundError';
import Register from './Register';
import useScanBloodPressureMonitor from '../hooks/useScanBloodPressureMonitor';
export default function Scan({onCancel, onSuccess}) {
  const {scan, loading, error, data} = useScanBloodPressureMonitor();

  useEffect(() => {
    scan();
  }, []);

  if (loading) {
    return <Loading loading={true} operation="Scanning" />;
  }

  if (error) {
    console.log('TIMED OUT', JSON.stringify(error));
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
