import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ShoppingBag from "../Screens/ShoppingBag";
import { Checkout } from "../Screens/Checkout";

import SuccessScreen from "../Screens/SuccessScreen";

import { AddingShippingAddress } from "../Screens/AddingShippingAddress";
import { ShippingAddressesScreen } from "../Screens/ShippingAddressesScreen";

import { COLORS } from "../style/colors";
import { PaymentScreen } from "../Screens/PaymentScreen";
import Home from "../Screens/Home";

const { Navigator, Screen } = createStackNavigator();

export const ShoppingStack = () => {
  return (
    <Navigator initialRouteName={"ShoppingBag"}>
      <Screen
        options={{ headerShown: false }}
        name="ShoppingBag"
        component={ShoppingBag}
      />
      <Screen
        options={({ route }) => ({
          title: "Checkout",
          headerStyle: {
            backgroundColor: "#8b0000",
          },

          headerTintColor: COLORS.TEXT,
          headerTitleStyle: {
            textAlign: "center",
          },
        })}
        name="Checkout"
        component={Checkout}
      />
      <Screen
        options={() => ({
          title: "AddingShippingAddress",
        })}
        name="AddingShippingAddress"
        component={AddingShippingAddress}
      />
      <Screen
        options={{ headerShown: false }}
        name="SuccessScreen"
        component={SuccessScreen}
      />
      <Screen
        options={() => ({
          title: "Shipping Addresses",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
        })}
        name="ShippingAddressesScreen"
        component={ShippingAddressesScreen}
      />

      <Screen
        options={() => ({
          title: "Payment Screen",
          headerStyle: {
            backgroundColor: "#8b0000",
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
        })}
        name="PaymentScreen"
        component={PaymentScreen}
      />
      <Screen options={{ headerShown: false }} name="Home" component={Home} />
    </Navigator>
  );
};
