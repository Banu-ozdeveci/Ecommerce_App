import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Category from "../Screens/Category";
import { SingleCategory } from "../Screens/SingleCategory";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Details } from "../Screens/Details";
import { COLORS } from "../style/colors";
import { RatingReviewScreen } from "../Screens/RatingReviewScreen";

const { Navigator, Screen } = createStackNavigator();

export const CategoryStack = () => {
  return (
    <Navigator
      options={{
        headerTitle: "Categories",
        headerRight: <MaterialCommunityIcons name="shopping-outline" />,
      }}
    >
      <Screen
        options={{ headerShown: false }}
        name="Category"
        component={Category}
      />
      <Screen
        options={{ headerShown: false }}
        name="SingleCategory"
        component={SingleCategory}
      />
      <Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
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
    </Navigator>
  );
};
