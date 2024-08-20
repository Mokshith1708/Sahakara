import { useLocalSearchParams } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getLocation from "@/utilities/getLocation";
import MapView, { Marker } from "react-native-maps";
import { ScrollView } from "react-native";

const Description = () => {
  const {
    itemId,
    photoURI,
    itemName,
    price,
    description,
    userId,
    location,
    lender,
  } = useLocalSearchParams();

  const { latitude, longitude } = getLocation(location);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <View className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-pink-500 mb-4">
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
            <Text className="text-base text-gray-600 mb-4">{description}</Text>
            <Text className="text-2xl font-semibold text-gray-900 mb-4">
              Rs.{price}
            </Text>
          </View>

          {/* Location Details */}

          {/* Maps is not supporting during apk bundling */}

          {/* <View className="h-80 mb-10">
            {latitude && longitude && (
              <MapView
                style={{ height: "100%" }}
                initialRegion={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: latitude,
                    longitude: longitude,
                  }}
                  title={`${lender}`}
                  description={`${itemName}`}
                />
              </MapView>
            )}
          </View> */}
          {/* <TouchableOpacity className="bg-blue-500 py-3 px-4 rounded-lg shadow-md mb-3">
            <Text className="text-white text-lg font-semibold text-center">
              Request
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Description;
