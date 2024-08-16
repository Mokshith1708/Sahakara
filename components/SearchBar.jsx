import { View } from 'react-native'
import React from 'react'
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = () => {
    return (
      <View className="relative w-9/10 mb-5 mx-2.5 h-14 bg-[#FFFFF0] rounded-lg flex">
        <Icon
          name="search"
          size={20}
          color="#888"
          style={{ position: 'absolute', left: 10, top: 17 }}
        />
        <TextInput
          className="h-full pl-10 text-lg"
          placeholder="What Do You Want?"
          selectionColor="#ff9900"
        />
      </View>
    );
  }
  

export default SearchBar
