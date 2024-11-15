import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import axios from "axios";
import { Card } from "react-native-elements";
import Markdown from "react-native-markdown-display";

import colors from "../config/colors";
import API_CONFIG from "../config/api";
import ModalComponent from "../Component/ModalComponent";

function SearchScreenPrayerPoint() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState("");
  const [selectedScript, setSelectedScript] = useState(null);

  const validateInput = (text) => /^[a-zA-Z\s]*$/.test(text);

  const handleSearch = async () => {
    if (!keyword) {
      Alert.alert("Please enter the keyword");
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setResults("");

    try {
      const response = await axios.post(
        `${API_CONFIG.url}/prayer-points`,
        { keyword },
        { headers: API_CONFIG.headers }
      );
      setResults(response.data.text || "No results found.");
    } catch (error) {
      API_CONFIG.errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Prayer Points</Text>
      <TextInput
        style={styles.SearchInput}
        placeholder="Organize your prayer with scripture"
        value={keyword}
        onChangeText={(text) => {
          if (validateInput(text)) {
            setKeyword(text);
          } else {
            Alert.alert("Invalid input", "Please enter only letters.");
          }
        }}
      />

      <View style={styles.suggestionWrapper}>
        <View style={styles.suggestionRow}>
          <TouchableOpacity
            style={styles.suggestionContainer}
            onPress={() => setKeyword("Healing")}
          >
            <Text style={styles.suggestionText}>Healing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.suggestionContainer}
            onPress={() => setKeyword("Protection")}
          >
            <Text style={styles.suggestionText}>Protection</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.suggestionContainer}
            onPress={() => setKeyword("Wisdom")}
          >
            <Text style={styles.suggestionText}>Wisdom</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.longSuggestionContainer}>
          <TouchableOpacity
            onPress={() =>
              setKeyword(
                "For breakthroughs that help overcome difficult financial situations"
              )
            }
          >
            <Text style={styles.suggestionText}>
              For breakthroughs that help overcome difficult financial
              situations
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button title="Search" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" colors={colors.primary} />}

      {results && (
        <TouchableOpacity onPress={() => setSelectedScript(results)}>
          <Card>
            <Card.Title>Prayer Point Results</Card.Title>
            <Card.Divider />
            <Markdown
              style={{
                body: { maxHeight: 100, overflow: "hidden", fontSize: 16 },
              }}
            >
              {results}
            </Markdown>
          </Card>
        </TouchableOpacity>
      )}

      <ModalComponent
        visible={!!selectedScript}
        content={selectedScript}
        onClose={() => setSelectedScript(null)}
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
    borderRadius: 8,
    paddingLeft: 10,
  },
  suggestionWrapper: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
  },
  suggestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  suggestionContainer: {
    backgroundColor: colors.black,
    borderRadius: 8,
    padding: 8,
    width: "30%",
    alignItems: "center",
  },
  longSuggestionContainer: {
    backgroundColor: colors.black,
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    alignItems: "center",
  },
  suggestionText: {
    fontSize: 14,
    color: colors.light,
    textAlign: "center",
  },
});

export default SearchScreenPrayerPoint;
