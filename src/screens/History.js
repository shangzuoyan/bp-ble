import React from 'react';
import {SafeAreaView, Text, StyleSheet, FlatList} from 'react-native';

import BloodPressureContext from '../contexts/BloodPressureContext';

import SyncData from '../components/SyncData';

export default function History() {
  const [state] = React.useContext(BloodPressureContext);
  if (__DEV__) {
    console.log(JSON.stringify(state));
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Blood Pressure History</Text>
      {state.bloodPressureReadings.length ? (
        <FlatList
          data={state.bloodPressureReadings}
          renderItem={({item}) => <SyncData data={item} />}
          keyExtractor={(item, key) => {
            return `${item.syncInfo.timeSyncStarted.toString()}-${key}`;
          }}
        />
      ) : (
        <Text style={styles.message}>
          There are no blood pressure readings. Register your blood pressure
          monitor to get started.
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 20, marginTop: 30},
  message: {textAlign: 'center', fontSize: 14, color: 'gray'},
  headerText: {
    textAlign: 'center',
    color: '#F95700FF',
    marginBottom: 30,
    fontSize: 20,
    fontWeight: '600',
  },
});
