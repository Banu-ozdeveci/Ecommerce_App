import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CustomText } from "./CustomText";

export const Btn = ({
  btnName,
  bgColor,
  height,
  width,
  borderColor,
  borderWidth,
  titleStyle,
  containerStyle,
  onPress,
  borderRadius,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        containerStyle,
        {
          backgroundColor: bgColor,
          height: height,
          width: width,
          borderRadius,
          borderWidth: borderWidth,
          borderColor: borderColor,
        },
      ]}
      onPress={onPress}
      rest={rest}
    >
      <CustomText
        weight={"medium"}
        style={{ ...styles.btnText, ...titleStyle }}
      >
        {btnName}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  btnText: {
    fontSize: 15,
    lineHeight: 20,
  },
});
