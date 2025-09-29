
// export default function AuthLayout() {
//   return (
//     <AuthProvider>
//       <Stack>
//         <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
//         <Stack.Screen name="SignupScreen" options={{ title: "Sign Up" }} />
//         <Stack.Screen
//           name="ForgotPasswordScreen"
//           options={{ title: "Reset Password" }}
//         />
//       </Stack>
//     </AuthProvider>
//   );
// }





import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide headers for auth screens
      }}
    >
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen name="SignupScreen" />
    </Stack>
  );
}
