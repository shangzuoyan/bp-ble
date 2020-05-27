import React from 'react';

import * as BP_Utils from '../utils/bleUtils';
import Context from '../contexts/BP_BLE_Context';

export default () => {
  const {bleManager, bluetoothState} = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  function scan() {
    console.log('Entered scan');
    if (!bleManager) {
      console.log('bleManager has not been setup.  Use useBleManager');
      return;
    }

    setLoading(true);

    const timeoutID = setTimeout(() => {
      console.log(
        `Scan timed out after ${BP_Utils.BLE_TIMEOUT_IN_SECONDS} seconds`,
      );
      bleManager.stopDeviceScan();
      setLoading(false);
      setData(undefined);
      setError({
        error:
          'Scan timed out after ${BP_Utils.BLE_TIMEOUT_IN_SECONDS} seconds',
      });
    }, BP_Utils.BLE_TIMEOUT_IN_SECONDS * 1000);

    bleManager.startDeviceScan(
      [BP_Utils.BLE_BLOOD_PRESSURE_SERVICE],
      null,
      async (_error, _device) => {
        console.log('scanning result', _error, _device);
        if (_error) {
          console.log('Scan error:', _error);
          setError(_error);
          return;
        }
        const manuData = BP_Utils.parseDeviceManufacturerData(
          _device.manufacturerData,
        );
        const inPairMode = BP_Utils.isDeviceInPairingMode(manuData);

        if (!inPairMode) {
          return;
        }

        if (_device.name && _device.name.startsWith('BP')) {
          console.log('Scan: device found', _device.name);
          clearTimeout(timeoutID);
          setLoading(false);
          bleManager.stopDeviceScan();
          setData({
            device: {
              id: _device.id,
              name: _device.name,
              localName: _device.localName,
            },
          });
        }
      },
    );
  }

  return {loading, error, data, scan, bluetoothState};
};
