import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
  Keyboard,
  ActivityIndicator,
  Alert,
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

  const validateInput = (text) => {
    // Regular expression to allow only letters
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(text);
  };

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
        {
          keyword: keyword,
        },
        {
          headers: API_CONFIG.headers,
        }
      );
      setResults(response.data.text);
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

      <Button title="Search" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" colors={colors.primary} />}

      {results && (
        <TouchableOpacity onPress={() => setSelectedScript(results)}>
          <Card>
            <Card.Title>Scripture Results</Card.Title>
            <Card.Divider />
            <Markdown
              style={{
                body: { maxHeight: 100, overflow: "hidden", fontSize: 16 },
              }}
            >
              {results || "No results available"}
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
    borderRadius: 20,
    paddingLeft: 10,
  },
  resultsContainer: {
    marginTop: 20,
    width: "100%",
  },
  result: {
    marginBottom: 10,
    padding: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: "10%",
  },
});

export default SearchScreenPrayerPoint;
