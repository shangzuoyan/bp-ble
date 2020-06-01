import * as BleUtils from './bleUtils';

describe('test parseDeviceManufacturerData', () => {
  let validDeviceManufacturerData = 'DgIBCS8AAg0AA==';
  let junkDeviceManufacturerData = '0jo';

  let emptyDeviceManufacturerData = {
    companyIdentifierKey: undefined,
    flag: 0,
    inPairingMode: false,
    isTimeSet: false,
    numUsers: 0,
  };

  let deviceManufacturerDataResult = {
    companyIdentifierKey: '020e',
    flag: 9,
    inPairingMode: true,
    numUsers: 1,
    isTimeSet: true,
  };

  test('must return empty device manufacturer data object manufacturerdata is null', () => {
    const result = BleUtils.parseDeviceManufacturerData(null);
    expect(result).toMatchObject(emptyDeviceManufacturerData);
  });

  test('must return a populated manufacturer object', () => {
    const result = BleUtils.parseDeviceManufacturerData(
      validDeviceManufacturerData,
    );
    expect(result).toMatchObject(deviceManufacturerDataResult);
  });
  test('must not crash when device manufacturer data is junky', () => {
    const result = BleUtils.parseDeviceManufacturerData(
      junkDeviceManufacturerData,
    );
    expect(result).toHaveProperty('companyIdentifierKey');
    expect(result.inPairingMode).toBe(false);
  });
});

describe('test parseBloodPressureMeasure', () => {
  const defaultBloodPressureObj = {
    flags: null,
    systolic: null,
    diastolic: null,
    meanPressure: null,
    timeStamp: null,
    pulseRate: null,
    userIndex: null,
    bloodPressureUnits: null,
    timeStampPresent: false,
    pulseRatePresent: false,
    userIdPresent: false,
    measurementStatusPresent: false,
  };

  test('must not crash when blood pressure input is null', () => {
    const result = BleUtils.parseBloodPressureMeasure(null);
    expect(result).toMatchObject(defaultBloodPressureObj);
  });
  test('must not crash when blood pressure input is """"', () => {
    const result = BleUtils.parseBloodPressureMeasure('');
    expect(result).toMatchObject(defaultBloodPressureObj);
  });
  test('must not crash when  blood pressure input is junky', () => {
    const result = BleUtils.parseBloodPressureMeasure('poiop234o234');
    expect(result).toMatchObject(defaultBloodPressureObj);
  });
});
