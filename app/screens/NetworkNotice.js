import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function NetworkNotice() {
  const [isConnected, setIsConnected] = useState(true);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isConnected ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isConnected]);

  if (isConnected && fadeAnim.__getValue() === 0) return null;

  return (
    <Animated.View style={[styles.notice, { opacity: fadeAnim }]}>
      <Text style={styles.noticeText}>
        🔌 No internet connection. Please reconnect to continue.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  notice: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    alignItems: "center",
  },
  noticeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
