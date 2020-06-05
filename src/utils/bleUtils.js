import {Buffer} from 'buffer';

const IN_PAIRING_MODE = 8;
const TIME_IS_SET = 1;

//Data flags
const BLOOD_PRESSURE_UNITS = 1;
const TIME_STAMP_PRESENT = 1 << 1;
const PULSE_RATE_PRESENT = 1 << 2;
const USER_ID_PRESENT = 1 << 3;
const MEASUREMENT_STATUS_PRESENT = 1 << 4;

export const OMRON_COMPANY_IDENTIFIER_KEY = '020e';
export const OMRON_COMPANY_NAME = 'Omron Healthcare Co., LTD';
export const BLE_SCAN_TIMEOUT_IN_SECONDS = 10;
export const BLE_CONNECTION_TIMEOUT_IN_SECONDS = 30;
export const BLE_TIMEOUT_IN_SECONDS = 10;
export const BLE_BLOOD_PRESSURE_SERVICE = '1810';
export const BLE_BP_CURRENT_TIME_SERVICE = '1805';
export const BLE_BP_USER_DATA_SERVICE = '181C';

export const parseBloodPressureMeasure = (bloodPressureMeasureBase64) => {
  const bloodPressureMeasure = {
    flags: undefined,
    systolic: undefined,
    diastolic: undefined,
    timeStamp: undefined,
    pulseRate: undefined,
    userIndex: undefined,
    bloodPressureUnits: undefined,
    timeStampPresent: false,
    pulseRatePresent: false,
    userIdPresent: false,
    measurementStatusPresent: false,
  };

  if (!bloodPressureMeasureBase64) {
    return bloodPressureMeasure;
  }

  let bloodPressureBuffer;

  try {
    bloodPressureBuffer = Buffer.from(bloodPressureMeasureBase64, 'base64');
  } catch (err) {
    return bloodPressureMeasure;
  }
  // bloodPressureBuffer = new Uint8Array(bloodPressureBuffer, 0, 1);
  if (bloodPressureBuffer.byteLength >= 1) {
    bloodPressureMeasure.flags = bloodPressureBuffer[0];

    bloodPressureMeasure.bloodPressureUnits =
      bloodPressureMeasure.flags & BLOOD_PRESSURE_UNITS ? 'kPa' : 'mmHg';
    bloodPressureMeasure.timeStampPresent =
      bloodPressureMeasure.flags & TIME_STAMP_PRESENT ? true : false;
    bloodPressureMeasure.pulseRatePresent =
      bloodPressureMeasure.flags & PULSE_RATE_PRESENT ? true : false;
    bloodPressureMeasure.userIdPresent =
      bloodPressureMeasure.flags & USER_ID_PRESENT ? true : false;
    bloodPressureMeasure.measurementStatusPresent =
      bloodPressureMeasure.flags & MEASUREMENT_STATUS_PRESENT ? true : false;
  } else {
    return bloodPressureMeasure;
  }
  if (bloodPressureBuffer.byteLength >= 5) {
    bloodPressureMeasure.systolic = bloodPressureBuffer.readUInt16LE(1);
    bloodPressureMeasure.diastolic = bloodPressureBuffer.readUInt16LE(3);
  } else {
    return bloodPressureMeasure;
  }

  let timeStamp = null;

  if (
    bloodPressureMeasure.timeStampPresent &&
    bloodPressureBuffer.byteLength >= 13
  ) {
    const year = bloodPressureBuffer.readUInt16LE(7);

    if (year !== 0) {
      const month = bloodPressureBuffer.readUInt8(9) - 1;
      const day = bloodPressureBuffer.readUInt8(10);
      const hour = bloodPressureBuffer.readUInt8(11);
      const minute = bloodPressureBuffer.readUInt8(12);
      const second = bloodPressureBuffer.readUInt8(13);
      timeStamp = new Date(year, month, day, hour, minute, second);
      bloodPressureMeasure.timeStamp = timeStamp;
    }
  }

  if (
    bloodPressureMeasure.pulseRatePresent &&
    bloodPressureBuffer.byteLength >= 15
  ) {
    bloodPressureMeasure.pulseRate = bloodPressureBuffer.readUInt16LE(14);
  }

  if (
    bloodPressureMeasure.userIdPresent &&
    bloodPressureBuffer.byteLength >= 16
  ) {
    bloodPressureMeasure.userIndex = bloodPressureBuffer.readUInt8(16);
  }

  return bloodPressureMeasure;
};

export const parseDeviceManufacturerData = (deviceManufacturerDataBase64) => {
  if (!deviceManufacturerDataBase64) {
    return undefined;
  }
  let deviceManufacturerBuffer;
  try {
    deviceManufacturerBuffer = Buffer.from(
      deviceManufacturerDataBase64,
      'base64',
    );
  } catch (err) {
    return undefined;
  }
  let deviceManufacturerData = {
    companyIdentifierKey: undefined,
    flag: undefined,
    inPairingMode: undefined,
    isTimeSet: undefined,
    numUsers: undefined,
  };

  if (deviceManufacturerBuffer.byteLength >= 2) {
    deviceManufacturerData.companyIdentifierKey = (
      '0000' + deviceManufacturerBuffer.readUInt16LE(0, 2).toString(16)
    ).slice(-4);
  }

  if (
    deviceManufacturerData.companyIdentifierKey !== OMRON_COMPANY_IDENTIFIER_KEY
  ) {
    return deviceManufacturerData;
  }

  if (deviceManufacturerBuffer.byteLength >= 2) {
    deviceManufacturerData.numUsers = deviceManufacturerBuffer[2];
  }

  if (deviceManufacturerBuffer.byteLength >= 3) {
    deviceManufacturerData.flag = deviceManufacturerBuffer[3];
  }

  deviceManufacturerData.inPairingMode =
    deviceManufacturerData.flag & IN_PAIRING_MODE ? true : false;

  deviceManufacturerData.isTimeSet =
    deviceManufacturerData.flag & TIME_IS_SET ? true : false;

  return deviceManufacturerData;
};

export const isDeviceInPairingMode = (deviceManufacturerData) => {
  return deviceManufacturerData.flag & IN_PAIRING_MODE ? true : false;
};

export const isTimeSetOnDevice = (deviceManufacturerData) => {
  return deviceManufacturerData.flag & TIME_IS_SET ? true : false;
};
