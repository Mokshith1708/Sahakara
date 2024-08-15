import { Text, View, FlatList,Image, Touchable} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from "../../constants"
import { router, usePathname} from "expo-router";
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';


const DATA =
[
  {
    id:1,
    photo: icons.xbox,
    itemName: "Xbox",
    price: "$15"
  },
  {
    id:2,
    photo: icons.profile,
    itemName: "Xbox",
    price: "15"
  },
  {
    id:3,
    photo: icons.xbox,
    itemName: "Xbox",
    price: "15"
  },
  {
    id:4,
    photo: icons.xbox,
    itemName: "Xbox",
    price: "15"
  },
  {
    id:5,
    photo: icons.xbox,
    itemName: "Xbox",
    price: "15"
  },
];

const Items = ({id,photo,itemName,price}) =>{
  

  const handlePress = ()=>
    {
      router.push({
        pathname: `/description/${id}`,
        params: { id},
      })
    }
  return (
    
      <TouchableOpacity onPress={handlePress}>
    <View className='flex-row bg-white rounded-lg border-2 border-[#f7fafc] h-100'>
      <View className='flex-1 bg-[#e8f0ff] rounded-lg'>
        <Image 
        source={photo}
        resizeMode="contain"
        className="w-full h-40 rounded-lg border-9"
        />
      </View>
      <View className='flex-1 bg-[#54abf9] rounded-lg'>
        <Text className='text-2xl font-pbold'>{itemName}</Text>
        <Text className='text-xl font-psemibold'>{price}</Text>
      </View>
    </View>
    </TouchableOpacity>
    
   
  )
}

const home = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Items
            id ={item.id}
            photo={item.photo}
            itemName={item.itemName}
            price={item.price}
          />
        )}
          ListHeaderComponent={()=>(
            <View>
                <Text className="text-2xl font-psemibold text-black py-5">
                  Borrow Things
                </Text>
            </View>
          )}
      />
    </SafeAreaView>
  )
}

export default home