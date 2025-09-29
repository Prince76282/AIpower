import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Level from "../screen/Level";

const IntermediateSection = ({
  onLayout,
  handleLevelPress,
  pulseAnim,
  floatingAnim,
}) => {
  const section = {
    title: "Intermediate",
    data: Array.from({ length: 5 }, (_, i) => ({
      id: i + 6,
      type: "Intermediate",
      icon: "lightbulb",
      color: "#FF8C00",
      gradient: ["#FF8C00", "#FFB347"],
      description: "Challenge yourself with more complex problems",
      points: 250,
      completed: i < 1,
      locked: i >= 2,
    })),
    icon: "lightbulb",
    color: "#FF8C00",
    background: require("../../assets/images/err 1.png"),
  };

  return (
    <View onLayout={(event) => onLayout(event, 1)}>
      {/* Section header with background */}
      <ImageBackground
        source={section.background}
        style={styles.sectionHeader}
        imageStyle={styles.sectionHeaderImage}
      >
        <View style={styles.sectionHeaderOverlay}>
          <View
            style={[styles.sectionIcon, { backgroundColor: section.color }]}
          >
            <FontAwesome5 name={section.icon} size={28} color="#fff" />
          </View>
          <View style={styles.sectionHeaderTextContainer}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
            <Text style={styles.sectionSubtitle}>
              {section.data.filter((l) => l.completed).length} of{" "}
              {section.data.length} completed
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* Levels in this section */}
      {section.data.map((level, levelIndex) => (
        <Level
          key={level.id}
          level={level}
          levelIndex={levelIndex}
          sectionIndex={1}
          isLastInSection={levelIndex === section.data.length - 1}
          handleLevelPress={handleLevelPress}
          pulseAnim={pulseAnim}
          floatingAnim={floatingAnim}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#FF8C00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  sectionHeaderImage: {
    borderRadius: 15,
  },
  sectionHeaderOverlay: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255,140,0,0.8)",
  },
  sectionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  sectionHeaderTextContainer: {
    flex: 1,
  },
  sectionHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginTop: 4,
  },
});

export default IntermediateSection;
