import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const CreateLayout = () => {
  return (
    <GestureHandlerRootView>
      <StatusBar backgroundColor="#161622" style="light" />
      <Stack>
        <Stack.Screen name="lendItem" options={{ title: "Lend Item" }} />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default CreateLayout;
