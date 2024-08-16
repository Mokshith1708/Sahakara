import React, { useState } from "react";
import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import BlogPost from "@/components/BlogPost";

import useAppwrite from "@/lib/useAppwrite";
import { getAllBlogs } from "@/lib/appwrite";

const { data: blogs, refetch } = useAppwrite(getAllBlogs);

// func to get blog-author details

const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await refetch();
  setRefreshing(false);
};

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
