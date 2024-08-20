import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import timeAgo from "@/utilities/timeAgo";
import { icons } from "@/constants";

const Service = ({ creator, time, content, serviceURI }) => {
  const { profile, play_circle } = icons;
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView>
      <View
        className="bg-[#FFFFF0] p-3 rounded-2xl mb-1 shadow-lg mx-4 mt-2"
        style={{
          maxWidth: 350,
          borderColor: "#FF9C01",
          borderWidth: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        {/* Profile Header */}
        <View className="flex-row items-center mb-2">
          <Image
            source={profile}
            className="w-10 h-10 rounded-full border border-[#FF9C01]"
          />
          <View className="ml-2">
            <Text className="text-base font-bold text-[#161622]">
              {creator}
            </Text>
            <Text className="text-xs text-[#757575]">{timeAgo(time)}</Text>
          </View>
        </View>

        {/* Post Content */}
        <Text className="text-sm text-[#212121] mb-2 leading-5">{content}</Text>

        <View className="w-full h-40 rounded-xl mt-3 relative flex justify-center items-center">
          {isLoading && (
            <ActivityIndicator
              size="large"
              color="#FF9C01"
              style={{
                position: "absolute",
                top: "47%",
                left: "47%",
                transform: [{ translateX: -12 }, { translateY: -12 }],
              }}
            />
          )}

          {play ? (
            <Video
              source={{ uri: serviceURI }}
              className="w-full h-40 rounded-xl"
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls={false}
              shouldPlay
              onPlaybackStatusUpdate={(status) => {
                if (status.isLoaded) {
                  setIsLoading(false); // Hide spinner once the video is loaded
                }
                if (status.didJustFinish) {
                  setPlay(false); // Stop the video when it finishes
                }
              }}
              onLoadStart={() => setIsLoading(true)} // Show spinner when loading starts
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPlay(true)}
              className="w-full h-40 rounded-xl relative flex justify-center items-center"
            >
              <Image
                source={play_circle}
                className="w-12 h-12 absolute"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Interactions */}
      </View>
    </SafeAreaView>
  );
};

export default Service;
