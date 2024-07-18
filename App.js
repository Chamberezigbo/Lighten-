import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return <WelcomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
