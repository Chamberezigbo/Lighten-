import React from "react";
import { TextInput, View, Text } from "react-native";

function SearchScripture(props) {
  return (
    <View>
      <Text>Search for your bible verses</Text>
      <TextInput placeholder="Search bible with keywords lke" type="text" />
    </View>
  );
}

export default SearchScripture;
