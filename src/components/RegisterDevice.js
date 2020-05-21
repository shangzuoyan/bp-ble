import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import DeviceInfo from './DeviceInfo';
import UserSelection from './UserSelection';
export default function RegisterDevice({device, onCancel, onPressRegister}) {
  return (
    <View>
      <Text>Register Device</Text>
      <View>
        <DeviceInfo device={device} />
        <View>
          <Button title="Cancel" onPress={onCancel} />
          <Button
            title="Register"
            onPress={() => {
              if (onPressRegister) onPressRegister();
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 30,
    borderRadius: 6,
  },
  message: {color: 'gray', fontSize: 16, marginBottom: 30},
  title: {color: '#ED2B33FF'},

  headerText: {
    textAlign: 'center',
    color: '#F95700FF',
    marginBottom: 30,
    fontSize: 24,
  },
  messageText: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 30,
  },
});
