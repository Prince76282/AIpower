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

const PrintPage = () => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);

  const examples = [
    {
      title: "Basic Print",
      code: 'System.out.println("Hello World!");',
      description: "Hello World is printed to the console",
    },
    {
      title: "Print with Variables",
      code: 'String name = "John";\nSystem.out.println("Hello " + name);',
      description: "Combines text with variables",
    },
    {
      title: "Print Numbers",
      code: 'int age = 25;\nSystem.out.println("Age: " + age);',
      description: "Prints numbers and text together",
    },
        {
      title: "Print Numbers",
      code: 'int age = 25;\nSystem.out.println("Age: " + age);',
      description: "Prints numbers and text together",
    },
  ];

  const goToQuiz = () => {
    router.push("/screen/print/PrintQuiz"); // navigate to PrintQuiz page
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>What is System.out.println?</Text>
        <Text style={styles.description}>
          System.out.println() is used to print text to the console in Java.
          It's one of the most basic and important commands you'll learn!
        </Text>

        <Text style={styles.sectionTitle}>Examples:</Text>
        {examples.map((example, index) => (
          <View key={index} style={styles.exampleCard}>
            <Text style={styles.exampleTitle}>{example.title}</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>{example.code}</Text>
            </View>
            <Text style={styles.exampleDescription}>{example.description}</Text>
          </View>
        ))}

        {/* Quiz Button */}
        <TouchableOpacity style={styles.quizButton} onPress={goToQuiz}>
          <FontAwesome name="question-circle" size={16} color="#fff" />
          <Text style={styles.quizButtonText}>Take Quiz</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  exampleCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#065F46",
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#333",
  },
  exampleDescription: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  quizButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#065F46",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  quizButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default PrintPage;
