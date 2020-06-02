import React from 'react';
import moment from 'moment';

import {StyleSheet, Text, View, FlatList} from 'react-native';

import BP_ReadingItem from './BP_ReadingItem';

export default function SyncHeader(props) {
  const timeSyncStarted = props.data.syncInfo.timeSyncStarted;
  return (
    <View style={styles.container}>
      <Text style={styles.element}>{`Sync time: ${moment(
        timeSyncStarted,
      ).format('MMMM DD, YYYY hh:mm:A')}`}</Text>
      {props.data.data.length ? (
        <FlatList
          data={props.data.data}
          renderItem={({item}) => <BP_ReadingItem reading={item} />}
          keyExtractor={(item, key) => {
            return key.toString();
          }}
        />
      ) : (
        <Text style={styles.message}>
          There were no readings for this sync.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginBottom: 3},
  element: {
    color: 'gray',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
});
