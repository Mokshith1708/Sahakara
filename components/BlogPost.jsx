import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { tw } from 'nativewind'; // Import the Tailwind function

const BlogPost = ({ profilePic, name, timeAgo, content, imageUri }) => {
  const [liked, setLiked] = useState(false);
  const [thumbedUp, setThumbedUp] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [thumbCount, setThumbCount] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleThumb = () => {
    setThumbedUp(!thumbedUp);
    setThumbCount(thumbedUp ? thumbCount - 1 : thumbCount + 1);
  };

  return (
    <View
      className="bg-[#FFFFF0] p-3 rounded-2xl mb-1 shadow-lg mx-4 mt-2" // Reduced margin-bottom and margin-top
      style={{ 
        maxWidth: 350, 
        borderColor: '#FF9C01', 
        borderWidth: 2, // Increased border thickness
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 4 // Shadow radius
      }}
    >
      {/* Profile Header */}
      <View className="flex-row items-center mb-2">
        <Image
          source={{ uri: profilePic }}
          className="w-10 h-10 rounded-full border border-[#FF9C01]"
        />
        <View className="ml-2">
          <Text className="text-base font-bold text-[#161622]">{name}</Text>
          <Text className="text-xs text-[#757575]">{timeAgo}</Text>
        </View>
      </View>

      {/* Post Content */}
      <Text className="text-sm text-[#212121] mb-2 leading-5">{content}</Text>

      {/* Post Image */}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          className="w-full h-40 rounded-lg mb-2"
        />
      )}

      {/* Interactions */}
      <View className="flex-row items-center mt-1">
        <TouchableOpacity
          className="flex-row items-center mr-2"
          onPress={handleLike}
        >
          <Icon
            name="heart"
            size={22}
            color={liked ? 'red' : '#757575'}
          />
          <Text className={`text-sm ml-1 ${liked ? 'text-red-500' : 'text-[#757575]'}`}>
            {likeCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={handleThumb}
        >
          <Icon
            name="thumbs-up"
            size={22}
            color={thumbedUp ? 'blue' : '#757575'}
          />
          <Text className={`text-sm ml-1 ${thumbedUp ? 'text-blue-500' : 'text-[#757575]'}`}>
            {thumbCount}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BlogPost;
