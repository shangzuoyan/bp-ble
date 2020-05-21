import React from 'react';

import {
  StyleSheet,
  Modal,
  View,
  Text,
  Button,
  SafeAreaView,
} from 'react-native';

export default function MonitorNotFoundError({onClose, open}) {
  return (
    <Modal presentationStyle="overFullScreen" transparent={true} visible={open}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>
            Could not find Blood Pressure Monitor
          </Text>
          <Text style={styles.messageText}>
            Please make sure the monitor is in transfer mode, within a few feet
            and the app is open.
          </Text>

          <Button title="Close" onPress={onClose} style={styles.button} />
        </View>
      </SafeAreaView>
    </Modal>
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
  button: {color: '#00A4CCFF'},

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
