import { FlatList, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Item from "@/components/Item";
import useAppwrite from "@/lib/useAppwrite";
import { getAllItems } from "@/lib/appwrite";

const { data: items, refetch } = useAppwrite(getAllItems);

const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await refetch();
  setRefreshing(false);
};

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#E6E6FA]">
      <FlatList
        className="pt-0 mt-0"
        data={items}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Item
            id={item.$id}
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
