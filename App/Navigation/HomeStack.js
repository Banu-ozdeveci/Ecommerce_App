import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import { Details } from "../Screens/Details";
import { COLORS } from "../style/colors";
import { RatingReviewScreen } from "../Screens/RatingReviewScreen";

import { SingleCategory } from "../Screens/SingleCategory";

const { Navigator, Screen } = createStackNavigator();

export const HomeStack = () => {
  return (
    <Navigator>
      <Screen options={{ headerShown: false }} name="Home" component={Home} />

      <Screen
        name="Details"
        component={Details}
        //options={{ headerShown: false }}
        options={({ route }) => ({
          title: route.params.product.tags[0],
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            // height: 50,
          },

          headerTintColor: COLORS.TEXT,
          headerTitleStyle: {
            textAlign: "center",
          },
        })}
      />
      <Screen
        name="Rating"
        component={RatingReviewScreen}
        options={() => ({
          title: "",
          headerStyle: {
            backgroundColor: COLORS.BACKGROUND,
            elevation: 0,
          },
          headerTintColor: COLORS.TEXT,
        })}
      />

      <Screen
        options={{ headerShown: false }}
        name="SingleCategory"
        component={SingleCategory}
      />
    </Navigator>
  );
};
