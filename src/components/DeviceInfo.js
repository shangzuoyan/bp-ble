import React from 'react';

import {
  StyleSheet,
  Modal,
  View,
  Text,
  Button,
  SafeAreaView,
} from 'react-native';

export default function DeviceInfo({device, onRegister, onCancel}) {
  const {name, localName} = device;
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.headerText}>{name} </Text>
      <Text style={styles.messageText}>{localName}</Text>

      <Button title="Register" onPress={onRegister} />
      <Button title="Cancel" onPress={onCancel} />
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
