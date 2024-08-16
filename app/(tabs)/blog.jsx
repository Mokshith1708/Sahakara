import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import BlogPost from '@/components/BlogPost';

const posts = [
  {
    profilePic: "https://via.placeholder.com/150",
    name: "Jane Doe",
    timeAgo: "2 hours ago",
    content: "This is an example of a LinkedIn-style blog post. Here you can write about your thoughts, experiences, or share updates.",
    imageUri: "https://via.placeholder.com/600x400",
  },
  {
    profilePic: "https://via.placeholder.com/150",
    name: "John Smith",
    timeAgo: "5 hours ago",
    content: "Another example of a blog post. You can include different types of content here.",
    imageUri: "https://via.placeholder.com/600x400",
  },
  {
    profilePic: "https://via.placeholder.com/150",
    name: "Alice Johnson",
    timeAgo: "1 day ago",
    content: "Sharing some more content for this blog post. Make sure to keep it engaging and informative.",
    imageUri: "",
  },
  // Add more blog posts as needed
];

const FeedScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#E6E6FA] ">
      <ScrollView contentContainerStyle="p-4">
        {posts.map((post, index) => (
          <BlogPost
            key={index}
            profilePic={post.profilePic}
            name={post.name}
            timeAgo={post.timeAgo}
            content={post.content}
            imageUri={post.imageUri}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedScreen;
