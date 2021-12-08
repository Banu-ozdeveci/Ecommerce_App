import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorites from "../Screens/Favorites";
import { Details } from "../Screens/Details";
import { COLORS } from "../style/colors";

const { Navigator, Screen } = createStackNavigator();

export const FavoritesStack = () => {
  return (
    <Navigator>
      <Screen
        options={{ headerShown: false }}
        name="Favorites"
        component={Favorites}
      />
      <Screen
        name="Details"
        component={Details}
        //options={{ headerShown: false }}
        options={({ route }) => ({
          title: route.params.product.tags[0],
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
          },

          headerTintColor: COLORS.TEXT,
          headerTitleStyle: {
            textAlign: "center",
          },
        })}
      />
    </Navigator>
  );
};
