// config.js
const API_CONFIG = {
  url: "http://192.168.150.217:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
};
errorHandler: (error) => {
  if (error.response) {
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
    console.error("Response headers:", error.response.headers);
    Alert.alert(`Error: ${error.response.data.error}`);
  } else if (error.request) {
    console.error("Request data:", error.request);
    Alert.alert("No response received from the server.");
  } else {
    console.error("Error message:", error.message);
    Alert.alert(`Error: ${error.message}`);
  }
  console.error("Error config:", error.config);
};

export default API_CONFIG;
