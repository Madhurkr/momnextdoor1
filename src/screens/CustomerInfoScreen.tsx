import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal } from "react-native";
import { ProgressBar } from "react-native-paper";

const questions = [
  { id: 1, text: "What type of cuisine do you prefer?" },
  { id: 2, text: "What is your preferred location for the event?" },
  { id: 3, text: "What is your budget range for hiring a chef?" },
  { id: 4, text: "How many guests will be served at the event?" },
  { id: 5, text: "What date is the event scheduled for?" },
  { id: 6, text: "Do you have any dietary restrictions or preferences?" },
  { id: 7, text: "What time will the event start?" },
  { id: 8, text: "Will the chef be required to provide table service?" },
  { id: 9, text: "Do you need any special decorations or themes?" },
  { id: 10, text: "Will alcohol be served at the event?" },
  { id: 11, text: "Do you require a customized menu?" },
  { id: 12, text: "Any additional requests or special instructions?" },
  { id: 13, text: "Will you provide ingredients, or will the chef have to bring them?", type: "yesno" },
];

const CustomerInfoScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = (answer = null) => {
    if (answer !== null) {
      setAnswers({ ...answers, [questions[currentStep].id]: answer });
    } else if (inputValue.trim() !== "") {
      setAnswers({ ...answers, [questions[currentStep].id]: inputValue });
      setInputValue(""); // Reset input field
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show modal and navigate after 5 seconds
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigation.navigate("Home");
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar with Percentage */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Step {currentStep + 1} of {questions.length} ({progress.toFixed(0)}%)
        </Text>
        <ProgressBar 
          progress={progress / 100} 
          color="#4CAF50" 
          style={styles.progressBar} 
        />
      </View>

      {/* Question Display */}
      <Text style={styles.questionText}>{questions[currentStep].text}</Text>

      {/* Yes/No Buttons or Text Input */}
      {questions[currentStep].type === "yesno" ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={() => handleNext("Yes")}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.noButton]} onPress={() => handleNext("No")}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter your answer"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
            <Text style={styles.buttonText}>
              {currentStep < questions.length - 1 ? "Next" : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal for Thank You Message */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Thank you for your answers!</Text>
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
    backgroundColor: "#F9F9F9",
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  progressBar: {
    width: "90%",
    height: 8,
    borderRadius: 5,
  },
  questionText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  yesButton: {
    backgroundColor: "#4CAF50",
  },
  noButton: {
    backgroundColor: "#D32F2F",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default CustomerInfoScreen;
