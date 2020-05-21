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

import Scan from './Scan';
export default function Sync({onCancel}) {
  const [scanMode, setScanMode] = React.useState(false);

  const cancelHandler = () => {
    alert('CANCEL');
    setScanMode(false);
  };

  if (scanMode) {
    return <Scan onCancel={cancelHandler} />;
  }

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.headerText}>Registration </Text>
      <Text style={styles.instructionsText}>
        Press the bluetooth button on your monitor until you see a flashing P
        sign on your monitor screen
      </Text>
      <View style={styles.cardActions}>
        <Button title="Cancel" color="#F95700FF" onPress={onCancel} />
        <Button
          title="Find"
          color="#F95700FF"
          onPress={() => setScanMode(true)}
        />
      </View>
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
