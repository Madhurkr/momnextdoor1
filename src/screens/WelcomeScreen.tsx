import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const countries = [
  { label: "United States (+1)", value: "+1" },
  { label: "Canada (+1)", value: "+1" },
  { label: "United Kingdom (+44)", value: "+44" },
  { label: "India (+91)", value: "+91" },
  { label: "Australia (+61)", value: "+61" },
  { label: "Germany (+49)", value: "+49" },
  { label: "France (+33)", value: "+33" },
  { label: "Brazil (+55)", value: "+55" },
];

const WelcomeScreen = ({ navigation }) => {
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = () => {
    if (!phoneCode || !phoneNumber) {
      alert("Please select a country code and enter a phone number.");
      return;
    }
    alert(`Logging in with ${phoneCode} ${phoneNumber}...`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>MomNextDoor</Text>
        <Text style={styles.tagline}>Home-cooked Meals at your place</Text>
      </View>

      <Text style={styles.label}>Country Code</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => setPhoneCode(value)}
          items={countries}
          placeholder={{ label: "Select your country code...", value: null }}
          style={{
            inputIOS: styles.pickerInput,
            inputAndroid: styles.pickerInput,
          }}
        />
      </View>

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <View style={styles.socialLoginContainer}>
        <Text style={styles.socialLoginText}>Social Media Login</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signupText}>Don't have a login? Sign up</Text>
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  pickerInput: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  continueButton: {
    width: "100%",
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "#ffcc00",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  continueText: {
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
  signupText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#777",
  },
});
