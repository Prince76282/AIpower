// app/login.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase.config"; // adjust the path if needed
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Google Auth Request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "<your-expo-client-id>.apps.googleusercontent.com",
    iosClientId: "<your-ios-client-id>.apps.googleusercontent.com",
    androidClientId: "<your-android-client-id>.apps.googleusercontent.com",
    webClientId: "<your-web-client-id>.apps.googleusercontent.com",
  });

  // Handle Google Sign-In Response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);

      setLoading(true);
      signInWithCredential(auth, credential)
        .then(async (result) => {
          const user = result.user;
          const userInfo = {
            name: user.displayName,
            email: user.email,
            phone: user.phoneNumber || "Not available",
            image: user.photoURL,
          };
          // Store user info locally
          await AsyncStorage.setItem("user", JSON.stringify(userInfo));
          console.log("User Info:", userInfo);
        })
        .catch((err) => {
          console.error(err);
          Alert.alert("Login Error", err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [response]);

  // Auto navigate if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/ChildSetup"); // Navigate to Home
    });
    return unsubscribe;
  }, []);

  const handleGoogleSignIn = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Sign in to access your account and explore the best homes.
        </Text>

        <TouchableOpacity
          style={[
            styles.googleButton,
            (!request || loading) && { opacity: 0.6 },
          ]}
          onPress={handleGoogleSignIn}
          disabled={!request || loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  card: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    elevation: 4,
    width: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 20,
    textAlign: "center",
  },
  googleButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  googleButtonText: { color: "white", fontWeight: "600" },
});
