import React from 'react';
import {Text, View, Button} from 'react-native';
import DeviceInfo from './DeviceInfo';
import UserSelection from './UserSelection';
export default function RegisterDevice({device, onCancel, onRegister}) {
  console.log('DEVICE', device);
  return (
    <View>
      <Text>RegisterDevice</Text>
      <DeviceInfo device={device} />
      <UserSelection />
      <Button title="Cancel" onPress={onCancel} />
      <Button title="Register" onPress={onRegister} />
    </View>
  );
}
