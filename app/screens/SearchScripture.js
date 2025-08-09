import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  Modal,
} from "react-native";
import axios from "axios";
import { Card } from "react-native-elements";

import colors from "../config/colors";
import API_CONFIG from "../config/api";
import ModalComponent from "../Component/ModalComponent";

function SearchScripture({bibleVersion}) {
  const [keyword, setKeyword] = useState("");
  const [numScript, setNumScript] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedScript, setSelectedScript] = useState(null);
  const [selectedScripts, setSelectedScripts] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
  });

  const validateInput = (text) => /^[a-zA-Z\s]*$/.test(text);

  const handleSearch = async () => {
    keyword.trim();
    if (!keyword) {
      Alert.alert("Please enter the keyword");
      return;
    }
    
    Keyboard.dismiss();
    setLoading(true);
    setResults("");

    try {
      const response = await axios.post(
        `${API_CONFIG.url}/scriptures`,
        { keyword, numScripts: numScript, version: bibleVersion },
        { headers: API_CONFIG.headers }
      );
      setResults(
        response.data.text.replace(/\. /g, ".\n") || "No results found."
      );
    } catch (error) {
      API_CONFIG.errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchChange = (scriptNum) => {
    setSelectedScripts((prev) => {
      const newSelectedScripts = { ...prev };
      for (const key in newSelectedScripts) newSelectedScripts[key] = false;
      newSelectedScripts[scriptNum] = true;
      setNumScript(scriptNum);
      return newSelectedScripts;
    });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Search for your bible verses</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search bible with keywords"
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSearch}
      />

        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.pickerText}>{numScript}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.suggestionWrapper}>
        <View style={styles.suggestionRow}>
          <TouchableOpacity
            style={styles.suggestionContainer}
            onPress={() => setKeyword("Faith")}
          >
            <Text style={styles.suggestionText}>Faith</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.suggestionContainer}
            onPress={() => setKeyword("Grace")}
          >
            <Text style={styles.suggestionText}>Grace</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.suggestionContainer}
            onPress={() => setKeyword("Love")}
          >
            <Text style={styles.suggestionText}>Love</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.longSuggestionContainer}
          onPress={() => setKeyword("Verses on patience and understanding")}
        >
          <Text style={styles.suggestionText}>
            Verses on patience and understanding
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchButtonContainer}>
        <Button title="Search" onPress={handleSearch} />
      </View>

      {loading && <ActivityIndicator size="large" color={colors.primary} />}

      {results.length > 0 && (
        <TouchableOpacity onPress={() => setSelectedScript(results)}>
          <Card>
            <Card.Title>Scripture Results</Card.Title>
            <Card.Divider />
            <View style={{ maxHeight: 100, overflow: "hidden" }}>
              {results.split("\n").map((line, index) => (
                <Text key={index} style={{ fontSize: 16, marginBottom: 5 }}>
                  {line}
                </Text>
              ))}
            </View>
          </Card>
        </TouchableOpacity>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Number of Scriptures</Text>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.optionButton}
                onPress={() => handleSwitchChange(value)}
              >
                <Text
                  style={
                    selectedScripts[value]
                      ? styles.selectedOptionText
                      : styles.optionText
                  }
                >
                  {value}
                </Text>
              </TouchableOpacity>
            ))}
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

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
  titleText: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  pickerContainer: {
    width: 50,
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginLeft: 10,
  },
  pickerText: {
    fontSize: 16,
    color: colors.primary,
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
  searchButtonContainer: {
    alignSelf: "center",
    width: "50%",
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: "black",
  },
  selectedOptionText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default SearchScripture;
