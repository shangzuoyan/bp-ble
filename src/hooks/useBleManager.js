import React from 'react';
import {BleManager} from 'react-native-ble-plx';

let bleManager;

export default () => {
  const [bluetoothState, setBluetoothState] = React.useState('');

  React.useEffect(() => {
    console.log('Initializing Bluetooth Manager');

    bleManager = new BleManager();

    const subscription = bleManager.onStateChange((state) => {
      console.log('Bluetooth Manager onStateChange', state);
      setBluetoothState(state);
      if (state === 'PoweredOn') {
        console.log('Bluetooth powered on');
      }
    }, true);
    return () => {
      if (bleManager) {
        bleManager.destroy();
      }
      if (subscription) subscription.remove();
      bleManager = null;
    };
  }, []);

  return {
    bluetoothState,
    bleManager,
  };
};
