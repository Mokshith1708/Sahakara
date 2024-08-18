import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Video, ResizeMode } from 'expo-av';
import CustomButton from "./CustomButton"
import FormField from './FormField';
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location'; // Import Location
import { router } from 'expo-router';

const Create = () => 
{
  const [uploading, setUploading] = useState(false);
  const [location, setLocation] = useState(null); // State to hold the location
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
    location: '' // Add location field
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setForm({ ...form, location: `${loc.coords.latitude}, ${loc.coords.longitude}` });
    })();
  }, []);

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image' ? ['image/png', 'image/jpg'] : ['video/mp4', 'video/gif']
    });
    if (!result.canceled) 
    {
      if(selectType === 'image') 
        {
        setForm({ ...form, thumbnail: result.assets[0] });
        }
      if(selectType === 'video') 
      {
        setForm({ ...form, video: result.assets[0] });
      }
    } else 
    {
      setTimeout(() => 
        {
        Alert.alert('Document picked', JSON.stringify(result, null, 2));
        }, 100);
    }
  };

  const submit = ()=> 
  {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) 
    {
      return Alert.alert('Please fill in all the fields');
    }
    setUploading(true);
    try{
      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');
    } catch (error){
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
        location: '' 
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <Text className="text-2px text-white font-psemibold">Upload the data</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your data a catchy title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload the video</Text>
          <TouchableOpacity>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center item-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center item-center">
                  {/* <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2" /> */}
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-psemibold">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.thumbnail ? (
              <Image source={{ uri: form.thumbnail.uri }} resizeMethod="cover" className="w-full h-64 rounded-2xl" />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center item-center border-2 border-black-200 flex-row space-x-2">
                {/* <Image source={icons.upload} resizeMode="contain" className="w-5 h-5" /> */}
                <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Video Prompt"
          value={form.prompt}
          placeholder="Give your data a catchy title"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

     
        <FormField
          title="Current Location"
          value={form.location}
          placeholder="Fetching current location..."
          editable={false}
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
