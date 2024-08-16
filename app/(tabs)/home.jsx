import { FlatList, View, Text, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images"
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

  // const { data: _items, refetch } = useAppwrite(getAllItems);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#E6E6FA]">
      <FlatList
        className="pt-0 mt-0"
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            photo={item.photo}
            itemName={item.itemName}
            price={item.price}
            description={item.description}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <SearchBar />
          </View>
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
