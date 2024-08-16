import { Tabs } from "expo-router";
import { icons } from "../../constants"
import { Image, View,Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThreeDotsMenu from "@/components/ThreeDotsMenu";

const TabIcon = ({ icon,name,color})=>{
  return (
    <View className="flex items-center justify-center">
  <Image
      source={icon}
      resizeMode="contain"
      className="w-6 h-6"
      tintColor={color}
    />
    <Text  className={`font-pregular text-xs`}>
      {name}
    </Text>
  </View>
  );
}

export default function RootLayout() {


  return (
    <GestureHandlerRootView>
   <Tabs
   screenOptions={{
    tabBarActiveTintColor: "#1750e8",
    tabBarInactiveTintColor: "#030a1d",
    tabBarShowLabel: false,
   }}
   >
    <Tabs.Screen name="home" 
    options={{
        title:"Home",
        headerShown: false,
        tabBarIcon:({color}) =>{
          return(
          <TabIcon
          icon={icons.home}
          name="Home"
          color={color}
          />
          )
        }
    }}/>
    <Tabs.Screen name="chat" 
    options={{
        title:"Chat",
        headerShown: false,
        tabBarIcon:({color}) =>{
          return(
          <TabIcon
          icon={icons.chat}
          name="Chat"
          color={color}
          />
          )
        }
    }}/>
    <Tabs.Screen name="form" 
    options={{
        title:"Lend",
        headerShown: false,
        tabBarIcon:({color}) =>{
          return(
          <TabIcon
          icon={icons.add}
          name="Lend"
          color={color}
          />
          )
        }
    }}/>
    <Tabs.Screen name="blog" 
    options={{
        title:"Blogs",
        headerStyle: { backgroundColor: '#FFA500' },
        tabBarIcon:({color}) =>{
          return(
          <TabIcon
          icon={icons.blog}
          name="Blogs"
          color={color}
          
          />
          )
        }
    }}/>
    <Tabs.Screen name="profile" 
    options={{
        title:"Profile",
        headerStyle: { backgroundColor: '#FFA500' },
        headerRight: () => <ThreeDotsMenu />,
        tabBarIcon:({color}) =>{
          return(
          <TabIcon
          icon={icons.profile}
          name="Profile"
          color={color}
          />
          )
        }
    }}/>

   </Tabs>
   </GestureHandlerRootView>
  );
}
