import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const ItemSection = ({ name, description }) => {
  const previewDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  const handleSeeMore = () => {
    router.push("/(user)/myItems");
  };

  return (
    <View className="bg-[#FFFFF0] p-4 mb-4 rounded-lg shadow-sm">
      <Text className="text-xl font-bold mb-1">My Items</Text>
      <View className="border-t border-gray-300 mt-1 mb-1" />
      <Text className="text-lg font-semibold text-gray-900 mb-1">{name}</Text>
      <Text className="text-gray-700 mb-2">{previewDescription}</Text>
      <TouchableOpacity
        className="bg-green-500 p-2 rounded-lg"
        onPress={handleSeeMore}
      >
        <Text className="text-white text-center">See More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemSection;
