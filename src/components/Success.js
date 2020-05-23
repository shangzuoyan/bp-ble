import React from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';

export default function Success({onClose, open}) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Success</Text>
      <Text style={styles.messageText}>
        You have registered your Omron BP monitor successfully!
      </Text>

      <Button
        title="Close"
        onPress={onClose}
        style={styles.button}
        color="#00A4CCFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {color: 'gray', fontSize: 16, marginBottom: 30},

  headerText: {
    textAlign: 'center',
    color: '#00A4CCFF',
    marginBottom: 30,
    fontSize: 24,
  },
  messageText: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 30,
  },
});
