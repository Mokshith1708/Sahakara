import React from "react";
import { View, Text, Image } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";

const ProfileHeader = ({ profileURI, name, email, points }) => {
  const maxStars = 5;
  const activeStars = Math.round(points / 240); // Normalize to 5 stars

  return (
    <View className="bg-[#FFFFF0]  shadow-lg rounded-lg p-4 flex-row items-start">
      <View className="w-32 h-32">
        <Image
          source={{ uri: profileURI }}
          className="w-full h-full rounded-lg border-2 border-green-500"
        />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-2xl font-bold text-black mt-2">{name}</Text>
        <Text className="text-sm text-gray-600">{email}</Text>
        <View className="mt-1">
          <View className="flex-row mb-1">
            {Array.from({ length: maxStars }, (_, index) => (
              <StarIcon
                key={index}
                size={20} // Adjust star size
                color={index < activeStars ? "gold" : "gray"}
              />
            ))}
          </View>
          <Text className="text-sm font-bold text-green-600">
            Score: {points}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
