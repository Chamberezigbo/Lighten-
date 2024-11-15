import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import SearchScripture from "./SearchScripture";
import SearchScreenPrayerPoint from "./SearchScreenPrayerPoint";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Search Scripture") {
            iconName = focused ? "book" : "book-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Search Prayer Point") {
            iconName = focused ? "hand-heart" : "hand-heart-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Search Scripture" component={SearchScripture} />
      <Tab.Screen
        name="Search Prayer Point"
        component={SearchScreenPrayerPoint}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
