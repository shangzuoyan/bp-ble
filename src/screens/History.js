import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  SectionList,
  FlatList,
} from 'react-native';

import BloodPressureContext from '../contexts/BloodPressureContext';

import BP_ReadingItem from '../components/BP_ReadingItem';
import SyncHeader from '../components/SyncHeader';

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
          renderItem={({item}) => <SyncHeader data={item} />}
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

// <SectionList
// sections={state.bloodPressureReadings}
// keyExtractor={(item, index) => index}
// renderItem={({item}) => <BP_ReadingItem reading={item} />}
// renderSectionHeader={({section: {syncInfo}}) => (
//   <SyncHeader transfer={syncInfo} />
// )}
// />
// )
