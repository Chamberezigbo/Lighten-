import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
// config.js
const API_CONFIG = {
  url: "https://lighten-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
};
errorHandler: async (error) => {
  // Check network status first
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    Alert.alert("No Internet", "Please check your connection and try again.");
    return;
  }
  if (error.response) {
    Alert.alert(`Error: ${error.response.data.error}`);
  } else if (error.request) {
    Alert.alert("No response received from the server.");
  } else {
    Alert.alert(`Error: ${error.message}`);
  }
  console.error("Error config:", error.config);
};

export default API_CONFIG;
