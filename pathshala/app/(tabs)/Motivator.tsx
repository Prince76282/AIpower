import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Linking,
  Platform,
  StatusBar,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// ✅ Define quotes
const quotes = [
  { text: "Believe in yourself!", icon: "smile-beam" },
  { text: "Stay positive, work hard.", icon: "running" },
  { text: "Never give up.", icon: "hand-rock" },
  { text: "Dream big, achieve bigger.", icon: "rocket" },
  { text: "Your only limit is you.", icon: "brain" },
  { text: "Progress over perfection.", icon: "chart-line" },
  { text: "Small steps lead to big changes.", icon: "walking" },
  { text: "Consistency is key.", icon: "key" },
];

// ✅ Define meditation videos
const meditationVideos = [
  {
    title: "2-min Focus Break",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM",
  },
  {
    title: "Morning Mindfulness",
    url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
  },
];

// Define TypeScript type for video
type Video = { title: string; url: string };

const MotivatorPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

  const openVideo = (video: Video) => {
    setCurrentVideo(video);
    setModalVisible(true);
  };

  const closeVideo = () => {
    setModalVisible(false);
    setCurrentVideo(null);
  };

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF3E0" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>💡 Daily Motivation</Text>
          <FontAwesome5 name="sun" size={28} color="#FF6F00" />
        </View>

        {/* Random Quote */}
        <View style={styles.quoteContainer}>
          <Text style={styles.title}>Your Daily Boost</Text>
          <Text style={styles.quoteText}>{randomQuote.text}</Text>
          <FontAwesome5 name={randomQuote.icon} size={50} color="#FF6F00" />
        </View>

        {/* Meditation Videos */}
        <View style={styles.meditationContainer}>
          <Text style={styles.sectionTitle}>Quick Focus Breaks 🧘‍♂️</Text>
          {meditationVideos.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={styles.videoButton}
              onPress={() => openVideo(video)}
            >
              <Ionicons name="play-circle" size={28} color="#FFF" />
              <Text style={styles.videoText}>{video.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Certificates */}
        <View style={styles.certificateContainer}>
          <Text style={styles.sectionTitle}>Certificates 🎓</Text>
          <TouchableOpacity
            style={styles.certificateButton}
            onPress={() => alert("Certificate integration coming soon!")}
          >
            <FontAwesome5 name="certificate" size={24} color="#FFF" />
            <Text style={styles.certificateText}>Get Your Certificate</Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{currentVideo?.title}</Text>
              <TouchableOpacity
                style={styles.openLinkButton}
                onPress={() =>
                  currentVideo && Linking.openURL(currentVideo.url)
                }
              >
                <Text style={styles.openLinkText}>Open in YouTube</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeVideo}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MotivatorPage;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFF3E0",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFE0B2",
    borderBottomWidth: 1,
    borderBottomColor: "#FFCC80",
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF6F00",
  },
  quoteContainer: {
    alignItems: "center",
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#FFF3E0",
    borderRadius: 15,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6F00",
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 18,
    color: "#6D4C41",
    textAlign: "center",
    marginBottom: 10,
  },
  meditationContainer: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6F00",
    marginBottom: 10,
  },
  videoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6F00",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  videoText: { color: "#FFF", fontSize: 16, marginLeft: 10 },
  certificateContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  certificateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A1B9A",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
  },
  certificateText: { color: "#FFF", fontSize: 16, marginLeft: 10 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  openLinkButton: {
    backgroundColor: "#FF6F00",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  openLinkText: { color: "#FFF", fontWeight: "bold" },
  closeButton: { backgroundColor: "#BDBDBD", padding: 12, borderRadius: 10 },
  closeText: { color: "#FFF", fontWeight: "bold" },
});
