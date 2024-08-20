import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { icons } from "../../constants";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createService } from "@/lib/appwrite";

const Create = () => {
  const { currentUser } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    service: null,
    content: "",
  });

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["video/mp4"],
      });
      if (!result.canceled) {
        setForm({ ...form, service: result.assets[0] });
      } else if (result.canceled && !result) {
        Alert.alert("No file chosen");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick a file");
    }
  };

  const submit = async () => {
    if ((form.content === "") | !form.service) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createService({
        ...form,
        creatorId: currentUser.$id,
        creator: currentUser.username,
      });

      Alert.alert("Success", "Service uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        service: null,
        thumbnail: null,
        content: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Service</Text>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Service
          </Text>

          <TouchableOpacity onPress={() => openPicker("service")}>
            {form.service ? (
              <Video
                source={{ uri: form.service.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
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
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
