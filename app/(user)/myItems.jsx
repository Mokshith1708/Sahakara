import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import Item from "@/components/Item";
import Loader from "@/components/Loader";

const MyItems = () => {
  const { currentUser, items, isLoading, refetchCurrentUserData } =
    useGlobalContext();

  items.sort((a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt));

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
          data={items}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Item
              itemId={item.$id}
              photoURI={item.photoURI}
              itemName={item.itemName}
              price={item.price}
              description={item.description}
              userId={currentUser.$id}
              location={null}
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

export default MyItems;
