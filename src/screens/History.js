import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import UserSelection from '../components/UserSelection';
import Loading from '../components/Loading';
export default function History() {
  return (
    <View style={styles.container}>
      <Text>History</Text>
      <UserSelection selectedUser="1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
