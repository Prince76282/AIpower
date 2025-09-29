import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function AuthError() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const message = params.message || "Authentication failed";

  return (
    <View style={styles.container}>
      <FontAwesome name="exclamation-triangle" size={60} color="#f44336" />
      <Text style={styles.title}>Authentication Error</Text>
      <Text style={styles.message}>{decodeURIComponent(message)}</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.replace("/(auth)/LoginScreen")}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#1976d2",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});