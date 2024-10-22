import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import colors from "../config/colors";

function CustomSplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/bluenobg.png")}
        style={styles.image}
      />
      <Text>The entrance of Gods word gives light</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default CustomSplashScreen;
