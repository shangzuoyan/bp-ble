import React from 'react';

import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';

export default function Loading({loading, operation}) {
  return loading ? (
    <View style={styles.container}>
      {operation ? <Text style={styles.message}>{operation}</Text> : null}
      <ActivityIndicator animating={loading} size="large" color="#00A4CCFF" />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#00A4CCFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
});
