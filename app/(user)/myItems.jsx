import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import useAppwrite from "@/lib/useAppwrite";
import { getItemsById } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import Item from "@/components/Item";

const MyItems = () => {
  const { user: currentUser } = useGlobalContext();
  const { data: items, refetch } = useAppwrite(getItemsById, currentUser.id);

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
            photoURI={item.photoURI}
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

export default MyItems;
