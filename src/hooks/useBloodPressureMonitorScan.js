import React from 'react';

import Context from '../contexts/BP_BLE_Context';
import * as BP_Utils from '../utils/bleUtils';

export default function useBloodPressureMonitorScan() {
  const {bleManager, bluetoothState, logInfo, logError} = React.useContext(
    Context,
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    return () => {
      if (scanTimeoutId) clearTimeout(scanTimeoutId);
    };
  }, []);
  //We need a ref because timeoutHandler is a closure and cannot access current value of data
  const dataRef = React.useRef(data);
  dataRef.current = data;

  function timeoutHandler() {
    bleManager.stopDeviceScan();
    setLoading(false);
    logInfo(
      `useBloodPressureMonitorScan: Scan timed out after ${BP_Utils.BLE_SCAN_TIMEOUT_IN_SECONDS} seconds`,
    );
    logInfo(
      `useBloodPressureMonitorScan: List of monitors found - ${JSON.stringify(
        data,
      )}`,
    );

    if (Object.keys(dataRef.current).length) {
      //Do not set error.  Return data found so far
      return;
    } else {
      //No data found.  Set timeout error
      setError({
        error: `useBloodPressureMonitorScan: Scan timed out after ${BP_Utils.BLE_SCAN_TIMEOUT_IN_SECONDS} seconds without finding blood pressure monitors`,
      });
    }
  }

  let scanTimeoutId;

  function stopScan() {
    logInfo('useBloodPressureMonitorScan: Stop Scan command issued');
    if (scanTimeoutId) clearTimeout(scanTimeoutId);
    setLoading(false);
    setError(undefined);
    setData({});
    bleManager.stopDeviceScan();
  }

  //scan for blood pressure peripherals aggregating data for each peripheral
  function scan() {
    logInfo('useBloodPressureMonitorScan: Started Bluetooth Scan');
    if (!bleManager) {
      logError(
        'useBloodPressureMonitorScan: bleManager has not been initialized.',
      );
      return;
    }
    setLoading(true);

    scanTimeoutId = setTimeout(
      timeoutHandler,
      BP_Utils.BLE_SCAN_TIMEOUT_IN_SECONDS * 1000,
    );

    //Begin BLE scan
    bleManager.startDeviceScan(
      [BP_Utils.BLE_BLOOD_PRESSURE_SERVICE],
      {allowDuplicates: true},
      async (_error, _device) => {
        if (_error) {
          logError(
            `useBloodPressureMonitorScan: Bluetooth scan error: ${_error}`,
          );
          setData({});
          setLoading(false);
          setError(_error);
          return;
        } else {
          //The scan found a device with Blood pressure service
          logInfo(
            `useBloodPressureMonitorScan: Found Monitor with Blood Pressure Service: Name: ${_device.name} LocalName: ${_device.localName} ManufacturerData: ${_device.manufacturerData}`,
          );
          let manuData;
          if (_device.manufacturerData) {
            manuData = BP_Utils.parseDeviceManufacturerData(
              _device.manufacturerData,
            );
            logInfo(
              `useBloodPressureMonitorScan: Manufacturer data decoded: ${JSON.stringify(
                manuData,
              )}`,
            );

            if (
              manuData.companyIdentifierKey ===
              BP_Utils.OMRON_COMPANY_IDENTIFIER_KEY
            ) {
              if (!manuData.inPairingMode) {
                logError(
                  `useBloodPressureMonitorScan: Monitor is not in pairing mode: manufacturerData flag: ${manuData.flag}`,
                );
              }
            } else {
              logInfo(
                `useBloodPressureMonitorScan: Not an Omron monitor ${manuData.companyIdentifierKey}`,
              );
              if (scanTimeoutId) {
                clearTimeout(scanTimeoutId);
              }
              setLoading(false);
              bleManager.stopDeviceScan();
            }
          }

          const aggDeviceData = {
            name: _device.name
              ? _device.name
              : dataRef.current[_device.id]
              ? dataRef.current[_device.id].name
              : undefined,
            localName: _device.localName
              ? _device.localName
              : dataRef.current[_device.id]
              ? dataRef.current[_device.id].localName
              : undefined,
            manufacturerData: _device.manufacturerData
              ? _device.manufacturerData
              : dataRef.current[_device.id]
              ? dataRef.current[_device.id].manufacturerData
              : undefined,
            parsedManuData: manuData
              ? manuData
              : dataRef.current[_device.id]
              ? dataRef.current[_device.id].parsedManuData
              : undefined,
          };
          logInfo(
            `useBloodPressureMonitorScan: Aggregated data for ${
              _device.id
            }: ${JSON.stringify(aggDeviceData)}`,
          );

          setData((_data) => ({..._data, [_device.id]: aggDeviceData}));
        }
      },
    );
  }

  return {loading, error, data, scan, bluetoothState, stopScan};
}
