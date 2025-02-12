import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Check if user is logged in
  const checkLoginStatus = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (!userToken) {
      navigation.reset({ index: 0, routes: [{ name: "Welcome" }] }); // ✅ Reset stack to prevent going back
    } else {
      setIsAuthenticated(true);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userId");
    Alert.alert("Logged Out", "You have been logged out successfully.");
    navigation.navigate("Welcome"); // ✅ Redirect to Login and clear back stack
  };

  return (
    <View style={styles.container}>
      {isAuthenticated ? (
        <>
          <Text style={styles.title}>Welcome to Home Screen</Text>
          {/* Logout Button */}
          <Button title="Logout" onPress={handleLogout} color="red" />
        </>
      ) : null}
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
