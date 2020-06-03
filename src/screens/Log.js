import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {FileSystem} from 'react-native-unimodules';

import LogContext from '../contexts/LogContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LogRow = ({log}) => {
  const color =
    log.level === 'i' ? '#00008B' : log.level === 'e' ? '#800000' : '#FFA500';
  return (
    <View style={styles.logRowContainer}>
      <Text style={{fontSize: 12, color, marginBottom: 2, marginHorizontal: 5}}>
        {moment(log.timeStamp).format('YYYY-MM-DD HH:mm:ss.SSS')}
      </Text>
      <Text style={{fontSize: 12, color, marginHorizontal: 5}}>{log.log}</Text>
    </View>
  );
};
export default function Log() {
  const {state, clear} = React.useContext(LogContext);

  async function handleLogToFile() {
    const file = `${FileSystem.documentDirectory}/Log${moment().format(
      'YYYYMMDDHHmmss',
    )}.txt`;

    const log = state.log.map(
      (logItem) =>
        moment(logItem.timeStamp).format('YYYY-MM-DD HH:mm:ss.SSS') +
        ':' +
        logItem.log,
    );
    const fileContents = log.join('\n');
    await FileSystem.writeAsStringAsync(file, fileContents);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Bluetooth Logs</Text>
        <View style={styles.actionBar}>
          <TouchableOpacity
            onPress={handleLogToFile}
            style={styles.actionButton}>
            <Ionicons name={'ios-download'} size={30} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={clear} style={styles.actionButton}>
            <Ionicons name={'ios-trash'} size={30} color={'gray'} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={state.log}
        renderItem={({item}) => <LogRow log={item} />}
        keyExtractor={(item, key) => key.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    alignItems: 'center',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    flex: 1,
    fontSize: 20,
    color: 'gray',
    marginLeft: 5,
    marginBottom: 10,
  },
  actionBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {marginHorizontal: 20, fontSize: 30},
  logRowContainer: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#CECECE',
    marginBottom: 12,
    marginHorizontal: 12,
  },
});
