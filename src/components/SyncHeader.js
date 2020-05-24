import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

export default function SyncHeader({transfer}) {
  const {timeSyncStarted} = transfer;

  return (
    <View style={styles.container}>
      <Text
        style={styles.element}>{`Time transferred: ${timeSyncStarted}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  element: {color: 'gray', fontSize: 20, marginVertical: 10},
});
