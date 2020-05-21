import React from 'react';

import {StyleSheet, Modal, SafeAreaView, ActivityIndicator} from 'react-native';

export default function Loading({loading}) {
  console.log('LOADING', loading);
  return loading ? (
    <Modal
      presentationStyle="overFullScreen"
      transparent={true}
      visible={loading}>
      <SafeAreaView style={styles.overlay}>
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
});
