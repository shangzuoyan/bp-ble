import React from 'react';

import Loading from './Loading';
import {Text, View, Button} from 'react-native';
import MonitorNotFoundError from './MonitorNotFoundError';
import RegisterDevice from './RegisterDevice';
import useRegisterBloodPressureMonitor from '../hooks/useRegisterBloodPressureMonitor';
import GetDeviceService from './GetDeviceService';
export default function Register({device, onCancel, onSuccess}) {
  const {register, loading, error, data} = useRegisterBloodPressureMonitor();

  if (loading) {
    return (
      <Loading loading={true} operation="Registering Blood Pressure Monitor" />
    );
  }
  if (error) {
    console.log(JSON.stringify(error));
    return <MonitorNotFoundError onClose={onCancel} />;
  }
  if (data) {
    console.log(JSON.stringify(data));
    return (
      <View>
        <Text>Success</Text>
        <GetDeviceService device={device} />
        <Button title="Done" onPress={onSuccess} />
      </View>
    );
  }

  function registerHandler() {
    // alert('Register andler');
    console.log('Registering new device', device);
    register(device.id);
  }

  return (
    <RegisterDevice
      device={device}
      onPressRegister={registerHandler}
      onCancel={onSuccess}
    />
  );
}
