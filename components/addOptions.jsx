import { View, Text, Modal, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const AddOptions = ({ modalVisible, setModalVisible }) => {
  const options = [
    { id: "1", name: "Lend an item" },
    { id: "2", name: "Lend a service" },
    { id: "3", name: "Add a blog" },
  ];

  const handleOptionPress = (option) => {
    // console.log(`Selected ${option.name}`);
    option.id === "1"
      ? router.push("/(create)/lendItem")
      : option.id === "2"
      ? router.push("/(create)/addService")
      : router.push("/(create)/addBlog");
    setModalVisible(false);
  };

  return (
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
  );
};

export default AddOptions;
