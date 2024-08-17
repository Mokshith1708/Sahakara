import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import useAppwrite from "@/lib/useAppwrite";
import { getItemsById, getCurrentUser } from "@/lib/appwrite";
import Item from "@/components/Item";

const MyBlogs = () => {
  const currentUser = getCurrentUser();
  const { data: items, refetch } = useAppwrite(getItemsById, currentUser.$id);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(currentUser.$id);
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="">
      <FlatList
        data={items}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Item
            itemId={item.$id}
            photo={item.photo}
            itemName={item.itemName}
            price={item.price}
            description={item.description}
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
