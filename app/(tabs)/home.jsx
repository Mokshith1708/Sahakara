import { Text, View, FlatList,Image, Touchable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from "../../constants"
import { router, usePathname} from "expo-router";
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';


const DATA =
[
    {
      id: '1',
      photo: icons.xbox,
      itemName: "Xbox",
      price: "$15",
      description: "High-quality gaming console with amazing graphics and performance."
    },
    {
      id: '2',
      photo: icons.profile,
      itemName: "Profile",
      price: "$15",
      description: "Profile item with excellent features and durability."
    },
    {
      id: '3',
      photo: icons.xbox,
      itemName: "Xbox",
      price: "$15",
      description: "High-quality gaming console with amazing graphics and performance."
    },
    {
      id: '4',
      photo: icons.xbox,
      itemName: "Xbox",
      price: "$15",
      description: "High-quality gaming console with amazing graphics and performance."
    },
    {
      id: '5',
      photo: icons.xbox,
      itemName: "Xbox",
      price: "$15",
      description: "High-quality gaming console with amazing graphics and performance."
    },
];

const Items = ({id,photo,itemName,price,description }) =>{
  

  const handlePress = ()=>
    {
      router.push({
        pathname: `/description/${id}`,
        params: { id},
      })
    }
  return (
    
      <TouchableOpacity onPress={handlePress} className='w-9/10 mb-2.5 mx-2.5 bg-[#ffffff] rounded-xl overflow-hidden border-2 border-[#FF9C01] shadow-lg shadow-[#000000] self-center flex-row'>
    <View className='w-1/2 border-r-2 border-r-white overflow-hidden'>
        <Image 
        source={photo}
        resizeMode="contain"
        className="w-full h-36"
        />
    </View>
    <View className='w-1/2 bg-[#FFFFF0] p-3.5'>
      <Text className='text-lg font-bold text-[#333333] mb-5'>{itemName}</Text>
      <Text className='text-base text-[#ff9900] mb-5'>{price}</Text>
      <Text className='text-sm text-[#666666]'>{description}</Text>
    </View>
    
    </TouchableOpacity>
    
   
  )
}

const home = () => {
  return (
    <SafeAreaView className='flex-1 bg-[#E6E6FA]'>
      <FlatList className='pt-0 mt-0'
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Items
            id ={item.id}
            photo={item.photo}
            itemName={item.itemName}
            price={item.price}
            description={item.description}
          />
        )}
          // ListHeaderComponent={()=>(
          //   <View className='pb-3.5 pl-3.5 pr-3.5 pt-0 bg-[#ffffff] mb-2.5 border-b-1 border-b-[#dddddd]'>
          //       <Text className="text-2xl font-bold text-[#333333]">
          //         Borrow Things
          //       </Text>
          //   </View>
          // )}
      />
    </SafeAreaView>
  )
}

export default home