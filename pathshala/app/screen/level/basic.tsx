
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LessonScreen from "./LessonScreen";

type FeatureStatus = "completed" | "unlocked" | "locked";

interface Feature {
  name: string;
  description: string;
  status: FeatureStatus;
}

const ProductNameCreator = () => {
  const router = useRouter();
  const [completedFeatures, setCompletedFeatures] = useState<string[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadCompletedFeatures();
    }, [])
  );

  const loadCompletedFeatures = async () => {
    try {
      const savedCompleted = await AsyncStorage.getItem("completedFeatures");
      setCompletedFeatures(savedCompleted ? JSON.parse(savedCompleted) : []);
    } catch (error) {
      console.error("Error loading completed features:", error);
      setCompletedFeatures([]);
    }
  };

  const features: Feature[] = [
    {
      name: "Print",
      description: "Learn basic print statements",
      status: completedFeatures.includes("Print") ? "completed" : "unlocked",
    },
    {
      name: "Strings",
      description: "Advanced string manipulation",
      status: completedFeatures.includes("Print") ? "unlocked" : "locked",
    },
    {
      name: "Variables",
      description: "Dynamic variable management",
      status: completedFeatures.includes("Strings") ? "unlocked" : "locked",
    },
    {
      name: "Arrays",
      description: "Array data structures",
      status: completedFeatures.includes("Math") ? "unlocked" : "locked",
    },
    {
      name: "Functions",
      description: "Function creation and usage",
      status: completedFeatures.includes("Arrays") ? "unlocked" : "locked",
    },
    
  ];

  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const handleFeaturePress = (featureName: string, status: FeatureStatus) => {
    if (status === "locked") {
      Alert.alert(
        "Locked",
        `${featureName} is locked. Complete the previous lessons to unlock this feature.`
      );
    } else {
      setSelectedLesson(featureName);
    }
  };

  if (selectedLesson) {
    return <LessonScreen lessonName={selectedLesson} />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#6366f1" barStyle="light-content" />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="info-circle" size={24} color="#6366f1" />
          <Text style={styles.sectionTitle}>Java Learning Path</Text>
        </View>

        <View style={styles.badgeGrid}>
          {features.map((feature, index) => {
            
            const colors = {
              completed: { ring: "#FACC15", icon: "#FACC15" }, 
              unlocked: { ring: "#FB923C", icon: "#FB923C" }, 
              locked: { ring: "#E5E7EB", icon: "#9CA3AF" },   
            }[feature.status];

           
            const iconName = feature.status === "locked" ? "lock" : "star";

            return (
              <TouchableOpacity
                key={index}
                style={styles.badgeWrapper}
                activeOpacity={0.8}
                onPress={() => handleFeaturePress(feature.name, feature.status)}
              >
                <View
                  style={[
                    styles.badgeCircle,
                    {
                      borderColor: colors.ring,
                      backgroundColor:
                        feature.status === "locked" ? "#f9fafb" : "#fff",
                    },
                  ]}
                >
                  <FontAwesome name={iconName} size={36} color={colors.icon} />
                </View>
                <Text style={styles.badgeName}>{feature.name}</Text>
                <Text style={styles.badgeDescription}>
                  {feature.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8ff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: { marginBottom: 30 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 8,
    color: "#333",
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badgeWrapper: { width: "30%", marginBottom: 24, alignItems: "center" },
  badgeCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 10,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 4,
  },
});

export default ProductNameCreator;
