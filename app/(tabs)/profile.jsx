// src/screens/ProfileScreen.js

import React from "react";
import { ScrollView, View, Text } from "react-native";
import ProfileHeader from "@/components/ProfileHeader";
import BlogSection from "@/components/BlogSection";
import ItemSection from "@/components/ItemSection";

const profile = {
  profilePic: "https://via.placeholder.com/150",
  name: "John Doe",
  email: "john.doe@example.com",
  points: 1200, // Example value
  greenIndex: 75, // Example value
};

const blogs = [
  {
    id: 1,
    title: "My First Blog",
    content:
      "This is the content of my first blog. It is a bit long, so only part of it will be shown here.",
  },
  {
    id: 2,
    title: "Another Blog",
    content: "Content of another blog.",
  },
  // Add more blog data as needed
];

const items = [
  {
    id: 1,
    name: "Item 1",
    description:
      "This is item 1 description. It may be a bit long, so only a preview will be shown here.",
  },
  {
    id: 2,
    name: "Item 2",
    description: "This is item 2 description.",
  },
  // Add more item data as needed
];

const ProfileScreen = () => {
  return (
    <ScrollView className="flex-1 bg-[#E6E6FA] p-4">
      <ProfileHeader
        profilePic={profile.profilePic}
        name={profile.name}
        email={profile.email}
        points={profile.points}
      />

      <View className="mt-4">
        {items.slice(0, 1).map((item) => (
          <ItemSection
            key={item.id}
            name={item.name}
            description={item.description}
          />
        ))}
      </View>

      <View className="mb-6">
        {blogs.slice(0, 1).map((blog) => (
          <BlogSection
            key={blog.id}
            title={blog.title}
            content={blog.content}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
