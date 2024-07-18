import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScripture from "./SearchScripture";
import SearchScreenPrayerPoint from "./SearchScreenPrayerPoint";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search Scripture" component={SearchScripture} />
      <Tab.Screen
        name="Search Prayer Point"
        component={SearchScreenPrayerPoint}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
