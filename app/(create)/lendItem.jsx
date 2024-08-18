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
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import * as DocumentPicker from "expo-document-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const LendItem = () => {
  const [uploading, setUploading] = useState(false);
  const [location, setLocation] = useState(null);
  const { user: currentUser } = useGlobalContext();
  const [form, setForm] = useState({
    itemName: "",
    photo: "",
    price: 0,
    description: "",
    userId: "",
    location: "",
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setForm({
        ...form,
        location: `${loc.coords.latitude}, ${loc.coords.longitude}`,
      });
    })();
  }, []);

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/jpeg", "image/png"],
      });

      // Debugging: Check the result object
      // console.log("DocumentPicker result:", result);

      if (!result.canceled) {
        setForm({ ...form, photo: result.assets[0] });
      } else {
        setTimeout(() => {
          Alert.alert("No file chosen");
        }, 100);
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick a file");
    }
  };

  const submit = () => {
    if (!form.itemName || !form.photo || !form.price || !form.description) {
      return Alert.alert("Please fill in all the fields");
    }
    setUploading(true);
    try {
      Alert.alert("Success", "Item listed successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        itemName: "",
        photo: "",
        price: 0,
        description: "",
        userId: "",
        location: "",
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
          <FormField
            title="Item Name"
            value={form.itemName}
            placeholder="Name of the item"
            handleChangeText={(e) => setForm({ ...form, itemName: e })}
            otherStyles="mt-7"
          />
          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-psemibold">
              Item Image
            </Text>
            <TouchableOpacity onPress={() => openPicker()}>
              {form.photo ? (
                <Image
                  source={{ uri: form.photo.uri }}
                  resizeMethod="cover"
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
            placeholder="Give your item a catchy description"
            handleChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Price"
            value={form.price}
            placeholder="Set the price of the item"
            handleChangeText={(e) => setForm({ ...form, price: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Current Location"
            value={form.location}
            placeholder="Fetching current location..."
            editable={false}
            otherStyles="mt-7"
          />
          <View style={{ height: 300, marginTop: 20 }}>
            {location && (
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="You are here"
                  description={`Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`}
                />
              </MapView>
            )}
          </View>
          <CustomButton
            title="Done"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LendItem;
