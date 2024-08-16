// src/components/ThreeDotsMenu.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed

const ThreeDotsMenu = () => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={toggleMenu} style={{ padding: 10 }}>
        <Ionicons name="ellipsis-vertical" size={24} color="#000" />
      </TouchableOpacity>
      {visible && (
        <View style={{
          position: 'absolute',
          top: 40, // Adjust based on your layout
          right: 0,
          backgroundColor: 'white',
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          padding: 10,
          elevation: 5
        }}>
          <TouchableOpacity onPress={() => console.log('Option 1 Pressed')}>
            <Text style={{ padding: 10 }}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Option 2 Pressed')}>
            <Text style={{ padding: 10 }}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Option 3 Pressed')}>
            <Text style={{ padding: 10 }}>Option 3</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ThreeDotsMenu;
