import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const BlogItem = ({ title, content, onSeeMore }) => {
  const previewContent =
    content.length > 100 ? content.substring(0, 100) + "..." : content;

  return (
    <View className="bg-[#FFFFF0]  p-4 mb-4 rounded-lg shadow-md">
      <Text className="text-xl font-bold mb-1">Blogs</Text>
      <View className="border-t border-gray-300 mt-1 mb-1" />
      <Text className="text-lg font-semibold mb-1">{title}</Text>
      <Text className="text-base mb-2">{previewContent}</Text>
      <TouchableOpacity
        className="bg-green-500 p-2 rounded"
        onPress={onSeeMore}
      >
        <Text className="text-white text-center">See More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlogItem;
