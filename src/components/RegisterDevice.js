import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import * as BL_Utils from '../utils/bleUtils';
import UserSelection from './UserSelection';

export default function RegisterDevice({devices, onCancel, onRegister}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register Device</Text>
      <ScrollView style={styles.devices}>
        {Object.keys(devices)
          // .filter(
          //   (deviceId) =>
          //     !devices[deviceId].parsedManuData ||
          //     devices[deviceId].parsedManuData.companyIdentifierKey !==
          //       BL_Utils.OMRON_COMPANY_IDENTIFIER_KEY ||
          //     (devices[deviceId].parsedManuData.companyIdentifierKey ===
          //       BL_Utils.OMRON_COMPANY_IDENTIFIER_KEY &&
          //       devices[deviceId].parsedManuData.inPairingMode),
          // )
          .map((deviceId) => (
            <TouchableOpacity
              key={deviceId}
              onPress={() => onRegister({id: deviceId, ...devices[deviceId]})}
              style={styles.device}>
              <Text style={styles.name}>
                {devices[deviceId].name || 'Blood Pressure Monitor'}
              </Text>
              {devices[deviceId].localName ? (
                <Text style={styles.localName}>
                  {devices[deviceId].localName}
                </Text>
              ) : null}
            </TouchableOpacity>
          ))}
      </ScrollView>

      {
        // <UserSelection />
      }
      <View style={styles.actionArea}>
        <Button title="Cancel" onPress={onCancel} color="#F95700FF" />
        {
          // <Button
          //   color="#F95700FF"
          //   title="Register"
          //   onPress={() => {
          //     if (onRegister) onRegister();
          //   }}
          // />
        }
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  devices: {
    flex: 1,
    flexDirection: 'column',
  },
  actionArea: {
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: '#F95700FF',
    marginBottom: 30,
    fontSize: 24,
  },
  device: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#00A4CCFF',
    margin: 4,
    shadowColor: 'rgba(0,0,0, .2)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#00A4CCFF',
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  localName: {
    textAlign: 'center',
    fontSize: 12,
    color: '#fff',

    marginBottom: 10,
  },
});
