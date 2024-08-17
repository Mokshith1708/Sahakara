import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const UserLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="#161622" style="light" />
      <Stack>
        <Stack.Screen name="myBlogs" options={{ title: "My Blogs" }} />
        <Stack.Screen name="myItems" options={{ title: "My Items" }} />
      </Stack>
    </>
  );
};

export default UserLayout;
