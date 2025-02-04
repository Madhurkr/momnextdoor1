import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const SignUpScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState(""); // "Cook" or "Customer"

  const handleSignUp = () => {
    if (!name || !country || !phoneNumber || !userType) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    Alert.alert("Success", "Account created successfully!");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {/* App Title */}
      <View style={styles.header}>
        <Text style={styles.appName}>MomNextDoor</Text>
        <Text style={styles.tagline}>Home-cooked Meals at your place</Text>
      </View>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      {/* Country & Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Country Region"
        value={country}
        onChangeText={setCountry}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* User Type Selection */}
      <View style={styles.userTypeContainer}>
        <TouchableOpacity
          style={[styles.userTypeButton, userType === "Cook" ? styles.selected : null]}
          onPress={() => setUserType("Cook")}
        >
          <Text style={styles.userTypeText}>Cook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.userTypeButton, userType === "Customer" ? styles.selected : null]}
          onPress={() => setUserType("Customer")}
        >
          <Text style={styles.userTypeText}>Customer</Text>
        </TouchableOpacity>
      </View>

      {/* Document Upload for Cooks */}
      {userType === "Cook" && (
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>Upload Documents</Text>
        </TouchableOpacity>
      )}

      {/* Sign-Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      {/* OR Separator */}
      <Text style={styles.orText}>or</Text>

      {/* Social Media Login */}
      <View style={styles.socialLoginContainer}>
        <Text style={styles.socialLoginText}>Social Media Login</Text>
      </View>

      {/* Navigation to Login */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
  },
  tagline: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#777",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
  userTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  userTypeButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#ff6347",
    borderColor: "#ff6347",
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  uploadButton: {
    backgroundColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 16,
    color: "#333",
  },
  signUpButton: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#ff6347",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  signUpText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 16,
    marginVertical: 10,
    fontStyle: "italic",
  },
  socialLoginContainer: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  socialLoginText: {
    fontSize: 16,
    fontStyle: "italic",
  },
  loginText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#777",
  },
});


