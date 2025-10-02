import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const colors = {
  primary: "#3B82F6",
  bg: "#F0F4F8",
  card: "#FFFFFF",
};

export default function ChatbotSelectionPage() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EduPath</Text>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.welcome}>Choose Your Assistant 🤖</Text>
        <Text style={styles.subtitle}>
          Select how you want to interact: text or voice.
        </Text>

        {/* Voice Chatbot */}
        <TouchableOpacity
          style={styles.chatCard}
          onPress={() => router.push("/screen/chatbots/voice")}
        >
          <MaterialCommunityIcons
            name="microphone"
            size={32}
            color={colors.primary}
          />
          <Text style={styles.chatTitle}>Voice Chatbot</Text>
          <Text style={styles.chatDesc}>
            Talk to the assistant using your voice.
          </Text>
        </TouchableOpacity>

        {/* Text Chatbot */}
        <TouchableOpacity
          style={styles.chatCard}
          onPress={() => router.push("/screen/chatbots/chat")}
        >
          <FontAwesome5 name="comments" size={28} color={colors.primary} />
          <Text style={styles.chatTitle}>Text Chatbot</Text>
          <Text style={styles.chatDesc}>
            Chat with the assistant using text.
          </Text>
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
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 30,
    textAlign: "center",
  },
  chatCard: {
    backgroundColor: colors.card,
    width: "90%",
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 10,
  },
  chatDesc: {
    fontSize: 14,
    color: "#475569",
    marginTop: 4,
    textAlign: "center",
  },
});
