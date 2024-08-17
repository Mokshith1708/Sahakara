import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const UserLayout = () => {
  return (
    <>
      <StatusBar backgroundColor="#161622" style="light"/>
      <Stack>
        <Stack.Screen
          name="myBlogs"
        />
        {/* <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        /> */}
      </Stack>
    </>
  );
};

export default UserLayout;
