import React, { useState } from "react";
import { Text, View, SafeAreaView, FlatList, RefreshControl } from "react-native";
import BlogPost from "@/components/BlogPost";
import Loader from "@/components/Loader";
import useAppwrite from "@/lib/useAppwrite";
import { getAllBlogs } from "@/lib/appwrite";

const Blogs = () => {
  const { data: blogs, refetch, isLoading } = useAppwrite(getAllBlogs);

  // func to get blog-author details

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="">
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <FlatList
          data={blogs}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <BlogPost
              avatarURI={null} // have to compute using authorId
              author={"Anonymous"}
              time={item.$updatedAt}
              content={item.content}
              blogURI={item.blogURI}
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
      )}
    </SafeAreaView>
  );
};

export default Blogs;
