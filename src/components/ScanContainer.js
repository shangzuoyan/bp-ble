import React, {useEffect} from 'react';

import {Alert, Linking} from 'react-native';

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
      'Bluetooth is turned off or you have not allowed Bluetooth access',
      [{text: 'OK', onPress: () => onCancel()}],
      {cancelable: false},
    );
  }

  if (loading) {
    return <Loading message="Scanning ..." />;
  }

  if (error) {
    return (
      <Error onClose={onCancel} message="Cannot find blood pressure monitor" />
    );
  }

  if (data && Object.keys(data).length > 0) {
    return (
      <RegisterDeviceContainer
        devices={data}
        onCancel={onCancel}
        onSuccess={onSuccess}
      />
    );
  }

  return null;
}
