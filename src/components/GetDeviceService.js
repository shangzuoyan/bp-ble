import React from 'react';

import Loading from './Loading';
import {Text, View, Button} from 'react-native';
import useDeviceInformation from '../hooks/useDeviceInformation';
import useBattery from '../hooks/useBattery';
import useTime from '../hooks/useTime';
import useGetBloodPressure from '../hooks/useGetBloodPressure';

export default function GetDeviceService({device, onCancel, onSuccess}) {
  const {getDeviceInfo, loading, error, data} = useDeviceInformation();
  const {data: batteryLevel, getBattery} = useBattery();
  const {data: time, getTime} = useTime();
  const {data: blood, getBloodPressure} = useGetBloodPressure();

  console.log('GetDeviceService', loading, error, data);
  if (loading) {
    return <Text>Getting Device Information</Text>;
  }
  if (error) {
    console.log(JSON.stringify(error));
    return <Text>{JSON.stringify(error)}</Text>;
  }
  if (data) {
    console.log(JSON.stringify(data));
    return (
      <View>
        <Text>{JSON.stringify(data)}</Text>
        <Text>{batteryLevel ? batteryLevel.batteryLevel : null}</Text>
        <Text>{time ? JSON.stringify(time) : null}</Text>

        <Button
          onPress={async () => await getDeviceInfo(device.id)}
          title="GET DEVICE INFO"
        />
        <Button title="Done" onPress={onSuccess} />
      </View>
    );
  }

  return (
    <Button
      onPress={async () => {
        getBattery(device.id);
        getTime(device.id);
        getBloodPressure(device.id);
        // await getDeviceInfo(device.id);
      }}
      title="GET DEVICE INFO"
    />
  );
}
