// src/components/ThreeDotsMenu.js

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');


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
          backgroundColor: '#b68fbf',
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          padding: 10,
          elevation: 5,
          height: '1250%',
          width: '75%',
        }}>
          {/* Heading */}
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: 15,
            textAlign: 'center'
          }}>
            Profile Settings
          </Text>

          {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => console.log(`${option} Pressed`)}
              style={{
                backgroundColor: '#fff',
                borderColor: '#8A2BE2',
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                marginVertical: 5,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontWeight: 'bold', color: '#333' }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default ThreeDotsMenu;
