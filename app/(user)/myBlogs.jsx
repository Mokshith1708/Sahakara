import React, { useState } from "react";
import { View, Text, SafeAreaView, FlatList, RefreshControl } from "react-native";
import BlogPost from "@/components/BlogPost";

import { useEffect } from "react";
import { getBlogsById, getCurrentUser } from "@/lib/appwrite";

const MyBlogs = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const currentUser = getCurrentUser();
  
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getBlogsById({ id: currentUser.$id });
        setData(res);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const refetch = () => fetchData();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlogPost
            blogId={item.id} // item.$id
            avatarURI={item.profilePic} // has to compute using authorId
            author={item.name}
            time={item.timeAgo} // item.$updatedAt
            content={item.content}
            blogURI={item.imageUri} // item.blogURI
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

export default MyBlogs;
