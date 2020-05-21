import React from 'react';

import {
  StyleSheet,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from 'react-native';

export default function Loading({loading, operation}) {
  return loading ? (
    <Modal
      presentationStyle="overFullScreen"
      transparent={true}
      visible={loading}>
      <SafeAreaView style={styles.overlay}>
        {operation ? <Text style={styles.message}>{operation}</Text> : null}
        <ActivityIndicator animating={loading} size="large" color="#00A4CCFF" />
      </SafeAreaView>
    </Modal>
  ) : null;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  message: {
    textAlign: 'center',
    color: '#00A4CCFF',
    fontSize: 20,
    fontWeight: '700',
  },
});
