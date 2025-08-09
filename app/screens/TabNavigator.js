import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchScripture from "./SearchScripture";
import SearchScreenPrayerPoint from "./SearchScreenPrayerPoint";
import colors from "../config/colors";
import { View, StyleSheet, Text,Platform } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

DropDownPicker.setListMode("MODAL"); // or use listMode="MODAL" per component
const Tab = createBottomTabNavigator();

function ScriptureHeader({ selected, setSelected }) {
  
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "KJV", value: "KJV" },
    { label: "AMPC", value: "AMPC" },
    { label: "NIV", value: "NIV" },
    { label: "ESV", value: "ESV" },
    { label: "NLT", value: "NLT" },
    { label: "CSB", value: "CSB" },
    { label: "NASB", value: "NASB" },
    { label: "MSG", value: "MSG" },
    { label: "NRSV", value: "NRSV" },
    { label: "CEB", value: "CEB" },
    { label: "ASV", value: "ASV" },
    { label: "AMP", value: "AMP" },
  ]);

  return (
    // header wrapper - keep this visible and simple
    <View style={styles.headerWrapper}>
      <Text style={styles.headerTitle}>God’s Word</Text>

      <DropDownPicker
        open={open}
        value={selected}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => {
          // callback is a function from DropDownPicker
          setSelected(typeof callback === "function" ? callback(selected) : callback);
        }}
        setItems={setItems}
        style={styles.picker}
        // Use modal mode (we also set global above) — safe on Android
        listMode="MODAL"
        // modal props — tweak animation/presentation if needed
        modalProps={{
          animationType: "slide",
          // transparent: true,
          statusBarTranslucent: true, // Android: change if you want modal under status bar
          onRequestClose: () => setOpen(false),
        }}
        // title and styling for modal content
        modalTitle="Select Version"
        modalAnimationType="slide"
        modalContentContainerStyle={styles.modalContent}
      />
    </View>
  );
}

function TabNavigator() {
  const [selectedVersion, setSelectedVersion] = useState("KJV");

  const ScriptureHeaderWrapper = () => (
    <ScriptureHeader selected={selectedVersion} setSelected={setSelectedVersion} />
  );
  return (
    // keep this wrapper; modal will still appear above everything because it's a native Modal
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Search Scripture") {
              const iconName = focused ? "book" : "book-outline";
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            } else if (route.name === "Search Prayer Point") {
              const iconName = focused ? "hand-heart" : "hand-heart-outline";
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Search Scripture"
          options={{
            // replace the whole header so layout is consistent
            header: () => <ScriptureHeader selected={selectedVersion} setSelected={setSelectedVersion} />,
          }}
          
        >
        {(props) => <SearchScripture {...props} bibleVersion={selectedVersion} />}
        </Tab.Screen>

        <Tab.Screen 
          name="Search Prayer Point" 
          options={{
            header: () => <ScriptureHeader selected={selectedVersion} setSelected={setSelectedVersion} />, // hide header for this screen
          }}
        >
        {(props) => <SearchScreenPrayerPoint {...props} bibleVersion={selectedVersion} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}


const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop:60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  picker: {
    height: 36,
    minWidth: 120,
    width: 50,
    marginLeft: Platform.OS === 'android' ? 130 : 170,
  },
  modalContent: {
    // small white "card" in the modal - tweak to taste
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 8,
    // add platform-safe top margin for Android status bar
    marginTop: Platform.OS === "android" ? 40 : 0,
  },
});

export default TabNavigator;
