import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import UserSelection from './UserSelection';
export default function RegisterDevice({device, onCancel, onRegister}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register Device</Text>
      <Text style={styles.deviceText}>{device.name} </Text>
      <Text style={styles.deviceText}>{device.localName}</Text>
      <UserSelection />
      <View style={styles.actionArea}>
        <Button title="Cancel" onPress={onCancel} color="#F95700FF" />
        <Button
          color="#F95700FF"
          title="Register"
          onPress={() => {
            if (onRegister) onRegister();
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  actionArea: {
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    textAlign: 'center',
    color: '#F95700FF',
    marginBottom: 30,
    fontSize: 24,
  },
  deviceText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    marginBottom: 30,
  },
});
