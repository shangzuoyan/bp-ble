import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function BP_ReadingItem({reading}) {
  const {systolic, diastolic, pulseRate, timeStamp, userIndex} = reading;

  return (
    <View style={styles.container}>
      <Text style={styles.dateElement}>{`Time of reading: ${timeStamp}`}</Text>
      <Text style={styles.element}>{`Systolic: ${systolic}`}</Text>
      <Text style={styles.element}>{`Diastolic: ${diastolic}`}</Text>
      <Text style={styles.element}>{`Pulse: ${pulseRate}`}</Text>
      <Text style={styles.element}>{`User: ${userIndex}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  dateElement: {color: 'gray', fontSize: 14, marginVertical: 2},

  element: {color: 'gray', fontSize: 20, marginVertical: 2},
});
