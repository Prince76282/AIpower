import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const StringPage = () => {
  const router = useRouter();

  const examples = [
    {
      title: "Creating a String",
      code: 'String greeting = "Hello World!";\nSystem.out.println(greeting);',
      description: "Shows how to create a string and print it",
    },
    {
      title: "Concatenating Strings",
      code: 'String firstName = "John";\nString lastName = "Doe";\nSystem.out.println(firstName + " " + lastName);',
      description: "Combines two strings using the + operator",
    },
    {
      title: "String Methods",
      code: 'String text = "hello";\nSystem.out.println(text.toUpperCase());\nSystem.out.println(text.length());',
      description:
        "Demonstrates converting to uppercase and finding string length",
    },
  ];

  const goToQuiz = () => {
    router.push("/screen/string/StringQuiz"); // navigate to Strings quiz page
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Java Strings</Text>
        <Text style={styles.description}>
          Strings in Java are objects that represent sequences of characters.
          You can create, concatenate, and manipulate strings using various
          methods.
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

export default StringPage;
