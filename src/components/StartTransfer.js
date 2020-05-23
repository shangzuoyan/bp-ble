import React from 'react';

import {Text, View, StyleSheet, Button} from 'react-native';

import Scan from './Scan';
export default function Sync({onCancel, onSuccess}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Transfer new Readings </Text>
      <Text style={styles.instructionsText}>
        Press the bluetooth button on your monitor until you see a flashing O
        sign on your monitor screen
      </Text>
      <View style={styles.actionArea}>
        <Button title="Cancel" color="#F95700FF" onPress={onCancel} />
        <Button
          title="Transfer"
          color="#F95700FF"
          onPress={() => console.log('df')}
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
