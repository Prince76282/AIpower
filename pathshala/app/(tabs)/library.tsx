import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const Library = () => {
  const router = useRouter();

  const sections = [
    {
      title: "Java Programming",
      courses: [
        {
          name: "Basic Java",
          icon: "code",
          color: "#4facfe",
          route: "/screen/level/basic",
          description: "Learn fundamental Java concepts",
          levels: [
            { id: 1, title: "Print Statements", locked: false },
            { id: 2, title: "Variables", locked: true },
            { id: 3, title: "Control Flow", locked: true },
          ],
        },
        {
          name: "Intermediate Java",
          icon: "laptop-code",
          color: "#00f2fe",
          route: "/screen/level/intermediate",
          description: "Advanced programming concepts",
          levels: [
            { id: 1, title: "Object-Oriented Programming", locked: false },
            { id: 2, title: "Exception Handling", locked: true },
          ],
        },
        {
          name: "Advanced Java",
          icon: "brain",
          color: "#19B7B7",
          route: "/screen/level/advanced",
          description: "Master complex Java topics",
        },
      ],
    },
    {
      title: "Data Structures",
      courses: [
        {
          name: "Arrays & Strings",
          icon: "layer-group",
          color: "#FF6B6B",
          route: "/screen/dsa/arrays",
          description: "Basic data structures",
        },
        {
          name: "Linked Lists",
          icon: "link",
          color: "#4ECDC4",
          route: "/screen/dsa/linked-lists",
          description: "Linear data structures",
        },
      ],
    },
  ];

  const handleLevelPress = (course, level) => {
    if (level.locked) {
      Alert.alert(
        "Level Locked",
        "Complete previous levels to unlock this one!"
      );
      return;
    }
    router.push({
      pathname: course.route,
      params: { levelId: level.id },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#4facfe" />

      <LinearGradient
        colors={["#4facfe", "#00f2fe"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>📚 Learning Library</Text>
      </LinearGradient>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 🔝 Chatbot Quick Tools at Top */}
        <View style={styles.chatSection}>
          <Text style={styles.sectionTitle}>🤖 Quick Chatbots</Text>
          <View style={styles.chatGrid}>
            <TouchableOpacity
              style={styles.chatCard}
              onPress={() => router.push("/screen/chatbots/chat")}
            >
              <FontAwesome5 name="comments" size={22} color="#4facfe" />
              <Text style={styles.chatTitle}>Text</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chatCard}
              onPress={() => router.push("/screen/chatbots/voice")}
            >
              <FontAwesome5 name="microphone" size={22} color="#FF6B6B" />
              <Text style={styles.chatTitle}>Voice</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chatCard}
              onPress={() => router.push("/screen/chatbots/image")}
            >
              <FontAwesome5 name="image" size={22} color="#19B7B7" />
              <Text style={styles.chatTitle}>Image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.chatCard}
              onPress={() => router.push("/screen/chatbots/aiassistant")}
            >
              <FontAwesome5 name="robot" size={22} color="#FFD166" />
              <Text style={styles.chatTitle}>AI</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🔽 Course Sections Below */}
        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            {section.courses.map((course, courseIndex) => (
              <View key={courseIndex} style={styles.courseContainer}>
                <View style={styles.courseHeader}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: course.color },
                    ]}
                  >
                    <FontAwesome5 name={course.icon} size={24} color="#fff" />
                  </View>
                  <Text style={styles.courseName}>{course.name}</Text>
                </View>

                <View style={styles.levelGrid}>
                  {(course.levels || []).map((level, levelIndex) => (
                    <TouchableOpacity
                      key={levelIndex}
                      style={[
                        styles.levelCard,
                        level.locked && styles.lockedLevel,
                      ]}
                      onPress={() => handleLevelPress(course, level)}
                    >
                      <FontAwesome5
                        name={level.locked ? "lock" : "play-circle"}
                        size={20}
                        color={level.locked ? "#999" : course.color}
                      />
                      <Text
                        style={[
                          styles.levelTitle,
                          level.locked && styles.lockedText,
                        ]}
                      >
                        Level {level.id}: {level.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  scroll: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  courseContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  courseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  levelGrid: {
    flexDirection: "column",
  },
  levelCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 12,
  },
  lockedLevel: {
    opacity: 0.7,
    backgroundColor: "#eee",
  },
  levelTitle: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginLeft: 10,
  },
  lockedText: {
    color: "#999",
  },

  // 💬 Chat Section (Top Flow Icons)
  chatSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  chatGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  chatCard: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chatTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginTop: 6,
    textAlign: "center",
  },
});

export default Library;
