import React from 'react';
import {BleManager, fullUUID} from 'react-native-ble-plx';

import * as BP_Utils from '../utils/bleUtil';

const POWERED_ON = 'PoweredOn';

let bleManager;

export default () => {
  const [deviceName, setDeviceName] = React.useState('');
  const [deviceId, setDeviceId] = React.useState('');
  const [manufacturerData, setManufacturerData] = React.useState('');
  const [inPairingMode, setInPairingMode] = React.useState(0);
  const [isBleReady, setIsBleReady] = React.useState(false);

  const [services, setServices] = React.useState([]);
  const [chars, setChars] = React.useState([]);
  const [currentService, setCurrentService] = React.useState('');
  const [currentChar, setCurrentChar] = React.useState('');
  const [charValue, setCharValue] = React.useState('');
  const [isConnected, setIsConnected] = React.useState(false);
  const [bloodPressure, setBloodPressure] = React.useState([]);

  React.useEffect(() => {
    bleManager = new BleManager();

    const subscription = bleManager.onStateChange((state) => {
      if (state === POWERED_ON) {
        setIsBleReady(true);
        subscription.remove();
      }
    }, true);
    return () => {
      if (bleManager) bleManager.destroy();
      bleManager = null;
    };
  }, []);

  function find() {
    if (!bleManager) return;
    bleManager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        // console.log(error);
        return;
      }
      if (device.name && device.name.startsWith('BP')) {
        setDeviceName(device.name || 'No Name');
        setDeviceId(device.id);
        console.log('LOCALNAME', device.localName);
        const manuData = BP_Utils.parseDeviceManufacturerData(
          device.manufacturerData,
        );
        const inPairMode = BP_Utils.isDeviceInPairingMode(manuData);
        // let manuData = device.manufacturerData;
        // manuData = Buffer.from(manuData, "base64");
        // manuData = manuData.toString("hex");
        // let pair = manuData[7];
        // let inPairMode = pair & IN_PAIRING_MODE;
        // console.log(inPairMode);
        setInPairingMode(inPairMode);
        setManufacturerData(manuData);
        bleManager.isDeviceConnected(device.id).then((status) => {
          setIsConnected(status);
        });
      }
    });
  }

  const connect = () => {
    bleManager.connectToDevice(deviceId).then((device) => {
      // console.log("CONNECTED", device.name);
      bleManager
        .discoverAllServicesAndCharacteristicsForDevice(deviceId)
        .then((results) => {
          // console.log(results);
          bleManager.isDeviceConnected(device.id).then((status) => {
            // console.log("connected", status);
            setIsConnected(status);
            bleManager.servicesForDevice(device.id).then((services) => {
              // console.log(services);
              const _services = services.map(({id, uuid}) => ({
                id,
                uuid,
              }));
              setServices([..._services]);
            });
          });
        });
    });
    // .catch((error) => console.log(error));
  };

  const onReceiveBloodPressure = (error, bloodChar) => {
    console.log('onReceiveBloodPressure', error, bloodChar);
    console.log('Current bp', bloodPressure);
    if (!error) {
      const bloodCharValue = bloodChar.value;
      console.log('bloodPressure', bloodCharValue);

      const bloodMeasure = BP_Utils.parseBloodPressureMeasure(bloodCharValue);

      setBloodPressure([
        ...bloodPressure,
        {
          userIndex: bloodMeasure.userIndex,
          systolic: bloodMeasure.systolic,
          diastolic: bloodMeasure.diastolic,
          timeStamp: bloodMeasure.timeStamp,
          pulseRate: bloodMeasure.pulseRate,
        },
      ]);
    }
  };

  function getBloodPressure() {
    setBloodPressure([]);

    const subscribeToChanges = bleManager.monitorCharacteristicForDevice(
      deviceId,
      fullUUID(BP_Utils.BLE_BLOOD_PRESSURE_SERVICE),
      fullUUID(BP_Utils.BLE_BLOOD_PRESSURE_MEASURE_CHARACTERISTIC),
      onReceiveBloodPressure,
    );
  }

  return [
    inPairingMode,
    deviceId,
    isConnected,
    find,
    connect,
    bloodPressure,
    getBloodPressure,
  ];
};
