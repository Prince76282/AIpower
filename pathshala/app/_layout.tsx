


import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./../store/store";
import { AuthProvider } from "../context/AuthContext";
import "./global.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="Login" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(role)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="screen" />
          <Stack.Screen name="auth" />
        </Stack>
      </AuthProvider>
    </Provider>
  );
}