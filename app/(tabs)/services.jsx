import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import Service from "@/components/Service";
import Loader from "@/components/Loader";
import useAppwrite from "@/lib/useAppwrite";
import { getAllServices } from "@/lib/appwrite";

const Services = () => {
  const { data: services, refetch, isLoading } = useAppwrite(getAllServices);
  services.sort((a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt));
  // func to get blog-author details

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="">
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <FlatList
          data={services}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Service
              creator={item.creator}
              content={item.content}
              time={item.$updatedAt}
              serviceURI={item.serviceURI}
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

export default Services;
