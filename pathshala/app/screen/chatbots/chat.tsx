// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import axios from "axios";


// export default function Chatbot() {
//   const [chat, setChat] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const scrollViewRef = useRef();

//   // const GROQ_API_KEY =
//   //   "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";

//   const handleSend = async () => {
//     if (!userInput.trim()) return;

//     const newMessage = { role: "user", content: userInput };
//     setChat((prev) => [...prev, newMessage]);
//     setUserInput("");

//     try {
//       const messages = [
//         { role: "system", content: "You are a helpful study assistant." },
//         ...chat,
//         newMessage,
//       ];

//       const res = await axios.post(
//         "https://api.groq.com/openai/v1/chat/completions",
//         {
//           model: "llama-3.1-8b-instant",
//           messages: messages,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${GROQ_API_KEY}`,
//           },
//         }
//       );

//       const botReply = res.data.choices[0].message.content;
//       setChat((prev) => [...prev, { role: "assistant", content: botReply }]);
//     } catch (error) {
//       console.error("Groq API error:", error.response?.data || error.message);
//       setChat((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Oops! Something went wrong. Please try again.",
//         },
//       ]);
//     }
//   };

//   useEffect(() => {
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//   }, [chat]);

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <Text style={styles.header}>💬 Study Buddy</Text>
//       <ScrollView
//         style={styles.chatBox}
//         ref={scrollViewRef}
//         contentContainerStyle={{ paddingVertical: 10 }}
//       >
//         {chat.map((msg, i) => (
//           <View
//             key={i}
//             style={[
//               styles.messageContainer,
//               msg.role === "user" ? styles.userMsg : styles.botMsg,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.message,
//                 { color: msg.role === "user" ? "#fff" : "#000" },
//               ]}
//             >
//               {msg.content}
//             </Text>
//           </View>
//         ))}
//       </ScrollView>

//       <View style={styles.inputRow}>
//         <TextInput
//           style={styles.input}
//           value={userInput}
//           onChangeText={setUserInput}
//           placeholder="Type your question..."
//           placeholderTextColor="#888"
//         />
//         <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
//           <Text style={styles.sendText}>➤</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff", // White background
//     padding: 10,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000", // Black text
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   chatBox: {
//     flex: 1,
//   },
//   messageContainer: {
//     marginVertical: 6,
//     padding: 12,
//     borderRadius: 15,
//     maxWidth: "75%",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   userMsg: {
//     alignSelf: "flex-end",
//     backgroundColor: "#000", // Black bubble
//   },
//   botMsg: {
//     alignSelf: "flex-start",
//     backgroundColor: "#f0f0f0", // Light gray bubble
//   },
//   message: {
//     fontSize: 16,
//     lineHeight: 22,
//   },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 8,
//   },
//   input: {
//     flex: 1,
//     borderRadius: 25,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: "#f5f5f5", // Light gray input
//     color: "#000", // Black text input
//     fontSize: 16,
//   },
//   sendBtn: {
//     marginLeft: 8,
//     backgroundColor: "#000", // Black send button
//     borderRadius: 25,
//     padding: 14,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sendText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 18,
//   },
// });
