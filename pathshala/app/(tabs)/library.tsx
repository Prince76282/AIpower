import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ProductNameCreator from "../screen/java/basic";
import MediamPage from "../screen/java/mediam";

const Library = () => {
  const handlePress = (title: string) => {
    Alert.alert("Card Selected", `You tapped on ${title}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#4facfe" // Android header color
      />

      {/* Gradient Header */}
      <LinearGradient
        colors={["#4facfe", "#00f2fe"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>📚 Library</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ProductNameCreator Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => handlePress("Product Name Creator")}
        >
          <View style={styles.card}>
            <ProductNameCreator />
          </View>
        </TouchableOpacity>

        {/* MediamPage Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => handlePress("Mediam Page")}
        >
          <View style={styles.card}>
            <MediamPage />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Library;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
});
