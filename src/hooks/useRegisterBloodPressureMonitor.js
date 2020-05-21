import React from 'react';
import {fullUUID} from 'react-native-ble-plx';

import * as BP_Utils from '../utils/bleUtil';
import * as StorageUtils from '../utils/storageUtil';

import Context from '../contexts/BP_BLE_Context';
export default () => {
  const {bleManager} = React.useContext(Context);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  function register(deviceId) {
    console.log('Registering');
    setLoading(true);
    bleManager
      .connectToDevice(deviceId)
      .then((device) => {
        console.log('connectToDevice', device.name);
        bleManager
          .discoverAllServicesAndCharacteristicsForDevice(deviceId)
          .then((results) => {
            bleManager.isDeviceConnected(device.id).then(async (status) => {
              console.log('connected', status);

              bleManager.servicesForDevice(device.id).then((services) => {});

              await StorageUtils.storeRegistration({
                id: deviceId,
                name: device.name,
                localName: device.localName,
              });

              setData({result: 'Success connecting'});
              setLoading(false);
              setError(false);
            });
          });
      })
      .catch((error) => {
        console.log(error);
        setData(undefined);
        setLoading(false);
        setError({error: 'Error while registering'});
      });
  }

  return {loading, error, data, register};
};
