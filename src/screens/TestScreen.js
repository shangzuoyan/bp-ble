import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
// import Constants from "expo-constants";

import useBloodPressureManager from '../hooks/useBloodPressureManager';
const styles = StyleSheet.create({
  serviceButton: {
    borderWidth: 2,
    backgroundColor: 'blue',
  },
  container: {
    flex: 1,
    marginTop: 24, //Constants.statusBarHeight,
  },
});
export default function TestScreen() {
  const [
    inPairingMode,
    deviceId,
    isConnected,
    find,
    connect,
    bloodPressure,
    getBloodPressure,
  ] = useBloodPressureManager();
  return (
    <View>
      <Button title="FIND ALL" onPress={find}></Button>
      <Text>{inPairingMode ? 'IN PAIRING MODE' : 'NO'}</Text>
      <Text>{deviceId}</Text>
      <Button title="CONNECT" onPress={connect}></Button>
      <Text>{isConnected ? 'CONNECTED' : 'NO'}</Text>
      <Button title="BLOOD_PRESSURE" onPress={getBloodPressure}></Button>
      <View>
        {bloodPressure.map((blood) => (
          <Text>
            Pressure:
            {`${blood.userIndex}: ${blood.systolic}/${blood.diastolic} 
          ${blood.pulseRate}
          ${blood.timeStamp.toString()}`}
          </Text>
        ))}
      </View>
    </View>
  );
}
