import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF8C00",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          backgroundColor: "#FFF8F0",
          borderTopWidth: 0,
          elevation: 8,
          height: 70,
          borderRadius: 25,
          marginHorizontal: 12,
          marginBottom: 8,
          position: "absolute",
          left: 10,
          right: 10,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 2,
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size + 2} color={color} />
          ),
        }}
      />

      {/* Library */}
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size + 2} color={color} />
          ),
        }}
      />

      {/* Progress */}
      <Tabs.Screen
        name="Progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size + 2} color={color} />
          ),
        }}
      />

      {/* Switch */}
      <Tabs.Screen
        name="appswitch"
        options={{
          title: "Switch",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" size={size + 2} color={color} />
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-outline"
              size={size + 2}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
