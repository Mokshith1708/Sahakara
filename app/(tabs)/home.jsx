import { FlatList, View, Text, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import Item from "@/components/Item";
import useAppwrite from "@/lib/useAppwrite";
import { getAllItems } from "@/lib/appwrite";
import SearchBar from "@/components/SearchBar";

const items = [
  {
    id: "1",
    photo: images.Xbox,
    itemName: "Xbox",
    price: "$15",
    description:
      "High-quality gaming console with amazing graphics and performance.",
  },
  {
    id: "2",
    photo: images.Xbox,
    itemName: "Profile",
    price: "$15",
    description: "Profile item with excellent features and durability.",
  },
  {
    id: "3",
    photo: images.Xbox,
    itemName: "Xbox",
    price: "$15",
    description:
      "High-quality gaming console with amazing graphics and performance.",
  },
  {
    id: "4",
    photo: images.Xbox,
    itemName: "Xbox",
    price: "$15",
    description:
      "High-quality gaming console with amazing graphics and performance.",
  },
  {
    id: "5",
    photo: images.Xbox,
    itemName: "Xbox",
    price: "$15",
    description:
      "High-quality gaming console with amazing graphics and performance.",
  },
];

const Home = () => {
  const { data: _items, refetch } = useAppwrite(getAllItems);

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
      <FlatList
        className="pt-0 mt-0"
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            itemId={item.id}
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

export default Home;
