import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import BP_MonitorInteractionModalContainer from '../components/BP_MonitorInteractionModalContainer';
import BP_BLE_Provider from '../contexts/BP_BLE_Provider';
import RegistrationMode from '../components/RegistrationMode';
// import Loading from '../components/Loading';
// import MonitorNotFoundError from '../components/MonitorNotFoundError';
// import RegisterDevice from '../components/RegisterDevice';
// import Success from '../components/Success';
export default function Sync() {
  const [
    isBpInteractionWindowOpen,
    setBPInteractionWindowOpen,
  ] = React.useState(false);

  const closeBpInteractionWindow = () => {
    setBPInteractionWindowOpen(false);
  };

  const openBpInteractionWindow = () => {
    setBPInteractionWindowOpen(true);
  };

  let Window;
  // switch (state) {
  //   case 'Success':
  //     Window = <Success onClose={closeBpInteractionWindow} />;
  //     break;
  //   case 'Error':
  //     Window = <MonitorNotFoundError onClose={closeBpInteractionWindow} />;
  //     break;
  //   case 'Register':
  //     Window = (
  //       <RegisterDevice
  //         device={{name: 'BP530', localName: 'sdf'}}
  //         onCancel={closeBpInteractionWindow}
  //         onSuccess={closeBpInteractionWindow}
  //       />
  //     );
  //     break;
  //   case 'Loading':
  //     Window = <Loading loading={true} operation="Scanning" />;
  //     break;
  //   case 'StartScan':
  //     Window = <StartScan onClose={closeBpInteractionWindow} />;
  //     break;
  //   default:
  //     Window = null;
  // }

  Window = <RegistrationMode onClose={closeBpInteractionWindow} />;

  return (
    <BP_BLE_Provider>
      <View style={styles.container}>
        <BP_MonitorInteractionModalContainer
          visible={isBpInteractionWindowOpen}
          onRequestClose={closeBpInteractionWindow}>
          {Window}
        </BP_MonitorInteractionModalContainer>
        <TouchableOpacity
          style={[styles.button, styles.buttonTransfer]}
          onPress={openBpInteractionWindow}>
          <Text style={styles.buttonText}>
            Transfer new Blood Pressure Readings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonRegister]}
          onPress={openBpInteractionWindow}>
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
