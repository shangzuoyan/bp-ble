import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  SafeAreaView,
  Button,
} from 'react-native';

import ScanForm from './ScanForm';
export default function Sync() {
  const [visible, setVisible] = React.useState(false);
  const [isPaired, setIsPaired] = React.useState(false);

  const successHandler = () => {
    setIsPaired(true);
    setVisible(false);
  };

  const transfer = () => {
    setVisible(true);
    setIsPaired(true);
  };
  return (
    <View style={styles.container}>
      <Modal
        presentationStyle="overFullScreen"
        transparent={true}
        animationType={'slide'}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <SafeAreaView style={styles.overlay}>
          <ScanForm
            onCancel={() => setVisible(false)}
            onSuccess={successHandler}
          />
        </SafeAreaView>
      </Modal>

      {isPaired ? (
        <TouchableOpacity style={styles.button} onPress={transfer}>
          <Text style={styles.buttonText}>Transfer new Readings</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={styles.buttonText}>
            Register your new Omron Monitor now
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', paddingHorizontal: 20},
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
  cardActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardActionButton: {},
  button: {
    alignItems: 'center',
    backgroundColor: '#F95700FF',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
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
