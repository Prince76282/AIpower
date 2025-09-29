import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function EducationDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
   
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.grid}>
         
          <CourseBox
            icon="game-controller-outline"
            title="Puzzles Game"
            sub="Play & Learn"
            onPress={() => router.push("/screen/math/PuzzlesGame")}
          />

          <CourseBox
            icon="brain-outline"
            title="Trick Your Mind"
            sub="Challenge Yourself"
            onPress={() => router.push("/screen/math/TrickYourMind")}
          />

          <CourseBox
            icon="bulb-outline"
            title="Solve the Problem"
            sub="Practice"
            onPress={() => router.push("/screens/SolveTheProblem")}
          />

          <CourseBox
            icon="scan-outline"
            title="Scan and Solve"
            sub="Quick Solve"
            onPress={() => router.push("/screens/ScanAndSolve")}
          />

          <CourseBox
            icon="clipboard-outline"
            title="Test Yourself"
            sub="Quiz Time"
            onPress={() => router.push("/screens/TestYourself")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CourseBox({
  icon,
  title,
  sub,
  onPress,
}: {
  icon: any;
  title: string;
  sub: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.courseBox} onPress={onPress}>
      <Ionicons name={icon} size={28} color={colors.primary} />
      <Text style={styles.lessonTitle}>{title}</Text>
      <Text style={styles.lessonSub}>{sub}</Text>
    </TouchableOpacity>
  );
}

const colors = {
  primary: "#3B82F6",
  accent: "#10B981",
  bg: "#F0F4F8",
  card: "#FFFFFF",
  textDark: "#1E293B",
  textLight: "#475569",
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  headerRight: { flexDirection: "row", alignItems: "center" },
  statCard: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.accent,
    marginRight: 5,
  },
  content: { padding: 20 },
  welcome: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: { fontSize: 16, color: colors.textLight, marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  courseBox: {
    backgroundColor: colors.card,
    width: "48%",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    marginTop: 8,
    textAlign: "center",
  },
  lessonSub: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    marginTop: 4,
  },
});
