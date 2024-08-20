import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { changePassword } from "@/lib/appwrite";
import { router } from "expo-router";

const ChangePassword = () => {

    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleChangePassword =async ()=>{
        if (password == confirmPassword) {
            
        
        try {
            setIsChangingPassword(true);
        const response = await changePassword( { newPassword:password , oldPassword:oldPassword });
        router.replace('/(tabs)/profile')
        Alert.alert("Password Changed Successfully");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
       finally
       {
        setIsChangingPassword(false);
       }
    }
    else
    {
        Alert.alert("Values in both fielsds are different");
    }
     }
   
    return (
        <SafeAreaView className="bg-primary h-full">
          <ScrollView>
            <View
              className="w-full flex justify-center h-full px-4 my-3"
              style={{
                minHeight: Dimensions.get("window").height - 100,
              }}
            >
           
              <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                Enter New Password
              </Text>
              <FormField
                title="Old Password"
                value={oldPassword}
                handleChangeText={(e) => setOldPassword(e)}
                otherStyles="mt-7"
              />
              <FormField
                title="Password"
                value={password}
                handleChangeText={(e) => setPassword(e)}
                otherStyles="mt-7"
              />
              <FormField
                title="Confirm Password"
                value={confirmPassword}
                handleChangeText={(e) => setConfirmPassword(e)}
                otherStyles="mt-7"
              />
              <CustomButton
                title="Change Password"
                handlePress={handleChangePassword}
                containerStyles="mt-7"
                isLoading={isChangingPassword}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}

export default ChangePassword