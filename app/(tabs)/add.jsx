import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Add = () => {
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
    <SafeAreaView className="flex-1 items-center justify-center">
      <TouchableOpacity
        className="p-4 bg-blue-500 rounded-md"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white">Show Options</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-gray-600 bg-opacity-50">
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
    </SafeAreaView>
  );
};

export default Add;
