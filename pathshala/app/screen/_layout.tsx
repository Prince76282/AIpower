import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // show headers globally
      }}
    >
      <Stack.Screen
        name="Profile"
        options={{
          title: "My Profile", // custom header title
          headerStyle: { backgroundColor: "#065F46" }, // header background
          headerTintColor: "#fff", // header text/icon color
        }}
      />

      {/* Add DayStreak page */}
      <Stack.Screen
        name="DayStreak"
        options={{
          title: "Day Streak", // header title
          headerStyle: { backgroundColor: "#FF4500" }, // optional: streak color
          headerTintColor: "#fff", // text/icon color
        }}
      />
      <Stack.Screen
        name="Header"
        options={{
          title: "Header", // header title
          headerStyle: { backgroundColor: "#FF4500" },
          headerTintColor: "#fff", // text/icon color
        }}
      />
      <Stack.Screen
        name="BeginnerSection"
        options={{
          title: "Beginner Section", // header title
          headerStyle: { backgroundColor: "#FF4500" },
          headerTintColor: "#fff", // text/icon color
        }}
      />
      <Stack.Screen
        name="Level"
        options={{
          title: "Level", // header title
          headerStyle: { backgroundColor: "#FF4500" },
          headerTintColor: "#fff", // text/icon color
        }}
      />
      <Stack.Screen
        name="LevelModal"
        options={{
          title: "Level Modal", // header title
          headerStyle: { backgroundColor: "#FF4500" },
          headerTintColor: "#fff", // text/icon color
        }}
      />
      <Stack.Screen
        name="IntermediateSection"
        options={{
          title: "Intermediate Section", // header title
          headerStyle: { backgroundColor: "#FF4500" },
          headerTintColor: "#fff", // text/icon color
        }}
      />

      <Stack.Screen
        name="AdvancedSection"
        options={{
          title: "Advanced Section", // header title
          headerStyle: { backgroundColor: "#FF4500" },
          headerTintColor: "#fff", // text/icon color
        }}
      />

      <Stack.Screen
        name="Math"
        options={{
          title: "MathPage", // header title
          headerStyle: { backgroundColor: "#FF4500" },
          headerTintColor: "#fff", // text/icon color
        }}
      />
    </Stack>
  );
}
