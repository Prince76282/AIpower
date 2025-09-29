import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const GyanScreen = () => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient
      colors={["#1E3A8A", "#14B8A6"]} // deep blue → teal
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />

      <View style={styles.imageStack}>
        <Image
          source={require("../assets/images/err 1.png")}
          style={styles.baseImage}
        />
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>
          Learn Smarter with{"\n"}AI Power App
        </Text>
        <Text style={styles.infoSub}>Empower Your Daily Learning Journey</Text>
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableWithoutFeedback
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => router.push("/LoginScreen")} // Navigate to LoginScreen
        >
          <Animated.View
            style={[styles.button, { transform: [{ scale: pressAnim }] }]}
          >
            <Text style={styles.buttonText}>LET’S GO!</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </LinearGradient>
  );
};

export default GyanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageStack: {
    width: "80%",
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
  },
  baseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  infoSection: {
    marginTop: 16,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 6,
  },
  infoSub: {
    fontSize: 15,
    color: "#E0F2F1",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#0D9488", // deeper teal for contrast
    width: width * 0.6,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
