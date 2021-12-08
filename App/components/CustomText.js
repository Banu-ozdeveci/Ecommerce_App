import React from "react";
import { Text } from "react-native";

import { COLORS } from "../style/colors";

export const CustomText = ({
  weight,
  children,

  color,
  style,
  ...rest
}) => {
  const customStyle = {
    color: color ? color : COLORS.TEXT,
    fontSize: 16,

    ...style,
  };
  return (
    <Text style={customStyle} {...rest}>
      {children}
    </Text>
  );
};
