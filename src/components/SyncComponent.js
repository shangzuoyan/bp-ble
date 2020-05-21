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

import Loading from './Loading';
import MonitorNotFoundError from './MonitorNotFoundError';

import useScanBloodPressureMonitor from '../hooks/useScanBloodPressureMonitor';
export default function Sync() {
  const [visible, setVisible] = React.useState(false);
  // const [monitorNotFound, setMonitorNotFound] = React.useState(true);
  // const [loading, setLoading] = React.useState(false);

  const {scan, loading, error, data} = useScanBloodPressureMonitor();

  const find = () => {
    scan();
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
        {
          // <MonitorNotFoundError
          //         open={error}
          //         onClose={() => {
          //           // setMonitorNotFound(false);
          //         }}
          //       />
        }
        <SafeAreaView style={styles.overlay}>
          <Loading loading={loading} />

          <View style={styles.modalContainer}>
            <Text style={styles.headerText}>Registration </Text>
            <Text style={styles.instructionsText}>
              Press the bluetooth button on your monitor until you see a
              flashing P sign on your monitor screen
              {JSON.stringify(error) + JSON.stringify(data)}
            </Text>
            <View style={styles.cardActions}>
              <Button
                title="Cancel"
                color="#F95700FF"
                onPress={() => setVisible(false)}
              />
              <Button title="Find" color="#F95700FF" onPress={find} />
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setVisible(true);
        }}>
        <Text style={styles.buttonText}>
          Register your new Omron Monitor now
        </Text>
      </TouchableOpacity>
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
