import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { testData } from './mockData';

// Add proper TypeScript interface
interface TestScreenProps {
  lessonName: keyof typeof testData;
  onTestComplete: (passed: boolean) => void;
}

const TestScreen: React.FC<TestScreenProps> = ({ lessonName, onTestComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  // Get test data from mockData.ts
  // Add type safety for test data
  const test = testData[lessonName];
  const currentQuestionObj = test.questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      Alert.alert("Select Answer", "Please select an answer before continuing");
      return;
    }

    // Update score before moving to next question
    if (selectedAnswer === currentQuestionObj.correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      const passed = (score / test.questions.length) >= 0.7;
      onTestComplete(passed);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="question-circle" size={24} color="#6366f1" />
        <Text style={styles.headerText}>{lessonName} Test</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.progressBar}>
          <Text style={styles.progressText}>
            Question {currentQuestion + 1} of {test.questions.length}
          </Text>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestionObj.question}</Text>
          
          {currentQuestionObj.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                selectedAnswer === index && styles.selectedAnswer
              ]}
              onPress={() => handleAnswerSelect(index)}
            >
              <Text style={[
                styles.answerText,
                selectedAnswer === index && styles.selectedAnswerText
              ]}>
                {answer}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            disabled={selectedAnswer === null}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion < test.questions.length - 1 ? "Next Question" : "Finish Test"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    color: "#4b5563",
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6366f1",
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: "#1f2937",
  },
  answerButton: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedAnswer: {
    backgroundColor: "#6366f1",
  },
  answerText: {
    fontSize: 16,
    color: "#4b5563",
  },
  selectedAnswerText: {
    color: "#fff",
  },
  nextButton: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TestScreen;