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
        <Text style={styles.Text}>Search, Pray with Lighten</Text>
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
    alignItems: "center",
  },
  startBtn: {
    width: "90%",
    height: 70,
    backgroundColor: "#fc5c65",
    alignItems: "center",
    marginBottom: 50,
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: colors.primary,
  },
  Text: {
    fontSize: 20,
    marginTop: 10,
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
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default WelcomeScreen;
