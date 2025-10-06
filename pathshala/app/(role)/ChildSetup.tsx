import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setProfile } from "../../store/profileSlice"; // adjust path as needed
import { API_URL } from "../../config/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChildSetup() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [reason, setReason] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const isFormValid =
    name.trim() &&
    age.trim() &&
    email.trim() &&
    education.trim() &&
    reason.trim();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleNext = async () => {
    if (!isFormValid) return;

    const userDetails = {
      name,
      age,
      email,
      education,
      reason,
      profileImageUri: profileImage,
    };

    // ✅ Store form data in Redux
    dispatch(setProfile(userDetails));

    try {
      // ✅ Save data to MongoDB via Axios
      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", age);
      formData.append("email", email);
      formData.append("education", education);
      formData.append("reason", reason);

      if (profileImage) {
        // React Native FormData file shape; cast to any to satisfy TS in RN
        (formData as any).append("profileImage", {
          uri: profileImage,
          name: "profile.jpg",
          type: "image/jpeg",
        } as any);
      }

      const { data } = await axios.post(`${API_URL}/api/userdata`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Persist created user-data id for later profile fetch/update
      const createdId = data?._id || data?.id;
      if (createdId) {
        await AsyncStorage.setItem('userdataId', String(createdId));
      }

      console.log("User details saved successfully");
    } catch (error) {
      console.error("Error saving user details:", error);
      Alert.alert("Error", "Failed to save user details.");
    }

    // Navigate to home tab
    router.push("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Profile </Text>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePickerText}>Pick a Profile Picture</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Education Qualification"
        value={education}
        onChangeText={setEducation}
      />
      <TextInput
        style={styles.input}
        placeholder="Why use this app?"
        value={reason}
        onChangeText={setReason}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.disabledButton]}
        onPress={handleNext}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F2F8", // soft light-blue background
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E3A8A", // deep blue title
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#A7C7E7", // subtle blue border
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D1E9F9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  imagePickerText: {
    color: "#1E3A8A",
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  button: {
    backgroundColor: "#0EA5E9", // vibrant sky blue
    padding: 15,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: "#9CC9E8", // light blue when disabled
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
