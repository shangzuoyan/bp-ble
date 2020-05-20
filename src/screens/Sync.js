import React from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function Sync() {
  return (
    <View style={styles.container}>
      <Text>Sync</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Pair your new Omron Monitor now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', paddingHorizontal: 20},
  button: {
    alignItems: 'center',
    backgroundColor: '#F95700FF',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
