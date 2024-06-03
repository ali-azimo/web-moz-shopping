import { StausBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from 'react-native';

import TodoList from './Components/TodoList';

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: 'center',
  },
});