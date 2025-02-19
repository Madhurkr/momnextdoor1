import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://192.168.1.93:5002/api/users"; // Replace with your API

const WelcomeScreen = ({ navigation }) => {
  const [contactMethod, setContactMethod] = useState("Email"); // Default to email login
  const [identifier, setIdentifier] = useState(""); // Email or Phone Number
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (userToken) {
       navigation.reset({ index: 0, routes: [{ name: "CustomerInfoScreen" }] }); // ✅ routs to customer info screen`
      //navigation.navigate("Home");
    }
  };

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert("Error", "Both fields are required!");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        identifier,
        password,
      });
  
      await AsyncStorage.setItem("userToken", response.data.token);
      await AsyncStorage.setItem("userId", response.data.userId.toString());
  
      setLoading(false);
      Alert.alert("Success", "Login successful!");
  
      // ✅ Ensure state updates before navigating
      setTimeout(() => {
        navigation.replace("CustomerInfoScreen"); // ✅ FIX: Use replace to clear stack and avoid navigation issues
      }, 500);
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error);
      Alert.alert("Login Failed", error.response?.data?.message || "Invalid credentials");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>MomNextDoor</Text>
      <Text style={styles.tagline}>Home-cooked Meals at your place</Text>

      {/* Toggle Between Email & Phone Login */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, contactMethod === "Email" ? styles.selected : null]}
          onPress={() => {
            setContactMethod("Email");
            setIdentifier("");
          }}
        >
          <Text style={styles.toggleText}>Login with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, contactMethod === "Phone" ? styles.selected : null]}
          onPress={() => {
            setContactMethod("Phone");
            setIdentifier("");
          }}
        >
          <Text style={styles.toggleText}>Login with Phone</Text>
        </TouchableOpacity>
      </View>

      {/* Input for Email or Phone */}
      <TextInput
        style={styles.input}
        placeholder={contactMethod === "Email" ? "Enter Email" : "Enter Phone Number"}
        keyboardType={contactMethod === "Email" ? "email-address" : "phone-pad"}
        value={identifier}
        onChangeText={setIdentifier}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginText}>Login</Text>}
      </TouchableOpacity>

      {/* Signup Link */}
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#777",
    marginBottom: 30,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  toggleButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  selected: {
    backgroundColor: "#ff6347",
    borderColor: "#ff6347",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
  loginButton: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#ff6347",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#777",
  },
});
