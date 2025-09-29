import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Svg, { Defs, LinearGradient, Rect } from "react-native-svg";

const LevelModal = ({ selectedLevel, closeModal, startLevel }) => {
  if (!selectedLevel) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View
          style={[styles.modalHeader, { backgroundColor: selectedLevel.color }]}
        >
          <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
            <Defs>
              <LinearGradient
                id="modalGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <Stop offset="0%" stopColor={selectedLevel.gradient[0]} />
                <Stop offset="100%" stopColor={selectedLevel.gradient[1]} />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#modalGradient)" />
          </Svg>
          <View style={styles.modalIcon}>
            {selectedLevel.type === "Beginner" && (
              <FontAwesome5 name={selectedLevel.icon} size={36} color="#fff" />
            )}
            {selectedLevel.type === "Intermediate" && (
              <MaterialIcons name={selectedLevel.icon} size={40} color="#fff" />
            )}
            {selectedLevel.type === "Advanced" && (
              <FontAwesome5 name={selectedLevel.icon} size={36} color="#fff" />
            )}
          </View>
          <Text style={styles.modalTitle}>
            {selectedLevel.type} Level {selectedLevel.id}
          </Text>
        </View>

        <View style={styles.modalBody}>
          <Text style={styles.modalDescription}>
            {selectedLevel.description}
          </Text>

          <View style={styles.pointsContainer}>
            <FontAwesome5 name="star" size={24} color="#FF8C00" />
            <Text style={styles.pointsText}>{selectedLevel.points} points</Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={closeModal}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: selectedLevel.color },
              ]}
              onPress={startLevel}
            >
              <Text style={styles.startButtonText}>Start Level</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,140,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    width: "100%",
    maxWidth: 400,
    shadowColor: "#FF8C00",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
    overflow: "hidden",
  },
  modalIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    zIndex: 1,
  },
  modalBody: {
    padding: 25,
  },
  modalDescription: {
    fontSize: 16,
    color: "#FF8C00",
    marginBottom: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    padding: 15,
    backgroundColor: "#FFE5B4",
    borderRadius: 10,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF8C00",
    marginLeft: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    borderRadius: 12,
    padding: 16,
    minWidth: "45%",
    alignItems: "center",
    shadowColor: "#FF8C00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: "#FFE5B4",
  },
  cancelButtonText: {
    color: "#FF8C00",
    fontWeight: "700",
    fontSize: 16,
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default LevelModal;
