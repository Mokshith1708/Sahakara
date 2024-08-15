import { Text, View } from "react-native";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

export default function Index() {
  // logic to skip authentication

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Welcome to Sahakara</Text>
      <CustomButton
        title="Continue with Email"
        handlePress={() => router.push("/sign-in")}
        containerStyles="w-full mt-7"
      />
    </View>
  );
}
