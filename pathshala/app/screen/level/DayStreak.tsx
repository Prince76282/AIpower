import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DayStreak = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="fire" size={32} color="#FF6B6B" />
        <Text style={styles.title}>Daily Streak</Text>
      </View>
      
      <View style={styles.streakContainer}>
        {[1, 2, 3, 4, 5].map((day) => (
          <View key={day} style={styles.dayCircle}>
            <Text style={styles.dayText}>{day}</Text>
            <FontAwesome 
              name="check-circle" 
              size={24} 
              color={day <= 3 ? "#4CAF50" : "#BDBDBD"} 
            />
          </View>
        ))}
      </View>
      
      <Text style={styles.motivationText}>
        Keep learning to maintain your streak! 🔥
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#333",
  },
  streakContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  dayCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#666",
  },
  motivationText: {
    fontSize: 18,
    textAlign: "center",
    color: "#4CAF50",
    fontWeight: "500",
  },
});

export default DayStreak;