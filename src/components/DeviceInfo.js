import React from 'react';

import {StyleSheet, TouchableOpacity, View, Text, Button} from 'react-native';

export default function DeviceInfo({device}) {
  const {name, localName, id} = device;
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.headerText}>{id} </Text>

      <Text style={styles.headerText}>{name} </Text>
      <Text style={styles.messageText}>{localName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    borderRadius: 6,
    borderColor: 'gray',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 30,
    borderRadius: 6,
  },
  message: {color: 'gray', fontSize: 16, marginBottom: 30},
  title: {color: '#ED2B33FF'},

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
