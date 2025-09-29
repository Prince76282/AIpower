import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = ({
  progressWidth,
  calculateProgress,
  activeSection,
  scrollToSection,
  LEVEL_SECTIONS,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Learning Adventure</Text>
        <View style={styles.profileContainer}>
          <View style={styles.profileIcon}>
            <FontAwesome5 name="user" size={18} color="#FF8C00" />
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(calculateProgress() * 100)}% Complete
        </Text>
      </View>

      <View style={styles.sectionSelector}>
        {LEVEL_SECTIONS.map((section, index) => (
          <TouchableOpacity
            key={section.title}
            style={[
              styles.sectionButton,
              activeSection === index && {
                backgroundColor: section.color,
                shadowColor: section.color,
              },
            ]}
            onPress={() => scrollToSection(index)}
          >
            <FontAwesome5
              name={section.icon}
              size={18}
              color={activeSection === index ? "#fff" : section.color}
            />
            <Text
              style={[
                styles.sectionButtonText,
                activeSection === index && styles.activeSectionButtonText,
              ]}
            >
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#FFE5B4",
    shadowColor: "#FF8C00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF8C00",
    fontFamily: "sans-serif-medium",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFE5B4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF8C00",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  progressBackground: {
    width: "100%",
    height: 12,
    backgroundColor: "#FFE5B4",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FF8C00",
    borderRadius: 10,
  },
  progressText: {
    fontSize: 14,
    color: "#FF8C00",
    fontWeight: "600",
  },
  sectionSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  sectionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: "#FFE5B4",
    shadowColor: "#FF8C00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#FF8C00",
  },
  activeSectionButtonText: {
    color: "#fff",
  },
});

export default Header;
