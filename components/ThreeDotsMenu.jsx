// src/components/ThreeDotsMenu.js

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from '@/lib/appwrite';
import { router } from 'expo-router';


const { width, height } = Dimensions.get('window');

const ThreeDotsMenu = () => {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current;

  const toggleMenu = () => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    } else {
      setVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

 const handlePressOutside = (event) => {
    // Close menu if the touch is outside the menu
    const { pageX, pageY } = event.nativeEvent;
    if (pageX<width) {
      closeMenu();
    }
  };

  const handleSignOut =async ()=>{
    try {
      await signOut();
      router.replace('/(auth)/sign-in');
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }
  const handleChangePassword =()=>{
     router.push('/(create)/changePassword')
  }

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      <TouchableOpacity onPress={toggleMenu} style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
        <Ionicons name="ellipsis-vertical" size={24} color="#000000" />
      </TouchableOpacity>
      {visible && (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <Animated.View style={{
            position: 'absolute',
            top: 0,
            right: 0,
            transform: [{ translateX: slideAnim }],
            backgroundColor: '#2E2E2E', // Dark background for a modern look
            borderRadius: 0,
            shadowColor: '#000',
            shadowOffset: { width: -2, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            padding: 20,
            elevation: 5,
            height: height,
            width: width * 0.65, // Full height and adjusted width
          }}>
            <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: '#FFFFFF',
              marginBottom: 20,
              textAlign: 'center'
            }}>
              Profile Settings
            </Text>

            {[{itemName:"Sign Out",funct:handleSignOut},{itemName:"Change Password",funct:handleChangePassword}].map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={option.funct}
                style={{
                  backgroundColor: '#3A3A3A',
                  borderColor: '#FFFFFF',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 15,
                  marginVertical: 10,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontWeight: 'bold', color: '#FFFFFF' }}>{option.itemName}</Text>
              </TouchableOpacity>
             ))} 
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default ThreeDotsMenu;