import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Description = () => {
  const { query } = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>{query}</Text>
    </View>
  );
};

export default Description;
