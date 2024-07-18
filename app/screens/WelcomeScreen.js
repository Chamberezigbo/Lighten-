import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { CommonActions } from "@react-navigation/native";

import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/background.jpg")}
          style={styles.logo}
        />
        <Text>Pray and with the scriptures</Text>
      </View>
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "TabNavigator" }],
            })
          );
        }}
      >
        <Text style={styles.btnText}>Explore</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  startBtn: {
    width: "90%",
    height: 70,
    backgroundColor: "#fc5c65",
    alignItems: "center",
    marginBottom: 50,
    // add borde to it//
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: colors.primary,
  },
  btnText: {
    alignItems: "center",
    color: colors.light,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 25,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    left: 100,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default WelcomeScreen;
