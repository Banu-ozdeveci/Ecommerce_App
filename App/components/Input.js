import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Input = ({
  name,
  style,
  secureTextEntry,
  onChangeHandler,
  value,
  icon,
  ...rest
}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={"#6e6969"}
            style={styles.icon}
          />
        )}

        <TextInput
          placeholderTextColor={"#6e6969"}
          placeholder={name}
          secureTextEntry={secureTextEntry}
          weight={"medium"}
          style={[styles.inputText, style]}
          onChangeText={(value) => onChangeHandler(value)}
          value={value}
          {...rest}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#f8f4f4",
    borderRadius: 25,
    flexDirection: "row",
    width: 210,
    padding: 15,
    marginVertical: 10,
  },
  inputLabel: {
    color: "#556b2f",
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 13,
  },
  inputText: {
    color: "black",
    fontSize: 14,
    lineHeight: 20,
  },
  icon: {
    marginRight: 10,
  },
});
