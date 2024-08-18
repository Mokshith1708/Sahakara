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
import Loader from "@/components/Loader";

const MyItems = () => {
  const { user: currentUser } = useGlobalContext();
  const {
    data: items,
    refetch,
    isLoading,
  } = useAppwrite(getItemsById, currentUser.$id); // change in the database to support this

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(currentUser.$id);
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
