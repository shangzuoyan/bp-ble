import React from 'react';
import {fullUUID} from 'react-native-ble-plx';

import * as BP_Utils from '../utils/bleUtil';
import Context from '../contexts/BP_BLE_Context';
export default () => {
  const {bleManager} = React.useContext(Context);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  function register(deviceId) {
    console.log('scan started');
    if (!bleManager) {
      console.log('bleManager not set');
      return;
    }

    setLoading(true);
    bleManager.startDeviceScan(null, null, async (_error, _device) => {
      console.log('scanning result', _error, _device);
      if (_error) {
        // console.log(error);
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
        setLoading(false);
        bleManager.stopDeviceScan();
        setData({
          data: {
            id: _device.id,
            name: _device.name,
            localName: _device.localName,
          },
        });
      }
    });
  }

  return {loading, error, data, register};
};
