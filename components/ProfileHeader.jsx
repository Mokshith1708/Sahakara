import React from "react";
import { View, Text, Image } from "react-native";
import { icons } from "@/constants";

const ProfileHeader = ({ profileURI, name, email, points }) => {
  const { profile } = icons;

  return (
    <View className="bg-[#FFFFF0]  shadow-lg rounded-lg p-4 flex-row items-start">
      <View className="w-28 h-32">
        <Image
          source={profile}
          className="w-full h-full rounded-lg border-2 border-green-500"
        />
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-2xl font-bold text-black mt-2">{name}</Text>
        <Text className="text-sm text-gray-600">{email}</Text>
        <View className="mt-1">
          <Text className="text-sm font-bold text-green-600">
            Score: {points}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
