// src/screens/AddBlog.js

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
  
  const AddBlog = () => {
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
      photoURI: "",
      description: "",
      timestamp: new Date().toISOString(), // Automatically set the current time
    });
  
    const openPicker = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: ["image/jpeg", "image/png"], // Support both JPEG and PNG
        });
  
        if (result.type === "success" && result.uri) {
          setForm({ ...form, photoURI: result.uri });
        } else {
          Alert.alert("No file chosen");
        }
      } catch (error) {
        console.error("Error picking document:", error);
        Alert.alert("Error", "Failed to pick a file");
      }
    };
  
    const submit = () => {
      if (!form.photoURI || !form.description) {
        return Alert.alert("Please fill in all the fields");
      }
      setUploading(true);
      try {
        Alert.alert("Success", "Blog posted successfully");
        router.push("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setForm({
          photoURI: "",
          description: "",
          timestamp: new Date().toISOString(), // Reset timestamp to current time
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
                {form.photoURI ? (
                  <Image
                    source={{ uri: form.photoURI }}
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
              value={form.description}
              placeholder="Write something about your blog"
              handleChangeText={(e) => setForm({ ...form, description: e })}
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
  