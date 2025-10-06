import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import * as Speech from "expo-speech";
import axios from "axios";

type Message = { role: "user" | "assistant"; content: string };

export default function SpeechChatbot() {
  const [chat, setChat] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const GROQ_API_KEY =
    "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";

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const userMessage: Message = { role: "user", content: text };
    setChat((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const messages = [
        { role: "system", content: "You are a helpful study assistant." },
        ...chat,
        userMessage,
      ];

      const res = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-8b-instant",
          messages: messages,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
        }
      );

      const botReply = res.data.choices[0].message.content;
      const botMessage: Message = { role: "assistant", content: botReply };
      setChat((prev) => [...prev, botMessage]);

      Speech.speak(botReply, { language: "en", pitch: 1, rate: 1 });
    } catch (err) {
      console.error(err);
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Error occurred" },
      ]);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [chat]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // adjust if needed
    >
      <Text style={styles.header}>🎙️ Study Buddy</Text>

      <ScrollView
        style={styles.chatBox}
        ref={scrollRef}
        contentContainerStyle={{ paddingVertical: 10 }}
        keyboardShouldPersistTaps="handled"
      >
        {chat.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.messageContainer,
              msg.role === "user" ? styles.userMsg : styles.botMsg,
            ]}
          >
            <Text style={{ color: msg.role === "user" ? "#fff" : "#000" }}>
              {msg.content}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type your question..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => handleSend(input)}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => handleSend(input)}
        >
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chatBox: { flex: 1, marginBottom: 10 },
  messageContainer: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 15,
    maxWidth: "75%",
  },
  userMsg: { alignSelf: "flex-end", backgroundColor: "#000" },
  botMsg: { alignSelf: "flex-start", backgroundColor: "#f0f0f0" },
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  input: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    color: "#000",
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#000",
    borderRadius: 25,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
