import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {UNREGISTER_DEVICE} from '../reducers/bloodPressureReducer';
import BloodPressureContext from '../contexts/BloodPressureContext';
import LogContext from '../contexts/LogContext';

import BP_BLE_Provider from '../contexts/BP_BLE_Provider';

import BP_MonitorInteractionModal from '../components/BP_MonitorInteractionModal';
import RegistrationModeContainer from '../components/RegistrationModeContainer';
import SyncModeContainer from '../components/SyncModeContainer';
import RegisteredDevice from '../components/RegisteredDevice';

export default function Sync({navigation}) {
  const [state, dispatch] = React.useContext(BloodPressureContext);
  const {error, info, warn} = React.useContext(LogContext);

  const [
    isBpInteractionWindowOpen,
    setBPInteractionWindowOpen,
  ] = React.useState(false);
  const [syncMode, setSyncMode] = React.useState(false);

  const onSuccess = () => {
    setBPInteractionWindowOpen(false);
    navigation.navigate('History');
  };

  const onClose = () => {
    setBPInteractionWindowOpen(false);
  };

  const openBpInteractionWindow = () => {
    setSyncMode(state.isPaired);
    setBPInteractionWindowOpen(true);
  };

  const unRegisterDevice = () => {
    dispatch({type: UNREGISTER_DEVICE});
  };

  return (
    <View style={styles.container}>
      <BP_MonitorInteractionModal
        visible={isBpInteractionWindowOpen}
        onRequestClose={onClose}>
        <BP_BLE_Provider error={error} warn={warn} info={info}>
          {isBpInteractionWindowOpen ? (
            syncMode ? (
              <SyncModeContainer onClose={onClose} onSuccess={onSuccess} />
            ) : (
              <RegistrationModeContainer
                onClose={onClose}
                onSuccess={onSuccess}
              />
            )
          ) : null}
        </BP_BLE_Provider>
      </BP_MonitorInteractionModal>
      {state.isPaired ? (
        <>
          <RegisteredDevice
            device={state.device}
            onUnregister={unRegisterDevice}
          />

          <TouchableOpacity
            style={[styles.button, styles.buttonTransfer]}
            onPress={openBpInteractionWindow}>
            <Text style={styles.buttonText}>
              Sync new Blood Pressure Readings
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.buttonRegister]}
          onPress={openBpInteractionWindow}>
          <Text style={styles.buttonText}>
            Register your blood pressure monitor
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},

  button: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#CECECE',
    marginBottom: 12,
    marginHorizontal: 12,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  buttonTransfer: {
    backgroundColor: '#00A4CCFF',
  },
  buttonRegister: {
    backgroundColor: '#F95700FF',
  },
});
