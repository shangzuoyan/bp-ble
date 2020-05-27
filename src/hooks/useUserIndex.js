import React from 'react';
import {fullUUID} from 'react-native-ble-plx';
import {Buffer} from 'buffer';

import * as BP_Utils from '../utils/bleUtils';
import * as StorageUtils from '../utils/storageUtil';
import Context from '../contexts/BP_BLE_Context';

const USER_DATA_SERVICE = '181C';
const USER_CONTROL_POINT_CHARACTERISTIC = '2A9F';
export default (onReceiveUserIndex) => {
  const {bleManager} = React.useContext(Context);

  const [error, setError] = React.useState(undefined);
  const [data, setData] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  function writeUserIndex(deviceId) {
    console.log('writeUserIndex', deviceId);
    const buf = new Buffer.allocUnsafe(4);
    buf.writeUInt8(0x40, 0);
    buf.writeUInt8(0x03, 1);
    buf.writeUInt16LE(0x2222, 2);
    const value = buf.toString('base64');
    console.log(value);
    bleManager
      .writeCharacteristicWithoutResponseForDevice(
        deviceId,
        fullUUID(USER_DATA_SERVICE),
        fullUUID(USER_CONTROL_POINT_CHARACTERISTIC),
        value,
      )
      .catch((err) => {
        console.log(err);
        setError('Error setting UserIndex');
      });
  }
  function getUserIndex(deviceId) {
    console.log('getUserIndex', deviceId);
    // const buf = new Buffer.allocUnsafe(4);
    // buf.writeUInt8(0x40, 0);
    // buf.writeUInt8(0x03, 1);
    // buf.writeUInt16LE(0x2222, 2);
    // const value = buf.toString('base64');
    // console.log(value);
    bleManager.monitorCharacteristicForDevice(
      deviceId,
      fullUUID(USER_DATA_SERVICE),
      fullUUID(USER_CONTROL_POINT_CHARACTERISTIC),
      onReceiveUserIndex,
    );
  }
  return {error, loading, data, writeUserIndex, getUserIndex};
};
