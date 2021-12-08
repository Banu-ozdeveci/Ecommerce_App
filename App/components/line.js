import React from "react";
import { View, StyleSheet } from "react-native";

function Line({ top, bottom }) {
  return <View style={[styles.container, { top: top, bottom: bottom }]}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1,
    backgroundColor: "#d3d3d3",
  },
});

export default Line;
