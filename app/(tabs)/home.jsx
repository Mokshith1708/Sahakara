import { FlatList, View, Text, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Item from "@/components/Item";
import useAppwrite from "@/lib/useAppwrite";
import { getAllItems } from "@/lib/appwrite";
import SearchBar from "@/components/SearchBar";
import Loader from "@/components/Loader";

const Home = () => {
  const { data: items, refetch, isLoading } = useAppwrite(getAllItems);
  items.sort((a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt));
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E6E6FA]">
      <SearchBar value={searchQuery} handleSearch={handleSearch} />
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <FlatList
          className="pt-0 mt-0"
          data={filteredItems}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Item
              itemId={item.$id}
              photoURI={item.photoURI}
              itemName={item.itemName}
              price={item.price}
              description={item.description}
              userId={item.userId}
              location={item.location}
              lender={item.lender}
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

export default Home;
