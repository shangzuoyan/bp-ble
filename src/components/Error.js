import React from 'react';
import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';

export default function Error({
  onClose,
  message = 'Could not find Blood Pressure Monitor',
  error,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{message}</Text>
      <Text style={styles.messageText}>
        Please make sure the monitor is in sync mode and within a few feet of
        your mobile device.
      </Text>
      {error ? (
        <ScrollView style={styles.detailedError}>
          <Text style={styles.detailedErrorText}>{JSON.stringify(error)}</Text>
        </ScrollView>
      ) : null}
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
  message: {color: 'gray', fontSize: 16, marginBottom: 2},
  title: {color: '#ED2B33FF'},
  button: {color: '#00A4CCFF'},
  detailedError: {
    height: 400,
    marginBottom: 5,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 3,
  },
  detailedErrorText: {fontSize: 12, color: '#ED2B33FF'},
  headerText: {
    textAlign: 'center',
    color: '#F95700FF',
    marginBottom: 10,
    fontSize: 24,
  },
  messageText: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 5,
  },
});
