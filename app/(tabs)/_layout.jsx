import React, { useState } from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import ThreeDotsMenu from "@/components/ThreeDotsMenu";
import { Image, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AddOptions from "@/components/addOptions";

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

  return (
    <GestureHandlerRootView>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ff9001",
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
          name="services"
          options={{
            title: "Services",
            headerStyle: { backgroundColor: "#FFA500" },
            tabBarIcon: ({ color }) => {
              return <TabIcon icon={icons.service} name="Services" color={color} />;
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
      <AddOptions
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </GestureHandlerRootView>
  );
}
