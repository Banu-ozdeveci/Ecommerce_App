import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CategoryStack } from "./CategoryStack";
import { ProfileStack } from "./ProfileStack";
import { ShoppingStack } from "./ShoppingStack";
import { HomeStack } from "./HomeStack";
import { COLORS } from "../style/colors";
import { FavoritesStack } from "./FavoritesStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        tabBarOptions={{
          labelPosition: "below-icon",
          activeBackgroundColor: "#8b0000",
          activeTintColor: "white",
          inactiveBackgroundColor: "#a9a9a9",
          inactiveTintColor: "#8b0000",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Category"
          component={CategoryStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="heart-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Shopping Bag"
          component={ShoppingStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="shopping-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="account-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.BACKGROUND,
  },
});

export default MyTabs;
