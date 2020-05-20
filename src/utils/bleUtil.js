import {Buffer} from 'buffer';

// const bloodPressureMeasureValue = "HoQAWgBoAOQHBRIMKRVnAAIAAA==";
const IN_PAIRING_MODE = 8;
const TIME_IS_SET = 1;

export const BLE_SCAN_TIMEOUT_IN_SECONDS = 30;
export const BLE_BLOOD_PRESSURE_SERVICE = '1810';
export const BLE_BLOOD_PRESSURE_MEASURE_CHARACTERISTIC = '2A35';
export const BLE_BP_BATTERY_SERVICE = '180F';
export const BLE_BP_CURRENT_TIME_SERVICE = '1805';
export const BLE_BP_USER_DATA_SERVICE = '181C';
export const BLE_BP_DEVICE_INFORMATION_SERVICE = '180A';
export const BLE_BP_DEVICE_MANUFACTURER_NAME_CHARACTERISTIC = '2A29';

export const parseBloodPressureMeasure = (bloodPressureMeasureBase64) => {
  let bloodPressureBuffer = Buffer.from(bloodPressureMeasureBase64, 'base64');
  console.log(bloodPressureBuffer.toString('hex'));
  // bloodPressureBuffer = new Uint8Array(bloodPressureBuffer, 0, 1);
  console.log(bloodPressureBuffer);
  const bloodPressureMeasure = {
    flags: null,
    systolic: null,
    diastolic: null,
    meanPressure: null,
    timeStamp: null,
    pulseRate: null,
    userIndex: null,
  };
  bloodPressureMeasure.flags = bloodPressureBuffer[0];
  bloodPressureMeasure.systolic = bloodPressureBuffer.readUInt16LE(1);
  bloodPressureMeasure.diastolic = bloodPressureBuffer.readUInt16LE(3);
  bloodPressureMeasure.pulseRate = bloodPressureBuffer.readUInt16LE(14);
  bloodPressureMeasure.userIndex = bloodPressureBuffer.readUInt8(16);

  const year = bloodPressureBuffer.readUInt16LE(7);
  const month = bloodPressureBuffer.readUInt8(9) - 1;
  const day = bloodPressureBuffer.readUInt8(10);
  const hour = bloodPressureBuffer.readUInt8(11);
  const minute = bloodPressureBuffer.readUInt8(12);
  const second = bloodPressureBuffer.readUInt8(13);

  const timeStamp = new Date(year, month, day, hour, minute, second);
  bloodPressureMeasure.timeStamp = timeStamp;

  console.log('bloodPressureMeasure', bloodPressureMeasure);
  return bloodPressureMeasure;
};

export const parseDeviceManufacturerData = (deviceManufacturerDataBase64) => {
  console.log('parseDeviceManufacturerData');
  let deviceManufacturerBuffer = Buffer.from(
    deviceManufacturerDataBase64,
    'base64',
  );
  console.log(
    'parseDeviceManufacturerData',
    deviceManufacturerBuffer.toString('hex'),
  );
  deviceManufacturerBuffer = new Uint8Array(deviceManufacturerBuffer, 0, 1);

  const deviceManufacturerData = {
    companyIdentifierKey: deviceManufacturerBuffer,
    flag: deviceManufacturerBuffer[3],
  };

  return deviceManufacturerData;
};

export const isDeviceInPairingMode = (deviceManufacturerData) => {
  console.log(
    'isDeviceInPairingMode',
    deviceManufacturerData.flag & IN_PAIRING_MODE,
  );
  return deviceManufacturerData.flag & IN_PAIRING_MODE;
};

export const isTimeSetOnDevice = (deviceManufacturerData) => {
  return deviceManufacturerData.flag & TIME_IS_SET;
};
