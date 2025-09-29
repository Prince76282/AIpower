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
     title: "Declaring an Integer Variable",
     code: "int age = 25;\nSystem.out.println(age);",
     description:
       "Shows how to declare an integer variable and print its value",
   },
   {
     title: "Declaring Multiple Variables",
     code: "int a = 5, b = 10, c = 15;\nSystem.out.println(a + b + c);",
     description:
       "Demonstrates declaring multiple integer variables in one line",
   },
   {
     title: "Floating-Point Variables",
     code: "float price = 99.99f;\nSystem.out.println(price);",
     description: "Shows how to declare a float variable and print it",
   },
   {
     title: "Boolean Variables",
     code: "boolean isJavaFun = true;\nSystem.out.println(isJavaFun);",
     description:
       "Demonstrates declaring a boolean variable and printing its value",
   },
   {
     title: "Variable Naming Rules",
     code: "int firstNumber = 1;\nint _secondNumber = 2;\nSystem.out.println(firstNumber + _secondNumber);",
     description: "Shows valid variable naming conventions in Java",
   },
 ];

  const goToQuiz = () => {
    router.push("/screen/variables/variablesQuiz"); // navigate to Strings quiz page
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
