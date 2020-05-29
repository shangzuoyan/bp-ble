import {Buffer} from 'buffer';

const IN_PAIRING_MODE = 8;
const TIME_IS_SET = 1;

export const BLE_TIMEOUT_IN_SECONDS = 30;
export const BLE_BLOOD_PRESSURE_SERVICE = '1810';
export const BLE_BP_CURRENT_TIME_SERVICE = '1805';
export const BLE_BP_USER_DATA_SERVICE = '181C';

export const parseBloodPressureMeasure = (bloodPressureMeasureBase64) => {
  const bloodPressureMeasure = {
    flags: null,
    systolic: null,
    diastolic: null,
    meanPressure: null,
    timeStamp: null,
    pulseRate: null,
    userIndex: null,
  };

  if (!bloodPressureMeasureBase64) {
    return bloodPressureMeasure;
  }

  let bloodPressureBuffer = Buffer.from(bloodPressureMeasureBase64, 'base64');
  // bloodPressureBuffer = new Uint8Array(bloodPressureBuffer, 0, 1);
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

  let timeStamp;
  if (!year) {
    //For now set timestamp to current time if time is not set on bp reading.  TODO
    timeStamp = new Date();
  } else timeStamp = new Date(year, month, day, hour, minute, second);

  bloodPressureMeasure.timeStamp = timeStamp;

  return bloodPressureMeasure;
};

export const parseDeviceManufacturerData = (deviceManufacturerDataBase64) => {
  let deviceManufacturerData = {
    companyIdentifierKey: undefined,
    flag: 0,
  };

  if (!deviceManufacturerDataBase64) {
    return deviceManufacturerData;
  }

  let deviceManufacturerBuffer = Buffer.from(
    deviceManufacturerDataBase64,
    'base64',
  );

  deviceManufacturerBuffer = new Uint8Array(deviceManufacturerBuffer, 0, 1);

  deviceManufacturerData = {
    companyIdentifierKey: deviceManufacturerBuffer,
    flag: deviceManufacturerBuffer[3],
  };

  return deviceManufacturerData;
};

export const isDeviceInPairingMode = (deviceManufacturerData) => {
  return deviceManufacturerData.flag & IN_PAIRING_MODE;
};

export const isTimeSetOnDevice = (deviceManufacturerData) => {
  return deviceManufacturerData.flag & TIME_IS_SET;
};
