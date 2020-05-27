import React from 'react';

import Context from '../contexts/BP_BLE_Context';

import {BLE_TIMEOUT_IN_SECONDS} from '../utils/bleUtils';

export default function useConnection() {
  const {bleManager} = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  function connect(deviceId) {
    console.log('Connect: to device', deviceId);
    setLoading(true);

    bleManager
      .connectToDevice(deviceId, {timeout: BLE_TIMEOUT_IN_SECONDS * 1000})
      .then((device) => {
        console.log('Device connected', device.name);
        bleManager
          .discoverAllServicesAndCharacteristicsForDevice(deviceId)
          .then((results) => {
            console.log('Discover All Services & Characteristics');

            bleManager.isDeviceConnected(device.id).then(async (status) => {
              console.log('connected', status);

              bleManager.servicesForDevice(device.id).then((services) => {
                console.log('Get all services');
              });

              setData({success: true});
              setLoading(false);
              setError(false);
            });
          });
      })
      .catch((err) => {
        console.log('Error connecting', err);
        setData(undefined);
        setLoading(false);
        setError({error: err});
      });
  }

  return {loading, error, data, connect};
}
