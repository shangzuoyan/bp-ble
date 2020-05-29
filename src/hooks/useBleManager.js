import React from 'react';
import {BleManager} from 'react-native-ble-plx';

let bleManager;

export default (logError, logWarn, logInfo) => {
  const [bluetoothState, setBluetoothState] = React.useState('');

  React.useEffect(() => {
    logInfo('Initializing Bluetooth Manager');
    bleManager = new BleManager();

    const subscription = bleManager.onStateChange((state) => {
      logInfo(`Bluetooth Manager onStateChange: ${state}`);
      setBluetoothState(state);
      if (state === 'PoweredOn') {
        logInfo('Bluetooth powered on');
      }
    }, true);
    return () => {
      if (subscription) {
        logInfo('Removing subscription to Bluetooth Manager state change');
        subscription.remove();
      }
      if (bleManager) {
        logInfo('Destroying Bluetooth Manager');
        bleManager.destroy();
      }

      bleManager = null;
    };
  }, []);

  return {
    bluetoothState,
    bleManager,
  };
};
