import React from 'react';

import {StyleSheet, TouchableOpacity, View, Text, Button} from 'react-native';

export default function DeviceInfo({device}) {
  const {name, localName, id} = device;

  return (
    <>
      <Text style={styles.text}>{name} </Text>
      <Text style={styles.text}>{localName}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
    marginBottom: 30,
  },
});
