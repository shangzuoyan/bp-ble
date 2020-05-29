import React from 'react';
import {BleManager} from 'react-native-ble-plx';

let bleManager;

export default (logError, logWarn, logInfo) => {
  const [bluetoothState, setBluetoothState] = React.useState('');

  React.useEffect(() => {
    logInfo('useBleManager: Initializing Bluetooth Manager');
    bleManager = new BleManager();

    const subscription = bleManager.onStateChange((state) => {
      logInfo(`useBleManager: Bluetooth Manager onStateChange: ${state}`);
      setBluetoothState(state);
      if (state === 'PoweredOn') {
        logInfo('useBleManager: Bluetooth powered on');
      }
    }, true);
    return () => {
      if (subscription) {
        logInfo(
          'useBleManager: Removing subscription to Bluetooth Manager state change',
        );
        subscription.remove();
      }
      if (bleManager) {
        logInfo('useBleManager: Destroying Bluetooth Manager');
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
