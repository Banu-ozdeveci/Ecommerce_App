import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthForm } from "../Screens/AuthForm";

import OnBoarding from "../Screens/OnBoarding";
const { Navigator, Screen } = createStackNavigator();
export const AuthStack = () => {
  return (
    <Navigator>
      <Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />

      <Screen
        name="AuthForm"
        component={AuthForm}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};
