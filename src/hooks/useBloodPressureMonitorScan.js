import React from 'react';

import Context from '../contexts/BP_BLE_Context';

import * as BP_Utils from '../utils/bleUtils';

export default function useBloodPuseressureMonitorScan() {
  const {
    bleManager,
    bluetoothState,
    logInfo,
    logError,
    logWarn,
  } = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  function scan() {
    logInfo('useBloodPressureMonitorScan: Started Bluetooth Scan');
    if (!bleManager) {
      logError(
        'useBloodPressureMonitorScan: bleManager has not been initialized.',
      );
      return;
    }

    setLoading(true);

    const timeoutID = setTimeout(() => {
      logError(
        `useBloodPressureMonitorScan: Scan timed out after ${BP_Utils.BLE_TIMEOUT_IN_SECONDS} seconds`,
      );
      bleManager.stopDeviceScan();
      setLoading(false);
      setData(undefined);
      setError({
        error: `useBloodPressureMonitorScan: Scan timed out after ${BP_Utils.BLE_TIMEOUT_IN_SECONDS} seconds`,
      });
    }, BP_Utils.BLE_TIMEOUT_IN_SECONDS * 1000);

    bleManager.startDeviceScan(
      [BP_Utils.BLE_BLOOD_PRESSURE_SERVICE],
      null,
      async (_error, _device) => {
        if (_error) {
          logError(
            `useBloodPressureMonitorScan: Bluetooth scan error: ${_error}`,
          );
          setError(_error);
          return;
        }

        logInfo(
          `useBloodPressureMonitorScan: Found Monitor with Blood Pressure Service: Name: ${_device.name} LocalName: ${_device.localName} ManufacturerData: ${_device.manufacturerData}`,
        );

        const manuData = BP_Utils.parseDeviceManufacturerData(
          _device.manufacturerData,
        );
        logInfo(
          `useBloodPressureMonitorScan: Manufacturer data decoded: ${JSON.stringify(
            manuData,
          )}`,
        );

        const inPairMode = BP_Utils.isDeviceInPairingMode(manuData);

        if (!inPairMode) {
          logError(
            `useBloodPressureMonitorScan: Monitor is not in pairing mode: manufacturerData flag: ${manuData.flag}`,
          );
          return;
        }

        // if (_device.name && _device.name.startsWith('BP')) {
        logInfo(
          `useBloodPressureMonitorScan: Monitor found in pairing mode with deviceId: ${_device.id}`,
        );
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
        // }
      },
    );
  }

  return {loading, error, data, scan, bluetoothState};
}
