import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../Screens/Profile";

import { ShippingAddressesScreen } from "../Screens/ShippingAddressesScreen";
import { COLORS } from "../style/colors";
import { AddingShippingAddress } from "../Screens/AddingShippingAddress";
import { Settings } from "../Screens/Settings";
import { MyOrders } from "../Screens/MyOrders";
import { OrderDetails } from "../Screens/OrderDetails";

const { Navigator, Screen } = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Navigator>
      <Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
      <Screen
        options={() => ({
          title: "Order Details",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
        })}
        name="OrderDetails"
        component={OrderDetails}
      />
      <Screen
        options={() => ({
          title: "",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
        })}
        name="Settings"
        component={Settings}
      />

      <Screen
        options={() => ({
          title: "",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
        })}
        name="MyOrders"
        component={MyOrders}
      />
      <Screen
        options={() => ({
          title: "Adding Shipping Address",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
        })}
        name="AddingShippingAddress"
        component={AddingShippingAddress}
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
    </Navigator>
  );
};
