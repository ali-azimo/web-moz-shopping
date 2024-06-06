import { StausBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from 'react-native';

//Screens
import ProdcutContainer from "./screens/Products/ProductContainer";

export default function App() {
  return (
    <View style={styles.container}>
      <ProdcutContainer/>
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