import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../../store/store"; // adjust path to your store

export default function RoleLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="ChildProfileSetup"
          options={{ title: "Child Profile Setup" }}
        />
        <Stack.Screen name="ProfilePage" options={{ title: "Profile" }} />
      </Stack>
    </Provider>
  );
}
