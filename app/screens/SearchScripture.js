import React, { useState } from "react";
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
  ScrollView,
  Modal,
} from "react-native";
import axios from "axios";
import Dialog from "react-native-dialog";
import { Card } from "react-native-elements";
import Markdown from "react-native-markdown-display";

import colors from "../config/colors";
import API_CONFIG from "../config/api";
import { color } from "react-native-elements/dist/helpers";
import ModalComponent from "../Component/ModalComponent";

function SearchScripture() {
  const [keyword, setKeyword] = useState("");
  const [numScript, setNumScript] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
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
        `${API_CONFIG.url}/scriptures`,
        {
          keyword: keyword,
          numScripts: numScript,
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

  const handleSwitchChange = (scriptNum) => {
    setSelectedScripts((prev) => {
      const newSelectedScripts = { ...prev };
      for (const key in newSelectedScripts) {
        newSelectedScripts[key] = false;
      }
      newSelectedScripts[scriptNum] = true;
      setNumScript(scriptNum);
      return newSelectedScripts;
    });
    setDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Search for your bible verses</Text>
      <View style={styles.inputContainer}>
        <View style={styles.SearchContainer}>
          <TextInput
            style={styles.SearchInput}
            placeholder="Search bible with keywords"
            value={keyword}
            onChangeText={(text) => {
              if (validateInput(text)) {
                setKeyword(text);
              } else {
                Alert.alert("Invalid input", "Please enter only letters.");
              }
            }}
            onSubmitEditing={handleSearch}
          />

          <View style={styles.SearchBtn}>
            <Button title="Search" onPress={handleSearch} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.pickerContainer}
          onPress={() => setDialogVisible(true)}
        >
          <Text style={styles.pickerText}>{numScript}</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color={colors.primary} />}

      {results.length > 0 && (
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

      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Select Number of Scriptures</Dialog.Title>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <Dialog.Switch
            key={value}
            label={`${value}`}
            value={selectedScripts[value]}
            onValueChange={() => handleSwitchChange(value)}
          />
        ))}
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
      </Dialog.Container>

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
  Text: {
    fontSize: 20,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  SearchInput: {
    width: "100%",
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
  pickerContainer: {
    width: "15%",
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginLeft: 5,
  },
  SearchContainer: {
    width: "70%",
  },
  pickerText: {
    fontSize: 16,
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
  SearchBtn: {
    marginTop: 5,
    borderRadius: 30,
    alignSelf: "center",
    width: "50%",
    borderColor: colors.primary,
  },
});
export default SearchScripture;
