import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import timeAgo from "@/utilities/timeAgo";

const BlogPost = ({
  avatarURI,
  author,
  time,
  content,
  blogURI,
  likes,
  thumbsUp,
}) => {
  const [liked, setLiked] = useState(false);
  const [thumbedUp, setThumbedUp] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [thumbCount, setThumbCount] = useState(thumbsUp);
  console.log(blogURI,":blog image");
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    // update in the backend
  };

  const handleThumbsUp = () => {
    setThumbedUp(!thumbedUp);
    setThumbCount(thumbedUp ? thumbCount - 1 : thumbCount + 1);
    // update in the backend
  };

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
            source={{ uri: avatarURI }}
            className="w-10 h-10 rounded-full border border-[#FF9C01]"
          />
          <View className="ml-2">
            <Text className="text-base font-bold text-[#161622]">{author}</Text>
            <Text className="text-xs text-[#757575]">{timeAgo(time)}</Text>
          </View>
        </View>

        {/* Post Content */}
        <Text className="text-sm text-[#212121] mb-2 leading-5">{content}</Text>

        {/* Post Image */}
        {blogURI && (
          <Image
            source={{ uri: blogURI }}
            className="w-full h-40 rounded-lg mb-2"
          />
        )}

        {/* Interactions */}
        <View className="flex-row items-center mt-1">
          <TouchableOpacity
            className="flex-row items-center mr-2"
            onPress={handleLike}
          >
            <Icon name="heart" size={22} color={liked ? "red" : "#757575"} />
            <Text
              className={`text-sm ml-1 ${
                liked ? "text-red-500" : "text-[#757575]"
              }`}
            >
              {likeCount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={handleThumbsUp}
          >
            <Icon
              name="thumbs-up"
              size={22}
              color={thumbedUp ? "blue" : "#757575"}
            />
            <Text
              className={`text-sm ml-1 ${
                thumbedUp ? "text-blue-500" : "text-[#757575]"
              }`}
            >
              {thumbCount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BlogPost;
