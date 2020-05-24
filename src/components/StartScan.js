import React from 'react';

import {Text, View, StyleSheet, Button} from 'react-native';

export default function StartScan({onClose, onScan}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Registration </Text>
      <Text style={styles.instructionsText}>
        Press the bluetooth button on your monitor until you see a flashing P
        sign on your monitor screen
      </Text>
      <View style={styles.actionArea}>
        <Button title="Cancel" color="#F95700FF" onPress={onClose} />
        <Button title="Find" color="#F95700FF" onPress={onScan} />
      </View>
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
});
