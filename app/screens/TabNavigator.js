import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScripture from "./SearchScripture";
import SearchScreenPrayerPoint from "./SearchScreenPrayerPoint";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search Scripture"
        component={SearchScripture}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search Prayer Point"
        component={SearchScreenPrayerPoint}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
