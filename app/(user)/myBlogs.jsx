import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import BlogPost from "@/components/BlogPost";
import Loader from "@/components/Loader";
import { useGlobalContext } from "@/context/GlobalProvider";

const MyBlogs = () => {
  const { currentUser, blogs, isLoading, refetchCurrentUserData } = useGlobalContext();

  blogs.sort((a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchCurrentUserData();
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
              author={currentUser.username}
              time={item.$updatedAt}
              content={item.content}
              blogURI={item.blogURI}
              likes={item.likes}
              thumbsUp={item.thumbsUp}
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

export default MyBlogs;
