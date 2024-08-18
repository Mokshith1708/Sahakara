import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Description = () => {
  const { itemId, photoURI, itemName, price, description, userId, location } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <View className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-pink-500">
        {/* Image Section with Bottom Border */}
        <View className="w-full h-80 border-b border-gray-300 rounded-lg mb-4">
          <Image
            source={{ uri: photoURI }}
            resizeMode="contain"
            className="w-full h-full"
          />
        </View>

        {/* Product Details */}
        <View className="p-6">
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            {itemName}
          </Text>
          <Text className="text-base text-gray-600 mb-4">
            {description}
          </Text>
          <Text className="text-2xl font-semibold text-gray-900 mb-4">
            ${price}
          </Text>
          <View className="flex-row items-center mb-4">
            {/* Rating and Reviews */}
            <Text className="text-yellow-500 text-xl">★★★★★</Text>
            <Text className="text-gray-600 text-sm ml-2">(120 reviews)</Text>
          </View>
          <TouchableOpacity className="bg-blue-500 py-3 px-4 rounded-lg shadow-md">
            <Text className="text-white text-lg font-semibold text-center">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Description;
