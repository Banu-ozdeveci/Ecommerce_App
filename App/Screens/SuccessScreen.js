import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";

function SuccessScreen() {
  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.container}>
        <Text style={styles.success}>Success!</Text>
        <ImageBackground
          source={require("../../assets/g1.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text style={styles.subtitle}>
            Your order will be delivered soon.
          </Text>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center" },
  success: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#b22222",
    bottom: -6,
  },
  contain: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#696969",
    top: 78,
  },
});

export default SuccessScreen;

/*
   <View
          style={{ width: "40%", top: 280, left: 109, alignItems: "center" }}
        >
          <Btn
            height={50}
            width={"100%"}
            bgColor={"#b22222"}
            btnName="CONTINUE SHOPPING"
            containerStyle={{ marginTop: 25 }}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        */
