import React from 'react';

import Context from '../contexts/BP_BLE_Context';

import {BLE_TIMEOUT_IN_SECONDS} from '../utils/bleUtils';

export default function useConnection() {
  const {bleManager, logError, logWarn, logInfo} = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  function connect(deviceId) {
    logInfo(`useConnection: Connect to monitor with deviceID:${deviceId}`);
    setLoading(true);

    bleManager
      .connectToDevice(deviceId, {timeout: BLE_TIMEOUT_IN_SECONDS * 1000})
      .then((device) => {
        logInfo(`useConnection: Monitor connected with name: ${device.name}`);

        logInfo(
          'useConnection: Start Discovery of all services and characteristics',
        );
        bleManager
          .discoverAllServicesAndCharacteristicsForDevice(deviceId)
          .then((results) => {
            bleManager.isDeviceConnected(device.id).then(async (status) => {
              logInfo(`useConnection: Monitor in connected status ${status}`);

              bleManager
                .servicesForDevice(device.id)
                .then((services) => {
                  logInfo('useConnection: Obtained all services');
                })
                .catch((_err) => {
                  logError(
                    `useConnection: Error connecting: ${JSON.stringify(_err)}`,
                  );
                  setData(undefined);
                  setLoading(false);
                  setError({error: _err});
                });

              setData({success: true});
              setLoading(false);
              setError(false);
            });
          })
          .catch((_err) => {
            logError(
              `useConnection: Error connecting: ${JSON.stringify(_err)}`,
            );
            setData(undefined);
            setLoading(false);
            setError({error: _err});
          });
      })
      .catch((err) => {
        logError(`useConnection: Error connecting: ${JSON.stringify(err)}`);
        setData(undefined);
        setLoading(false);
        setError({error: err});
      });
  }

  function disconnect(deviceId) {
    logInfo(
      `useConnection: Disconnecting from monitor with deviceID:${deviceId}`,
    );
    bleManager
      .cancelDeviceConnection(deviceId)
      .then((result) => {
        logInfo(
          `useConnection: Disconnected from monitor with deviceID:${deviceId}`,
        );
      })
      .catch((err) => {
        logError(`useConnection: Error Disconnecting: ${JSON.stringify(err)}`);
      });
  }

  return {loading, error, data, connect, disconnect};
}
