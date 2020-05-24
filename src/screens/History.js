import React from 'react';

import {SafeAreaView, Text, StyleSheet, SectionList} from 'react-native';
import BP_Reading from '../components/BP_Reading';
import TransferHeader from '../components/TransferHeader';
import BloodPressureContext from '../contexts/BloodPressureContext';
const DATA = [
  {
    syncInfo: {id: 1, timeTransferred: '01/01/2010'},
    data: [
      {
        id: 1,
        systolic: 121,
        diastolic: 122,
        pulse: 12,
        timeReading: '1/12/2011',
      },
      {
        id: 2,
        systolic: 121,
        diastolic: 122,
        pulse: 12,
        timeReading: '1/12/2011',
      },
      {
        id: 3,
        systolic: 121,
        diastolic: 122,
        pulse: 12,
        timeReading: '1/12/2011',
      },
      {
        id: 4,
        systolic: 121,
        diastolic: 122,
        pulse: 12,
        timeReading: '1/12/2011',
      },
    ],
  },
  {
    transfer: {id: 2, timeTransferred: '01/01/2020'},
    data: [
      {
        id: 1,
        systolic: 121,
        diastolic: 122,
        pulse: 12,
        timeReading: '1/12/2011',
      },
      {
        id: 2,
        systolic: 121,
        diastolic: 122,
        pulse: 12,
        timeReading: '1/12/2011',
      },
      {
        id: 3,
        systolic: 121,
        diastolic: 122,
        pulse: 12,
        timeReading: '1/12/2011',
      },
      {
        id: 4,
        systolic: 121,
        diastolic: 122,
        pulse: 12,
        timeReading: '1/12/2011',
      },
    ],
  },
];

export default function History() {
  const [state, dispatch] = React.useContext(BloodPressureContext);

  console.log('State', state);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Blood Pressure History</Text>
      <Text>{JSON.stringify(state)}</Text>
      {state.bloodPressureReadings.length ? (
        <SectionList
          sections={state.bloodPressureReadings}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => <BP_Reading reading={item} />}
          renderSectionHeader={({section: {syncInfo}}) => (
            <TransferHeader transfer={syncInfo} />
          )}
        />
      ) : (
        <Text>There are no blood pressure readings</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 20, marginTop: 60},
  headerText: {
    textAlign: 'center',
    color: '#F95700FF',
    marginBottom: 30,
    fontSize: 24,
  },
});
