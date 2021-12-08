import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

function CategoryTitle({ title, subtitle, onPress }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.titleImage}
        source={require("../../assets/x.jpg")}
        imageStyle={{ borderRadius: 30 }}
      >
        {title && <Text style={styles.text}>{title}</Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <TouchableOpacity style={styles.more} onPress={onPress}>
          <MaterialCommunityIcons
            name="arrow-right-thick"
            size={25}
            color={"white"}
          />
          <Text style={styles.details}>MORE</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    width: width - 20,
    height: 80,

    //resizeMode: "contain",
  },
  details: {
    fontSize: 16,
    color: "white",
  },
  more: {
    position: "absolute",
    right: 20,
    top: 25,
  },
  text: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  subtitle: {
    fontSize: 18,
    color: "#faf0e6",
    fontStyle: "italic",
  },
  titleImage: {
    width: width - 20,
    height: 90,

    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default CategoryTitle;
