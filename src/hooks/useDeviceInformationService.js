import React from 'react';

import {Buffer} from 'buffer';
import Context from '../contexts/BP_BLE_Context';

const BLE_BP_DEVICE_INFORMATION_SERVICE = '180A';
const HARDWARE_REVISION_CHARACTERISTIC = '2A27';
const MODEL_NUMBER_CHARACTERISTIC = '2A24';
const SOFTWARE_REVISION_CHARACTERISTIC = '2A28';
const SERIAL_NUMBER_CHARACTERISTIC = '2A25';
const MANUFACTURER_NAME_CHARACTERISTIC = '2A29';
const FIRMWARE_REVISION_CHARACTERISTIC = '2A26';
const SYSTEM_ID_CHARACTERISTIC = '2A23';

export default function useDeviceInformationService() {
  const {bleManager, logInfo, logWarn, logError} = React.useContext(Context);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);

  async function getDeviceInfo(deviceId) {
    logInfo('Get device info ');
    setLoading(true);
    try {
      logInfo('Getting HARDWARE_REVISION_CHARACTERISTIC');

      const hardwareRevisionChar = await bleManager.readCharacteristicForDevice(
        deviceId,
        BLE_BP_DEVICE_INFORMATION_SERVICE,
        HARDWARE_REVISION_CHARACTERISTIC,
      );

      const hardwareRevisionBuffer = Buffer.from(
        hardwareRevisionChar.value,
        'base64',
      );

      const hardwareRevision = hardwareRevisionBuffer.toString();

      logInfo('Hardware Revision', hardwareRevision);

      const modelNumberChar = await bleManager.readCharacteristicForDevice(
        deviceId,
        BLE_BP_DEVICE_INFORMATION_SERVICE,
        MODEL_NUMBER_CHARACTERISTIC,
      );

      const modelNumberBuffer = Buffer.from(modelNumberChar.value, 'base64');

      const modelNumber = modelNumberBuffer.toString();

      logInfo('Model Number', modelNumber);

      const manufacturerNameChar = await bleManager.readCharacteristicForDevice(
        deviceId,
        BLE_BP_DEVICE_INFORMATION_SERVICE,
        MANUFACTURER_NAME_CHARACTERISTIC,
      );

      const manufacturerNameBuffer = Buffer.from(
        manufacturerNameChar.value,
        'base64',
      );

      const manufacturerName = manufacturerNameBuffer.toString();

      logInfo('Manufacturer Name', manufacturerName);

      setData({deviceInfo: {manufacturerName, modelNumber, hardwareRevision}});
      setLoading(false);
      setError(undefined);
    } catch (err) {
      logError(`Error getting device information: ${JSON.stringify(err)}`);
      setError(err);
      setLoading(false);
      setData(undefined);
    }
  }

  return {loading, error, data, getDeviceInfo};
}
