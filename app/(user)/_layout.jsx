import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const UserLayout = () => {
  return (
    <GestureHandlerRootView>
      <StatusBar backgroundColor="#161622" style="light" />
      <Stack>
        <Stack.Screen name="myBlogs" options={{ title: "My Blogs" }} />
        <Stack.Screen name="myItems" options={{ title: "My Items" }} />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default UserLayout;
