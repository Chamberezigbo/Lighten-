import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import TabNavigator from "./app/screens/TabNavigator";

const stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="WelcomeScreen">
        <stack.Screen name="LightIn" component={WelcomeScreen} />
        <stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
