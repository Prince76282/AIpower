import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // show headers globally
      }}
    >
      <Stack.Screen
        name="Chat"
        options={{
          title: "basic", // custom header title
          headerStyle: { backgroundColor: "#065F46" }, // header background
          headerTintColor: "#fff", // header text/icon color
        }}
      />
      <Stack.Screen
        name="Advanced"
        options={{
          title: "voice", // custom header title
          headerStyle: { backgroundColor: "#065F46" }, // header background
          headerTintColor: "#fff", // header text/icon color
        }}
      />
       <Stack.Screen
        name="intermediate"
        options={{
          title: "voice", // custom header title
          headerStyle: { backgroundColor: "#065F46" }, // header background
          headerTintColor: "#fff", // header text/icon color
        }}
      />
    </Stack>
  );
}
