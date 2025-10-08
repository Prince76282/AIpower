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

type FeatureStatus = "completed" | "unlocked" | "locked";

interface Feature {
  name: string;
  description: string;
  status: FeatureStatus;
}

const IntermediateLearningPath = () => {
  const router = useRouter();
  const [completedFeatures, setCompletedFeatures] = useState<string[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadCompletedFeatures();
    }, [])
  );

  const loadCompletedFeatures = async () => {
    try {
      const savedCompleted = await AsyncStorage.getItem("completedFeaturesIntermediate");
      setCompletedFeatures(savedCompleted ? JSON.parse(savedCompleted) : []);
    } catch (error) {
      console.error("Error loading completed features:", error);
      setCompletedFeatures([]);
    }
  };

  const features: Feature[] = [
    {
      name: "OOP Basics",
      description: "Object-Oriented Programming fundamentals",
      status: completedFeatures.includes("OOP Basics") ? "completed" : "unlocked",
    },
    {
      name: "Classes",
      description: "Class creation and inheritance",
      status: completedFeatures.includes("OOP Basics") ? "unlocked" : "locked",
    },
    {
      name: "Interfaces",
      description: "Interface implementation",
      status: completedFeatures.includes("Classes") ? "unlocked" : "locked",
    },
    {
      name: "Collections",
      description: "Java Collections Framework",
      status: completedFeatures.includes("Interfaces") ? "unlocked" : "locked",
    },
    {
      name: "Exception",
      description: "Exception handling",
      status: completedFeatures.includes("Collections") ? "unlocked" : "locked",
    },
    {
      name: "File I/O",
      description: "File operations and streams",
      status: completedFeatures.includes("Exception") ? "unlocked" : "locked",
    },
  ];

  const handleFeaturePress = (featureName: string, status: FeatureStatus) => {
    if (status === "locked") {
      Alert.alert(
        "Locked",
        `${featureName} is locked. Complete the previous lessons to unlock this feature.`
      );
    } else if (status === "unlocked") {
      const routeMap: { [key: string]: string } = {
        "OOP Basics": "/screen/oop/intermediate",
        Classes: "/screen/classes/intermediate",
        Interfaces: "/screen/interfaces/intermediate",
        Collections: "/screen/collections/intermediate",
        Exception: "/screen/exception/intermediate",
        "File I/O": "/screen/fileio/intermediate",
      };
      const route = routeMap[featureName];
      route
        ? router.push(route as any)
        : Alert.alert("Coming Soon", `${featureName} lesson is coming soon!`);
    } else if (status === "completed") {
      Alert.alert("Completed", `${featureName} has been completed! Great job!`);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#6366f1" barStyle="light-content" />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome name="code" size={24} color="#6366f1" />
          <Text style={styles.sectionTitle}>Intermediate Java Path</Text>
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

export default IntermediateLearningPath;
