import { useLocalSearchParams } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import getLocation from "@/utilities/getLocation";
import { ScrollView } from "react-native";
import { getUserById } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";

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

  // const { latitude, longitude } = getLocation(location);
  const { data: user } = useAppwrite(getUserById, userId);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <View className="bg-white rounded-2xl shadow-lg overflow-hidden border border-pink-500 mb-4">
          {/* Image Section */}
          <View className="w-full h-80 border-b border-gray-300">
            <Image
              source={{ uri: photoURI }}
              resizeMode="contain"
              className="w-full h-full"
            />
          </View>

          {/* Product Details */}
          <View className="p-6 bg-pink-50">
            <Text className="text-3xl font-extrabold text-pink-700 mb-2">
              {itemName}
            </Text>
            <Text className="text-base text-gray-700 mb-4 leading-relaxed">
              {description}
            </Text>
            <Text className="text-2xl font-semibold text-pink-800 mb-4">
              Rs. {price}
            </Text>
          </View>

          {/* Lender Contact Details */}
          <View className="p-6 bg-gray-50">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Contact Details:
            </Text>
            <Text className="text-base text-gray-600 mb-1">
              📞 Phone: {user?.phoneNumber || "Not available"}
            </Text>
            <Text className="text-base text-gray-600">
              📧 Email: {user?.email || "Not available"}
            </Text>
          </View>

          {/* Location Details */}

          {/* Maps is not supporting during apk bundling */}

          {/* 
          <View className="h-80 mb-10">
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
          </View> 
          */}

          {/* Request Button */}
          {/* 
          <TouchableOpacity className="bg-pink-500 py-3 px-4 rounded-lg shadow-md mb-3">
            <Text className="text-white text-lg font-semibold text-center">
              Request
            </Text>
          </TouchableOpacity> 
          */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Description;
