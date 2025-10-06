// app/(tabs)/Profile.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../../store/profileSlice";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { API_URL } from "../../config/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME = {
  primary: "#3B82F6",
  secondary: "#10B981",
  background: "#F8FAFC",
  card: "#FFFFFF",
  textDark: "#1E293B",
  textLight: "#64748B",
  border: "#E2E8F0",
};

export default function Profile() {
  const navigation = useNavigation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, logout, isAuthenticated } = useAuth();

  type LocalProfile = {
    name: string;
    age: string;
    email: string;
    education: string;
    reason: string;
    streak: number;
    coins: number;
  };

  const [localProfile, setLocalProfile] = useState<LocalProfile>({
    name: "",
    age: "",
    email: "",
    education: "",
    reason: "",
    streak: 0,
    coins: 0,
  });

  const [profileImage, setProfileImage] = useState<any>(
    require("../../assets/images/err 1.png")
  );
  const [editMode, setEditMode] = useState(false);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = await AsyncStorage.getItem('userdataId');
        if (!id) return; // no userdata created yet
        const res = await axios.get(`${API_URL}/api/userdata/${id}`);
        const data = res.data;
        setLocalProfile({
          name: data.name || "",
          age: data.age || "",
          email: data.email || "",
          education: data.education || "",
          reason: data.reason || "",
          streak: data.streak || 0,
          coins: data.coins || 0,
        });
        if (data.profileImage)
          setProfileImage({ uri: `${API_URL}${data.profileImage}` });
      } catch (err) {
        console.warn("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, []);

  // Ask photo permission once
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Allow access to photos to upload an avatar."
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage({ uri });
      // Persist only known fields into Redux slice
      dispatch(setProfile({
        name: localProfile.name,
        age: localProfile.age,
        email: localProfile.email,
        education: localProfile.education,
        reason: localProfile.reason,
      } as any));
    }
  };

  const saveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", localProfile.name);
      formData.append("age", localProfile.age);
      formData.append("email", localProfile.email);
      formData.append("education", localProfile.education);
      formData.append("reason", localProfile.reason);

      if (profileImage && (profileImage as any).uri && typeof (profileImage as any).uri === 'string' && !(profileImage as any).uri.includes('assets/images/err 1.png')) {
        (formData as any).append("profileImage", {
          uri: (profileImage as any).uri,
          name: "profile.jpg",
          type: "image/jpeg",
        } as any);
      }

      const id = await AsyncStorage.getItem('userdataId');
      if (!id) {
        Alert.alert("Error", "No user record to update.");
        return;
      }

      await axios.put(`${API_URL}/api/userdata/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(setProfile({
        name: localProfile.name,
        age: localProfile.age,
        email: localProfile.email,
        education: localProfile.education,
        reason: localProfile.reason,
      } as any));
      Alert.alert("Saved", "Profile updated successfully.");
    } catch (err) {
      console.error("Error saving profile:", err);
      Alert.alert("Error", "Could not save profile.");
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/LoginScreen");
        },
      },
    ]);
  };

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.title}>Please log in to view your profile</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/(auth)/LoginScreen")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.background }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <FontAwesome5 name="user-circle" size={30} color={THEME.primary} />
          <FontAwesome5 name="bell" size={20} color={THEME.primary} />
        </View>

        {/* Profile card */}
        <View style={styles.card}>
          <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
            <Image
              source={profileImage}
              style={[styles.avatar, { borderColor: THEME.primary }]}
            />
            <Text style={styles.changeText}>Change Photo</Text>
          </TouchableOpacity>

          {(["name", "age", "email", "education", "reason"] as const).map((field) => (
            <View key={field} style={styles.row}>
              <Text style={styles.label}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </Text>
              {editMode ? (
                <TextInput
                  style={styles.input}
                  value={localProfile[field]}
                  onChangeText={(text) =>
                    setLocalProfile({ ...localProfile, [field]: text })
                  }
                  multiline={field === "reason"}
                />
              ) : (
                <Text style={styles.value}>
                  {localProfile[field] || "Not set"}
                </Text>
              )}
            </View>
          ))}

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: THEME.primary }]}
            onPress={() => {
              if (editMode) saveProfile();
              setEditMode(!editMode);
            }}
          >
            <Text style={styles.primaryBtnText}>
              {editMode ? "Save" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statNumber}>{localProfile.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statBox}>
            <FontAwesome5 name="coins" size={26} color={THEME.secondary} />
            <Text style={styles.statNumber}>
              {localProfile.coins.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Coins</Text>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <FontAwesome5 name="sign-out-alt" size={20} color="#f44336" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarContainer: { alignItems: "center", marginBottom: 16 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
  },
  changeText: { marginTop: 6, color: "#3B82F6", fontWeight: "600" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: { width: 90, fontWeight: "600", color: "#334155" },
  value: { flex: 1, color: "#475569" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#F9FAFB",
  },
  primaryBtn: {
    marginTop: 14,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 2,
  },
  statEmoji: { fontSize: 28, marginBottom: 4 },
  statNumber: { fontSize: 18, fontWeight: "700", color: "#3B82F6" },
  statLabel: { fontSize: 14, color: "#64748B" },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
  },
  logoutText: { marginLeft: 10, color: "#f44336", fontWeight: "600" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1E293B",
  },
  loginButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 10,
  },
  loginButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
