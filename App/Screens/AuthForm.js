import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { connect } from "react-redux";

import { Input } from "../components/Input";
import { Btn } from "../components/Btn";
import { CustomText } from "../components/CustomText";

import {
  signupUser,
  signIn,
  selectAuthStatus,
  selectAuthUserID,
} from "../Store/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const mapStateToProps = (state) => ({
  authStatus: selectAuthStatus(state),
  userID: selectAuthUserID(state),
});

export const AuthForm = connect(mapStateToProps, {
  signupUser,
  signIn,
})(({ signIn, signupUser }) => {
  const [ind, setInd] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
  });

  const fieldChangeHandler = (name, value) => {
    setFields((fields) => ({
      ...fields,
      [name]: value.trim(),
    }));
  };

  return (
    <SafeAreaView style={styles.c}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.titleImage}
          source={require("../../assets/bg2.jpg")}
        >
          <Text style={styles.text}>WELCOME</Text>
        </ImageBackground>
        <ImageBackground
          source={require("../../assets/bg2.jpg")}
          style={styles.image}
        >
          <CustomText
            weight="bold"
            style={{
              right: 70,
              fontSize: 24,
              fontStyle: "italic",
              marginTop: 28,
              marginBottom: 10,
              color: "#556b2f",
              fontWeight: "bold",
            }}
          >
            {isLogin ? "Login" : "Sign up"}
          </CustomText>

          {ind ? null : (
            <ActivityIndicator style={styles.indicator} size={70} />
          )}

          <ScrollView>
            <View style={styles.contain}>
              {!isLogin && (
                <Input
                  icon="account"
                  name={"Name"}
                  onChangeHandler={(value) =>
                    fieldChangeHandler("username", value)
                  }
                  value={fields.username}
                />
              )}

              <Input
                icon={"email"}
                name={"Email"}
                onChangeHandler={(value) => fieldChangeHandler("email", value)}
                value={fields.email}
                type="email"
              />
              <Input
                icon="lock"
                name={"Password"}
                onChangeHandler={(value) =>
                  fieldChangeHandler("password", value)
                }
                value={fields.password}
                secureTextEntry={true}
              />

              {!isLogin && (
                <TouchableOpacity
                  style={styles.redirectTo}
                  onPress={() => setIsLogin(true)}
                >
                  <CustomText style={styles.toSignIntext}>
                    Already have an account?
                  </CustomText>
                </TouchableOpacity>
              )}

              <Btn
                btnName={isLogin ? "LOGIN" : "SIGN UP"}
                width={"40%"}
                height={28}
                borderWidth={2}
                borderColor={"#556b2f"}
                titleStyle={{
                  color: "#556b2f",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
                onPress={() => {
                  isLogin ? signIn(fields) : signupUser(fields), setInd(false);
                }}
              />

              {isLogin && (
                <TouchableWithoutFeedback onPress={() => setIsLogin(false)}>
                  <View style={{ marginTop: 40 }}>
                    <MaterialCommunityIcons
                      name="arrow-left-thick"
                      size={40}
                      color={"#fffff0"}
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contain: {
    alignItems: "center",
    marginTop: 15,
    flex: 1,
  },
  c: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  titleImage: {
    width: "100%",
    height: 60,

    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
    top: 10,
    //  left: 50,
  },
  signUpContainer: {
    width: "100%",
    alignItems: "center",
  },
  redirectTo: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 25,
  },
  toSignIntext: {
    color: "#556b2f",
    right: 50,
    fontStyle: "italic",
    textDecorationLine: "underline",
    marginBottom: 1,
  },
  indicator: {
    position: "absolute",
    top: 50,
    left: 150,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
