import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Check if user is logged in
  const checkLoginStatus = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      navigation.navigate("Welcome"); // ✅ Redirect to Login if not logged in
    }
  };

  // Logout Function
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userId");
    Alert.alert("Logged Out", "You have been logged out successfully.");
    navigation.navigate("Welcome"); // ✅ Redirect to Login after logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen</Text>

      {/* Logout Button */}
      <Button title="Logout" onPress={handleLogout} color="red" />
      <Button title="Logout" onPress={navigation.navigate("Welcome")} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default HomeScreen;
