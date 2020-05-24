import React, {useEffect} from 'react';

import useScanBloodPressureMonitor from '../hooks/useScanBloodPressureMonitor';

import Error from './Error';
import Loading from './Loading';
import RegisterDeviceContainer from './RegisterDeviceContainer';

export default function ScanContainer({onCancel, onSuccess}) {
  const {scan, loading, error, data} = useScanBloodPressureMonitor();

  useEffect(() => {
    scan();
  }, []);

  if (loading) {
    return <Loading message="Scanning" />;
  }

  if (error) {
    console.log('TIMED OUT', JSON.stringify(error));
    return (
      <Error onClose={onCancel} message="Cannot find blood pressure monitor" />
    );
  }

  if (data) {
    console.log(JSON.stringify(data));

    return (
      <RegisterDeviceContainer
        device={data.device}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }

  return null;
}
