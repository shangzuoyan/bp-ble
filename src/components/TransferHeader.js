import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

export default function TransferHeader({transfer}) {
  const {timeTransferred} = transfer;

  return (
    <View style={styles.container}>
      <Text
        style={styles.element}>{`Time transferred: ${timeTransferred}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  element: {color: 'gray', fontSize: 20, marginVertical: 10},
});
