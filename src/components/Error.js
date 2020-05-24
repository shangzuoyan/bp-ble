import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function Error({
  onClose,
  message = 'Could not find Blood Pressure Monitor',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{message}</Text>
      <Text style={styles.messageText}>
        Please make sure the monitor is in transfer mode, within a few feet of
        your device, and the app is open.
      </Text>
      <Button
        title="Close"
        onPress={onClose}
        style={styles.button}
        color="#F95700FF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {color: 'gray', fontSize: 16, marginBottom: 30},
  title: {color: '#ED2B33FF'},
  button: {color: '#00A4CCFF'},

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
