import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const quizData = [
  {
    question: "Which of these is a valid integer variable declaration in Java?",
    options: [
      "int number = 10;", // ✅ correct
      "integer number = 10;",
      "int number;",
      "var number = 10;",
    ],
    correctIndex: 0,
  },
  {
    question:
      "How do you declare a floating-point variable 'price' with value 99.99?",
    options: [
      "float price = 99.99f;", // ✅ correct
      "double price = 99.99;",
      "float price = 99.99;",
      "int price = 99.99;",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Which is the correct way to declare multiple variables on one line?",
    options: [
      "int a = 1, b = 2, c = 3;", // ✅ correct
      "int a; int b; int c;",
      "int a = 1; int b = 2; int c = 3;",
      "int a:1, b:2, c:3;",
    ],
    correctIndex: 0,
  },
  {
    question: "What is the default value of a boolean variable in Java?",
    options: [
      "true",
      "false", // ✅ correct
      "0",
      "null",
    ],
    correctIndex: 1,
  },
  {
    question: "Which of these variable names is valid in Java?",
    options: [
      "1stNumber",
      "first_number", // ✅ correct
      "first-number",
      "first number",
    ],
    correctIndex: 1,
  },
];

const VariablesQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const router = useRouter();

  // Save "Variables" lesson completion
  const saveCompletion = async () => {
    try {
      const savedCompleted = await AsyncStorage.getItem("completedFeatures");
      let completedFeatures = savedCompleted ? JSON.parse(savedCompleted) : [];

      if (!completedFeatures.includes("Variables")) {
        completedFeatures.push("Variables");
        await AsyncStorage.setItem(
          "completedFeatures",
          JSON.stringify(completedFeatures)
        );
      }
    } catch (error) {
      console.error("Error saving completion:", error);
    }
  };

  const handleOptionPress = (index: number) => {
    if (selected !== null) return; // prevent multiple selection
    setSelected(index);

    const correctIndex = quizData[currentQ].correctIndex;
    if (index === correctIndex) {
      setScore(score + 20); // each question = 20%
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 < quizData.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      const percentage = score; // each question = 20%

      if (percentage >= 75) {
        saveCompletion();
        Alert.alert(
          "Quiz Completed!",
          `Excellent! You scored ${percentage}%. The next lesson is now unlocked!`,
          [
            {
              text: "Continue",
              onPress: () => router.push("/screen/math/basic"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Quiz Completed",
          `You scored ${percentage}%. You need at least 75% to unlock the next lesson.`,
          [
            {
              text: "Retry",
              onPress: () => {
                setCurrentQ(0);
                setSelected(null);
                setScore(0);
              },
            },
            {
              text: "Go Back",
              onPress: () => router.back(),
            },
          ]
        );
      }
    }
  };

  const currentQuestion = quizData[currentQ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.progressText}>
        Question {currentQ + 1} of {quizData.length} | Score: {score}%
      </Text>

      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.options.map((opt, idx) => {
        let bgColor = "#fff";
        if (selected !== null) {
          if (idx === currentQuestion.correctIndex) bgColor = "#4CAF50";
          else if (idx === selected) bgColor = "#F44336";
        }
        return (
          <TouchableOpacity
            key={idx}
            style={[styles.option, { backgroundColor: bgColor }]}
            onPress={() => handleOptionPress(idx)}
            disabled={selected !== null}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={[
          styles.nextButton,
          selected === null && styles.nextButtonDisabled,
        ]}
        onPress={nextQuestion}
        disabled={selected === null}
      >
        <Text style={styles.nextButtonText}>
          {currentQ + 1 === quizData.length ? "Finish Quiz" : "Next Question"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f8ff" },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#065F46",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  option: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  optionText: { fontSize: 16, color: "#333" },
  nextButton: {
    backgroundColor: "#065F46",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  nextButtonDisabled: { backgroundColor: "#ccc" },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default VariablesQuiz;
