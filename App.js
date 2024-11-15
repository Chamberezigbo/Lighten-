import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";
import * as Font from "expo-font";
import Entypo from "@expo/vector-icons/Entypo";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import TabNavigator from "./app/screens/TabNavigator";
import CustomSplashScreen from "./app/Component/CustomSplashScreen";
import API_CONFIG from "./app/config/api";

const stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Start loading the app's required resources (fonts) in parallel with other tasks
    async function loadResources() {
      try {
        // Load fonts asynchronously
        await Font.loadAsync(Entypo.font);
        setFontsLoaded(true);
      } catch (error) {
        console.warn("Error loading fonts:", error);
      }
    }

    loadResources(); // Start loading fonts
  }, []);

  useEffect(() => {
    function prepareApp() {
      // Make the API call without awaiting it to avoid blocking
      axios.get(`${API_CONFIG.url}/warmup`).catch((error) => {
        console.warn("API Warmup failed:", error);
      });

      // Immediately mark the app as ready, so we can proceed
      setAppIsReady(true);
    }

    // Only trigger the API call after the UI is ready
    if (fontsLoaded) {
      prepareApp();
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync(); // Hide splash screen once everything is ready
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return <CustomSplashScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
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
