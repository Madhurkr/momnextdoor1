import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

// Set API URL using your local IP
<<<<<<< Updated upstream
const API_URL = "http://192.168.1.93:5002/api/users";
=======
const API_URL = "http://192.168.1.66:5002/api/users";
>>>>>>> Stashed changes

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [contactMethod, setContactMethod] = useState(""); // "Phone" or "Email"
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState(""); // "Cook" or "Customer"
  const [loading, setLoading] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [document, setDocument] = useState(null);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 5 && /\d/.test(password);
  const validatePhoneNumber = (number) => /^\d{10,15}$/.test(number); // Simple phone number validation

  const handleSignUp = async () => {
    if (!name || !country || (!phoneNumber && !email) || !userType || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required! (Email or Phone number must be provided)");
      return;
    }
    if (contactMethod === "Email" && !validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    if (contactMethod === "Phone" && !validatePhoneNumber(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number (10-15 digits).");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Error", "Password must be at least 5 characters long and contain a number.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("country", country);
    formData.append("contact_method", contactMethod);
    formData.append("phone_number", contactMethod === "Phone" ? phoneNumber : "");
    formData.append("email", contactMethod === "Email" ? email : "");
    formData.append("password", password);
    formData.append("user_type", userType);
    if (document) {
      formData.append("document", {
        uri: document.uri,
        type: document.mimeType,
        name: document.name,
      });
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/signup`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoading(false);
      setUserId(response.data.userId);
      setOtpModalVisible(true);
    } catch (error) {
      setLoading(false);
      console.error("Signup Error:", error);
      Alert.alert("Signup Failed", error.response?.data?.message || "Cannot connect to the server. Check your network.");
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP sent to your email/phone.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, {
        userId,
        otp,
      });

      setLoading(false);
      Alert.alert("Success", "OTP verified successfully! Account is now active.");
      setOtpModalVisible(false);
      navigation.navigate("Welcome"); // Redirect to Login screen
    } catch (error) {
      setLoading(false);
      console.error("OTP Verification Error:", error);
      Alert.alert("OTP Verification Failed", error.response?.data?.message || "Invalid OTP.");
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        Alert.alert("Cancelled", "No document was selected.");
        return;
      }

      setDocument(result.assets[0]);
      Alert.alert("Success", `Document uploaded: ${result.assets[0].name}`);
      console.log("Selected Document:", result.assets[0]);
    } catch (error) {
      console.error("Document Picker Error:", error);
      Alert.alert("Error", "Failed to pick document.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>MomNextDoor</Text>
        <Text style={styles.tagline}>Home-cooked Meals at your place</Text>
      </View>

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Country Region" value={country} onChangeText={setCountry} />

      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleButton} onPress={() => setContactMethod("Phone")}>
          <Text style={styles.toggleText}>Use Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={() => setContactMethod("Email")}>
          <Text style={styles.toggleText}>Use Email</Text>
        </TouchableOpacity>
      </View>

      {contactMethod === "Phone" && (
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      )}
      {contactMethod === "Email" && (
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      )}

      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signUpText}>Sign Up</Text>}
      </TouchableOpacity>

      <View style={styles.userTypeContainer}>
        <TouchableOpacity style={[styles.userTypeButton, userType === "Cook" ? styles.selected : null]} onPress={() => setUserType("Cook")}>
          <Text style={styles.toggleText}>I am a Cook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.userTypeButton, userType === "Customer" ? styles.selected : null]} onPress={() => setUserType("Customer")}>
          <Text style={styles.toggleText}>I am a Customer</Text>
        </TouchableOpacity>
      </View>

      {userType === "Cook" && (
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Text style={styles.uploadText}>Upload Documents</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};





















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
    width: "45%",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    width: "50%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});


export default SignUpScreen;
