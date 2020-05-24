import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

export default function BP_Reading({reading}) {
  const {systolic, diastolic, pulseRate, timeStamp} = reading;

  return (
    <View style={styles.container}>
      <Text style={styles.element}>{`Time of reading: ${timeStamp}`}</Text>
      <Text style={styles.element}>{`Systolic: ${systolic}`}</Text>
      <Text style={styles.element}>{`Diastolic: ${diastolic}`}</Text>
      <Text style={styles.element}>{`Pulse: ${pulseRate}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {justifyContent: 'flex-start', marginVertical: 20},
  element: {color: 'gray', fontSize: 20, marginVertical: 5},
});
