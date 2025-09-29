import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function AuthCallback() {
  const [loading, setLoading] = useState(true);
  const { handleGoogleCallback } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      const { token, user } = params;
      
      if (token && user) {
        const result = await handleGoogleCallback(token, JSON.parse(decodeURIComponent(user)));
        
        if (result.success) {
          router.replace("/(tabs)/home");
        } else {
          Alert.alert("Authentication Failed", result.error);
          router.replace("/(auth)/LoginScreen");
        }
      } else {
        Alert.alert("Authentication Failed", "Missing authentication data");
        router.replace("/(auth)/LoginScreen");
      }
    } catch (error) {
      console.error("Callback error:", error);
      Alert.alert("Authentication Failed", "An error occurred during authentication");
      router.replace("/(auth)/LoginScreen");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.text}>Completing authentication...</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});