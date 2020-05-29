import React, {useEffect} from 'react';

import {Alert} from 'react-native';

import useBloodPressureMonitorScan from '../hooks/useBloodPressureMonitorScan';

import Error from './Error';
import Loading from './Loading';
import RegisterDeviceContainer from './RegisterDeviceContainer';

export default function ScanContainer({onCancel, onSuccess}) {
  const {
    scan,
    loading,
    error,
    data,
    bluetoothState,
  } = useBloodPressureMonitorScan();

  const [showBluetoothAlert, setShowBluetoothAlert] = React.useState(false);

  useEffect(() => {
    scan();
  }, []);

  if (
    !showBluetoothAlert &&
    bluetoothState !== '' &&
    bluetoothState !== 'PoweredOn'
  ) {
    setShowBluetoothAlert(true);
    Alert.alert(
      'Bluetooth is disabled',
      'Enable Bluetooth in Settings',
      [{text: 'Ok', onPress: () => setShowBluetoothAlert(true)}],
      {cancelable: false},
    );
  }

  if (loading) {
    return <Loading message="Scanning" />;
  }

  if (error) {
    return (
      <Error
        onClose={onCancel}
        message="Cannot find blood pressure monitor"
        error={error}
      />
    );
  }

  if (data) {
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
