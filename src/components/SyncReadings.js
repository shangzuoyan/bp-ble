import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

export default function SyncReadings({device, onCancel, onTransfer}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Transfer Data</Text>
      <Text style={styles.deviceText}>{device.name} </Text>
      <Text style={styles.deviceText}>{device.localName}</Text>
      <Text style={styles.instructionsText}>
        Press the bluetooth button on your monitor until you see a flashing O
        sign on your monitor screen
      </Text>
      <View style={styles.actionArea}>
        <Button title="Cancel" onPress={onCancel} color="#F95700FF" />
        <Button
          color="#F95700FF"
          title="Transfer Data"
          onPress={() => {
            if (onTransfer) onTransfer();
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
  instructionsText: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 30,
  },
  deviceText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    marginBottom: 30,
  },
});
