import { useLocalSearchParams } from "expo-router";
import { View, Text,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Description = () => {
  const  { itemId, photoURI, itemName, price, description, userId, location } = useLocalSearchParams();
  return (
    <SafeAreaView className=" bg-[#E6E6FA] h-full">
    <View >
      <Image
      source = {{ uri: photoURI }}
      resizeMode="contain"
      className="w-full h-40 mb-5"
       />
        </View>
        <View className=" w-9/10 bg-[#FFFFF0] mb-5">
          <Text className=" text-5xl">
            {itemName}
          </Text>
          <Text className=" text-2xl">
            {description}
          </Text>
          <Text className="text-2xl">
            Cost:{price}
          </Text>
        </View>

    
   
    </SafeAreaView>
  );
};

export default Description;
