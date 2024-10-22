import React, { useRef, useEffect } from "react";
import {
  Image,
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { CommonActions } from "@react-navigation/native";

import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  const bounceValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceValue]);

  return (
    <View style={styles.background}>
      <View style={styles.cardContainer}>
        <View style={styles.cardContent}>
          <View style={styles.cardTitle}>
            <Text style={styles.Text}>Pray Right</Text>
            <Text style={styles.subText}>
              This is the confidence we have in approaching God: that if we ask
              anything according to his will, he hears us. And if we know that
              he hears us—whatever we ask—we know that we have what we asked of
              him.
            </Text>
          </View>
          <View style={styles.cardImageContainer}>
            <Animated.Image
              style={[
                styles.cardImage,
                { transform: [{ scale: bounceValue }] },
              ]}
              source={require("../../assets/image2.jpg")}
            />
            <Animated.Image
              style={[
                styles.cardImage1,
                { transform: [{ scale: bounceValue }] },
              ]}
              source={require("../../assets/image8.jpg")}
            />
            <Animated.Image
              style={[
                styles.cardImage2,
                { transform: [{ scale: bounceValue }] },
              ]}
              source={require("../../assets/image1.jpg")}
            />
          </View>
        </View>
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
    fontSize: 30,
    marginTop: 10,
  },
  btnText: {
    alignItems: "center",
    color: colors.light,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 25,
  },
  cardContainer: {
    position: "absolute",
    top: 70,
    backgroundColor: colors.light,
    height: "50%",
    width: "100%",
    borderRadius: 30,
    borderColor: colors.primary,
    borderWidth: 0.2,
    padding: 20,
  },
  cardContent: {
    flexDirection: "row",
  },
  cardTitle: {
    width: "70%",
    padding: 10,
  },
  subText: {
    marginTop: 20,
    marginBottom: 10,
  },
  cardImageContainer: {
    flexDirection: "row",
    marginBottom: 90,
  },
  cardImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    left: 9,
    top: -10,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  cardImage1: {
    width: 50,
    height: 50,
    borderRadius: 50,
    top: -40,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  cardImage2: {
    width: 50,
    height: 50,
    borderRadius: 50,
    right: 45,
    top: 10,
    borderColor: colors.primary,
    borderWidth: 2,
  },
});

export default WelcomeScreen;
