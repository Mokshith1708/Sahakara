import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const Item = ({ id, photo, itemName, price, description }) => {
  const handlePress = () => {
    router.push({
      pathname: `/queries/${id}`,
      params: { id },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="w-9/10 mb-2.5 mx-2.5 bg-[#ffffff] rounded-xl overflow-hidden border-2 border-[#FF9C01] shadow-lg shadow-[#000000] self-center flex-row"
    >
      <View className="w-1/2 border-r-2 border-r-white overflow-hidden">
        <Image source={photo} resizeMode="contain" className="w-full h-36" />
      </View>
      <View className="w-1/2 bg-[#FFFFF0] p-3.5">
        <Text className="text-lg font-bold text-[#333333] mb-5">
          {itemName}
        </Text>
        <Text className="text-base text-[#ff9900] mb-5">{price}</Text>
        <Text className="text-sm text-[#666666]">{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
