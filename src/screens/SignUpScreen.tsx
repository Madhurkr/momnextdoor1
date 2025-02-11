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
import PhoneInput from "react-native-phone-number-input";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [document, setDocument] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5 && /\d/.test(password);
  };

  const handleSignUp = () => {
    if (!name || !country || (!phoneNumber && !email) || !userType || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required! (Email or Phone number must be provided)");
      return;
    }
    if (contactMethod === "Email" && !validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
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
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
      
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
      console.log("User Info:", { name, country, phoneNumber, email, userType, otp, document });
    }, 2000);
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      setDocument(result);
      Alert.alert("Success", "Document uploaded successfully!");
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
        {contactMethod !== "Phone" && (
          <TouchableOpacity style={styles.toggleButton} onPress={() => setContactMethod("Phone")}> 
            <Text style={styles.toggleText}>Use Phone</Text>
          </TouchableOpacity>
        )}
        {contactMethod !== "Email" && (
          <TouchableOpacity style={styles.toggleButton} onPress={() => setContactMethod("Email")}> 
            <Text style={styles.toggleText}>Use Email</Text>
          </TouchableOpacity>
        )}
      </View>

      {contactMethod === "Phone" && (
        <PhoneInput defaultValue={phoneNumber} defaultCode="US" layout="first" onChangeFormattedText={setPhoneNumber} />
      )}
      {contactMethod === "Email" && (
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      )}

      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

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

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signUpText}>Sign Up</Text>}
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Check your email and phone for a verification code!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
