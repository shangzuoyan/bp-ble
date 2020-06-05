import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text, Button} from 'react-native';

export default function Loading({message}) {
  return (
    <View style={styles.container}>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <ActivityIndicator animating={true} size="large" color="#00A4CCFF" />
    </View>
  );
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
