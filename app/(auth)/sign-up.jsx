import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";

import { createUser } from "@/lib/appwrite";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password || !phoneNumber) {
      Alert.alert("Please fill in all fields");
    }
    setIsSignedUp(true);
    try {
      const newUser = await createUser({
        username: username,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      });

      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSignedUp(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-1"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {/* <Image /> */}
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign up to Sahakara
          </Text>
          <FormField
            title="Username"
            value={username}
            handleChangeText={(e) => setUsername(e)}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={email}
            handleChangeText={(e) => setEmail(e)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={password}
            handleChangeText={(e) => setPassword(e)}
            otherStyles="mt-7"
          />
          <FormField
            title="PhoneNumber"
            value={phoneNumber}
            handleChangeText={(e) => setPhoneNumber(e)}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={handleSignUp}
            containerStyles="mt-7"
            isLoading={isSignedUp}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
