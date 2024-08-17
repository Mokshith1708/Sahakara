import React, { useState } from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import ThreeDotsMenu from "@/components/ThreeDotsMenu";
import { Image, View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TabIcon = ({ icon, name, color }) => {
  return (
    <View className="flex items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        tintColor={color}
      />
      <Text className={`font-pregular text-xs`}>{name}</Text>
    </View>
  );
};

export default function TabsLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  const options = [
    { id: "1", name: "Option 1" },
    { id: "2", name: "Option 2" },
    { id: "3", name: "Option 3" },
  ];

  const handleOptionPress = (option) => {
    console.log(`Selected ${option.name}`);
    setModalVisible(false);
  };

  return (
    <GestureHandlerRootView>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1750e8",
          tabBarInactiveTintColor: "#030a1d",
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerStyle: { backgroundColor: "#FFA500" },
            tabBarIcon: ({ color }) => {
              return <TabIcon icon={icons.home} name="Home" color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color }) => {
              return <TabIcon icon={icons.chat} name="Chat" color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="add"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(true);
            },
          }}
          options={{
            title: "Add",
            headerShown: false,
            tabBarIcon: ({ color }) => {
              return <TabIcon icon={icons.add} name="Add" color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="blogs"
          options={{
            title: "Blogs",
            headerStyle: { backgroundColor: "#FFA500" },
            tabBarIcon: ({ color }) => {
              return <TabIcon icon={icons.blog} name="Blogs" color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerStyle: { backgroundColor: "#FFA500" },
            headerRight: () => <ThreeDotsMenu />,
            tabBarIcon: ({ color }) => {
              return (
                <TabIcon icon={icons.profile} name="Profile" color={color} />
              );
            },
          }}
        />
      </Tabs>

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View className="flex-1 justify-end bg-white-600 bg-opacity-100">
    <View className="bg-white p-4 rounded-t-lg">
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="p-4 border-b border-gray-300"
            onPress={() => handleOptionPress(item)}
          >
            <Text className="text-black">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        className="mt-4 p-4 bg-red-500 rounded-md"
        onPress={() => setModalVisible(false)}
      >
        <Text className="text-white text-center">Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </GestureHandlerRootView>
  );
}
