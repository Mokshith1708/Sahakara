import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createBlog } from "@/lib/appwrite";

const AddBlog = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    photo: "",
    content: "",
  });

  const { user: currentUser } = useGlobalContext();

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png"], // Support both JPEG and PNG
      });

      if (!result.canceled) {
        setForm({ ...form, photo: result.assets[0] });
      } else if (result.canceled && !result) {
        Alert.alert("No file chosen");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick a file");
    }
  };

  const submit = async () => {
    if (!form.photo || !form.content) {
      return Alert.alert("Please fill in all the fields");
    }
    setUploading(true);
    try {
      await createBlog({
        ...form,
        authorId: currentUser.$id,
        author: currentUser.username,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        photo: "",
        content: "",
      });
      setUploading(false);
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
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-psemibold">
              Blog Picture
            </Text>
            <TouchableOpacity onPress={openPicker}>
              {form.photo ? (
                <Image
                  source={{ uri: form.photo.uri }}
                  resizeMode="cover"
                  className="w-full h-64 rounded-2xl"
                />
              ) : (
                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                  <Text className="text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <FormField
            title="Description"
            value={form.content}
            placeholder="Write something about your blog"
            handleChangeText={(e) => setForm({ ...form, content: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Post"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddBlog;
