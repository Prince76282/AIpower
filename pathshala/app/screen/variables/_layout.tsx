import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // show headers globally
      }}
    >
      <Stack.Screen
        name="Print"
        options={{
          title: "Print", // custom header title
          headerStyle: { backgroundColor: "#065F46" }, // header background
          headerTintColor: "#fff", // header text/icon color
        }}
      />
    </Stack>
  );
}
