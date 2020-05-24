import React from 'react';

import {
  SafeAreaView,
  View,
  StyleSheet,
  Modal,
  useWindowDimensions,
} from 'react-native';

export default function BLE_ModeContainer({children, visible, onRequestClose}) {
  const modalHeight = useWindowDimensions().height * 0.5;
  const modalWidth = useWindowDimensions().width * 0.6;
  return (
    <Modal
      presentationStyle="overFullScreen"
      transparent={true}
      animationType={'slide'}
      visible={visible}
      onRequestClose={onRequestClose}>
      <SafeAreaView style={styles.overlay}>
        <View
          style={[styles.container, {width: modalWidth, height: modalHeight}]}>
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 6,
    minHeight: 200,
    minWidth: 300,
    display: 'flex',
    borderWidth: 1,
    borderColor: '#FEFEFE',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    borderRadius: 6,
    borderColor: 'gray',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
