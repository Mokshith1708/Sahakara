import React, { useState } from "react";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import BlogPost from "@/components/BlogPost";

import useAppwrite from "@/lib/useAppwrite";
import { getAllBlogs } from "@/lib/appwrite";

const blogs = [
  {
    id: "1",
    profilePic: "https://via.placeholder.com/150",
    name: "Jane Doe",
    timeAgo: "2 hours ago",
    content: "This is an example of a LinkedIn-style blog post. Here you can write about your thoughts, experiences, or share updates.",
    imageUri: "https://via.placeholder.com/600x400",
  },
  {
    id: "2",
    profilePic: "https://via.placeholder.com/150",
    name: "John Smith",
    timeAgo: "5 hours ago",
    content: "Another example of a blog post. You can include different types of content here.",
    imageUri: "https://via.placeholder.com/600x400",
  },
  {
    id: "3",
    profilePic: "https://via.placeholder.com/150",
    name: "Alice Johnson",
    timeAgo: "1 day ago",
    content: "Sharing some more content for this blog post. Make sure to keep it engaging and informative.",
    imageUri: "",
  },
  // Add more blog posts as needed
];

const Blogs = () => {

  const { data: _blogs, refetch } = useAppwrite(getAllBlogs);

  // func to get blog-author details

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="">
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlogPost
            blogId={item.id} // item.$id
            profileURI={item.profilePic} // has to compute using authorId
            author={item.name}
            time={item.timeAgo} // item.$updatedAt
            content={item.content}
            blogURI={item.imageUri} // blog.blogURI
            likes={0}
            thumbsUp={0}
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
