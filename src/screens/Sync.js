import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';

import BP_MonitorInteractionModalContainer from '../components/BP_MonitorInteractionModalContainer';
import BP_BLE_Provider from '../contexts/BP_BLE_Provider';
import StartScan from '../components/StartScan';
import Loading from '../components/Loading';
import MonitorNotFoundError from '../components/MonitorNotFoundError';
import RegisterDevice from '../components/RegisterDevice';
import Success from '../components/Success';
export default function Sync() {
  const [visible, setVisible] = React.useState(false);
  const [isPaired, setIsPaired] = React.useState(false);
  const [state, setState] = React.useState('Register');

  const successHandler = () => {
    setIsPaired(false);
    setVisible(false);
  };

  const transfer = () => {
    setVisible(true);
    setIsPaired(true);
  };

  let Window;
  switch (state) {
    case 'Success':
      Window = <Success onClose={() => setVisible(false)} />;
      break;
    case 'Error':
      Window = <MonitorNotFoundError onClose={() => setVisible(false)} />;
      break;
    case 'Register':
      Window = (
        <RegisterDevice
          device={{name: 'BP530', localName: 'sdf'}}
          onCancel={() => setVisible(false)}
          onSuccess={successHandler}
        />
      );
      break;
    case 'Loading':
      Window = <Loading loading={true} operation="Scanning" />;
      break;
    case 'StartScan':
      Window = (
        <StartScan
          onCancel={() => setVisible(false)}
          onSuccess={successHandler}
        />
      );
      break;
    default:
      Window = null;
  }
  return (
    <BP_BLE_Provider>
      <View style={styles.container}>
        <Modal
          presentationStyle="overFullScreen"
          transparent={true}
          animationType={'slide'}
          visible={visible}
          onRequestClose={() => {
            setVisible(false);
          }}>
          <BP_MonitorInteractionModalContainer>
            {Window}
          </BP_MonitorInteractionModalContainer>
        </Modal>
        <TouchableOpacity
          style={[styles.button, styles.buttonTransfer]}
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={styles.buttonText}>
            Transfer new Blood Pressure Readings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonRegister]}
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={styles.buttonText}>
            Register your new Omron Monitor now
          </Text>
        </TouchableOpacity>
      </View>
    </BP_BLE_Provider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},

  button: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#CECECE',
    marginBottom: 12,
    marginHorizontal: 12,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  buttonTransfer: {
    backgroundColor: '#00A4CCFF',
  },
  buttonRegister: {
    backgroundColor: '#F95700FF',
  },
});
