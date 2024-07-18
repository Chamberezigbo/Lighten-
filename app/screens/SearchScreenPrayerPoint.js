import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import colors from "../config/colors";

function SearchScreenPrayerPoint() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Prayer Points</Text>
      <TextInput
        style={styles.SearchInput}
        placeholder="Organize your prayer with scripture"
        type="text"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  SearchInput: {
    width: "100%",
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
});

export default SearchScreenPrayerPoint;
