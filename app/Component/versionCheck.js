import VersionCheck from 'react-native-version-check';
import { Alert, Linking } from 'react-native';

/**
 * Future-proof version check
 * @param {Object} config - Configuration object
 * @param {boolean} config.useBackend - If true, will check version from backend API instead of Play Store
 * @param {string} config.backendUrl - Backend API endpoint to check latest version (if useBackend is true)
 */
export const checkAppVersion = async ({
  useBackend = false,
  backendUrl = ''
} = {}) => {
  try {
    let latestVersion;

    if (useBackend && backendUrl) {
      // 🔹 Backend version check (for future use)
      const response = await fetch(backendUrl);
      const data = await response.json();
      latestVersion = data.latestVersion; // Make sure your API returns { latestVersion: "x.x.x" }
    } else {
      // 🔹 Play Store version check (current method)
      latestVersion = await VersionCheck.getLatestVersion({
        provider: 'playStore', // For Android
      });
    }

    const currentVersion = await VersionCheck.getCurrentVersion();

    const updateNeeded = VersionCheck.needUpdate({
      currentVersion,
      latestVersion,
    });

    if (updateNeeded.isNeeded) {
      Alert.alert(
        "Update Available",
        "A new version of LightIn is available. Please update to enjoy the latest features.",
        [
          {
            text: "Update Now",
            onPress: async () => {
              const storeUrl = await VersionCheck.getStoreUrl();
              Linking.openURL(storeUrl);
            },
          },
          { text: "Later", style: "cancel" },
        ]
      );
    }
  } catch (error) {
    console.log("Version check failed:", error);
  }
};
