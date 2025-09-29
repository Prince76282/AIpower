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
    question: "Which statement prints 'Hello World' in Java?",
    options: [
      'System.out.printline("Hello World");',
      'System.out.println("Hello World");', // ✅ correct
      'System.println.out("Hello World");',
      'print("Hello World");',
    ],
    correctIndex: 1,
  },
  {
    question: "How do you print a variable 'name' in Java?",
    options: [
      "System.out.println(name);", // ✅ correct
      "console.log(name);",
      "System.out.print(name);",
      "echo name;",
    ],
    correctIndex: 0,
  },
  {
    question: "Which prints a number '25'?",
    options: [
      'System.out.println("25");', // ✅ correct
      "System.print(25);",
      "System.out.printline(25);",
      "print(25);",
    ],
    correctIndex: 0,
  },
  {
    question: "How do you print multiple lines in Java?",
    options: [
      'System.out.print("Line1\\nLine2");',
      'System.out.println("Line1");\nSystem.out.println("Line2");', // ✅ correct
      'console.log("Line1", "Line2");',
      'print("Line1"); print("Line2");',
    ],
    correctIndex: 1,
  },
  {
    question: "Which is correct to print a sum of 5 + 10?",
    options: [
      "System.out.println(5 + 10);", // ✅ correct
      'System.out.println("5 + 10");',
      "System.out.printline(5 + 10);",
      "print(5 + 10);",
    ],
    correctIndex: 0,
  },
];

const PrintQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const saveCompletion = async () => {
    try {
      const savedCompleted = await AsyncStorage.getItem("completedFeatures");
      let completedFeatures = savedCompleted ? JSON.parse(savedCompleted) : [];

      if (!completedFeatures.includes("Print")) {
        completedFeatures.push("Print");
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
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 < quizData.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      // Quiz completed - check score
      const percentage = Math.round((score / quizData.length) * 100);
      
      if (percentage >= 75) {
        // Score is 75% or higher - unlock Strings
        saveCompletion();
        Alert.alert(
          "Quiz Completed!",
          `Excellent! You scored ${score}/${quizData.length} (${percentage}%). The Strings lesson is now unlocked!`,
          [
            {
              text: "Continue",
              onPress: () => {
                router.push("/screen/string/basic");
              }
            }
          ]
        );
      } else {
        // Score is less than 75% - retry
        Alert.alert(
          "Quiz Completed",
          `You scored ${score}/${quizData.length} (${percentage}%). You need at least 75% to unlock the next lesson.`,
          [
            {
              text: "Retry",
              onPress: () => {
                setCurrentQ(0);
                setSelected(null);
                setScore(0);
              }
            },
            {
              text: "Go Back",
              onPress: () => router.back()
            }
          ]
        );
      }
    }
  };

  const currentQuestion = quizData[currentQ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.progressText}>
        Question {currentQ + 1} of {quizData.length} | Score: {score}
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
    color: "#065F46"
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

export default PrintQuiz;
