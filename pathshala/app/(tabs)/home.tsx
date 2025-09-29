import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const colors = {
  primary: "#3B82F6",
  bg: "#F0F4F8",
  card: "#FFFFFF",
};

export default function SimplePage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EduPath</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.welcome}>Welcome 👋</Text>
        <Text style={styles.subtitle}>A clean, simple screen example.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/nextpage")}
        >
          <Text style={styles.buttonText}>Go to Next Page</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  header: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
