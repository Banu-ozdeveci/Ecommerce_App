import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

export const SafeArea = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
