import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

export default function RegisteredDevice({device, onUnregister}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Blood Pressure Monitor</Text>
      <Text style={styles.deviceText}>{device.name} </Text>
      <Button title="Unregister" onPress={onUnregister} color="#00A4CCFF" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DCDCDC',
  },
  headerText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 5,
    fontSize: 20,
  },
  deviceText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    marginBottom: 5,
  },
});
