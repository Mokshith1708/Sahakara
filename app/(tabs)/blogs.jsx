import React, { useState } from "react";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import BlogPost from "@/components/BlogPost";

import useAppwrite from "@/lib/useAppwrite";
import { getAllBlogs } from "@/lib/appwrite";

const { data: _blogs, refetch } = useAppwrite(getAllBlogs);

// func to get blog-author details

const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await refetch();
  setRefreshing(false);
};

const blogs = [
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

const Blogs = () => {
  return (
    <SafeAreaView className="">
      <FlatList
        data={blogs}
        keyExtractor={(blog) => blog.$id}
        renderItem={({ blog }) => (
          <BlogPost
            blogId={blog.$id}
            profileURI={null} // has to compute using authorId
            author={null}
            time={blog.$updatedAt}
            content={blog.content}
            blogURI={blog.blogURI}
            likes={blog.likes}
            thumbsUp={blog.thumbsUp}
          />
        )}
        ListEmptyComponent={() => (
          <View className="h-full w-full flex justify-center">
            <Text>No items to show</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Blogs;
