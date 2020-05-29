import React from 'react';

import Context from '../contexts/BP_BLE_Context';

import {BLE_TIMEOUT_IN_SECONDS} from '../utils/bleUtils';

export default function useConnection() {
  const {bleManager, logError, logWarn, logInfo} = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  function connect(deviceId) {
    logInfo(`Connect to monitor with deviceID:${deviceId}`);
    setLoading(true);

    bleManager
      .connectToDevice(deviceId, {timeout: BLE_TIMEOUT_IN_SECONDS * 1000})
      .then((device) => {
        logInfo(`Monitor connected with name: ${device.name}`);

        logInfo('Start Discovery of all services and characteristics');
        bleManager
          .discoverAllServicesAndCharacteristicsForDevice(deviceId)
          .then((results) => {
            bleManager.isDeviceConnected(device.id).then(async (status) => {
              logInfo(`Monitor in connected status ${status}`);

              bleManager.servicesForDevice(device.id).then((services) => {
                logInfo('Obtained all services');
              });

              setData({success: true});
              setLoading(false);
              setError(false);
            });
          });
      })
      .catch((err) => {
        logError(`Error connecting: ${JSON.stringify(err)}`);
        setData(undefined);
        setLoading(false);
        setError({error: err});
      });
  }

  function disconnect(deviceId) {
    logInfo(`Disconnecting from monitor with deviceID:${deviceId}`);
    bleManager.cancelDeviceConnection(deviceId);
  }

  return {loading, error, data, connect, disconnect};
}
