import React from 'react';

import Context from '../contexts/BP_BLE_Context';
import * as BL_Utils from '../utils/bleUtils';

export default function useConnection() {
  const {bleManager, logError, logInfo, bluetoothState} = React.useContext(
    Context,
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  function connect(deviceId) {
    logInfo(`useConnection: Connect to monitor with deviceID:${deviceId}`);
    setLoading(true);

    bleManager
      .connectToDevice(deviceId, {
        timeout: BL_Utils.BLE_CONNECTION_TIMEOUT_IN_SECONDS * 1000,
      })
      .then((device) => {
        logInfo(
          `useConnection: Monitor connected to device: ${JSON.stringify({
            id: device.id,
            name: device.name,
            localName: device.localName,
          })}`,
        );

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

              setData({success: true, name: device.name});
              setLoading(false);
              setError(undefined);
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

  return {loading, error, data, connect, disconnect, bluetoothState};
}
