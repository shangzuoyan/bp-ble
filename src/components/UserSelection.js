import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

function UserButton({userId, onChange, selectedUser}) {
  let buttonStyle = styles.inputButton;
  if (selectedUser === userId) {
    buttonStyle = {...buttonStyle, ...styles.inputSelectedButton};
  }

  const onChangeHandler = () => {
    if (onChange) {
      onChange(userId);
    }
  };
  return (
    <TouchableOpacity style={buttonStyle} onPress={onChangeHandler}>
      <Text style={styles.inputText}>User {userId}</Text>
    </TouchableOpacity>
  );
}

export default function UserSelection({selectedUser, onChange}) {
  return (
    <View style={styles.container}>
      <UserButton userId="1" onChange={onChange} selectedUser={selectedUser} />
      <UserButton userId="2" onChange={onChange} selectedUser={selectedUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputButton: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    padding: 10,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  inputText: {color: '#ffffff', textAlign: 'center', fontWeight: '700'},
  inputSelectedButton: {backgroundColor: '#F95700FF'},
});
