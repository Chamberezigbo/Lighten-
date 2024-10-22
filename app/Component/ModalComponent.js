import React from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  Button,
  StyleSheet,
} from "react-native";
import Markdown from "react-native-markdown-display";

function ModalComponent({ visible, content, onClose }) {
  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.modalContent}>
        <ScrollView>
          {content ? (
            <Markdown>{content}</Markdown>
          ) : (
            <Text>No content available</Text>
          )}
        </ScrollView>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: "10%",
  },
});

export default ModalComponent;
