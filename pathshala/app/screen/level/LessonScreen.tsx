import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LessonData } from "./types";
import { lessonData } from './mockData';  // <-- Already correct in your import
import TestScreen from './TestScreen';

interface LessonScreenProps {
  lessonName: string;
}

const LessonScreen: React.FC<LessonScreenProps> = ({ lessonName }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [lesson, setLesson] = useState<LessonData | null>(null);

  // In the useEffect hook, fix the data reference:
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Replace lessonMockData with lessonData
        setLesson(lessonData[lessonName as keyof typeof lessonData] || null);
      } catch (_err) {
        Alert.alert("Error", "Failed to load lesson data");
        console.error(_err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [lessonName]);

  // Add new state for showing test
  const [showTest, setShowTest] = useState(false);
  
  // Modify handleComplete to show test instead of completing immediately
  const handleComplete = () => {
    setShowTest(true);
  };
  
  // Add test completion handler
  const handleTestComplete = async (passed: boolean) => {
    if (passed) {
      try {
        const savedCompleted = await AsyncStorage.getItem("completedFeatures");
        const completedFeatures = savedCompleted ? JSON.parse(savedCompleted) : [];
        
        if (!completedFeatures.includes(lessonName)) {
          completedFeatures.push(lessonName);
          await AsyncStorage.setItem("completedFeatures", JSON.stringify(completedFeatures));
        }
  
        Alert.alert(
          "Congratulations!",
          `You've passed the ${lessonName} test!`,
          [{ text: "Continue Learning", onPress: () => router.back() }]
        );
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to save progress");
      }
    } else {
      Alert.alert(
        "Try Again",
        "You need to score at least 70% to pass. Review the lesson and try again.",
        [{ text: "Review Lesson", onPress: () => setShowTest(false) }]
      );
    }
  };
  
  // Modify return statement to show test when appropriate
  if (showTest) {
    return <TestScreen lessonName={lessonName} onTestComplete={handleTestComplete} />;
  }

  if (loading || !lesson) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="code" size={24} color="#6366f1" />
  <Text style={styles.headerText}>{lesson.lessonName}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.stepTitle}>
          {lesson.steps[currentStep].title}
        </Text>
        <Text style={styles.explanation}>
          {lesson.steps[currentStep].content}
        </Text>

        <View style={styles.codeBlock}>
          <Text style={styles.codeText}>
            {lesson.steps[currentStep].example}
          </Text>
        </View>

        <View style={styles.taskSection}>
          <Text style={styles.taskTitle}>Practice Task:</Text>
          <Text style={styles.taskText}>
            {lesson.steps[currentStep].task}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (currentStep < lesson.steps.length - 1) {
              setCurrentStep(currentStep + 25);
            } else {
              handleComplete();
            }
          }}
        >
          <Text style={styles.buttonText}>
            {currentStep < lesson.steps.length - 1
              ? "Next Step"
              : "Complete Lesson"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  explanation: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  codeBlock: {
    backgroundColor: "#1f2937",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  codeText: {
    color: "#e5e7eb",
    fontFamily: "monospace",
  },
  taskSection: {
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  taskText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6366f1",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LessonScreen;