import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";
// import * as Font from "expo-font";
// import Entypo from "@expo/vector-icons/Entypo";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import TabNavigator from "./app/screens/TabNavigator";
import CustomSplashScreen from "./app/Component/CustomSplashScreen";
import API_CONFIG from "./app/config/api";

const stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Make the request to the /warmup endpoint
        await axios.get(`${API_CONFIG.url}/warmup`);
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <CustomSplashScreen />;
  }

  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="WelcomeScreen"
        onLayout={onLayoutRootView}
      >
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
