// CustomContainer.js

import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set background color to black
  },
});

export default CustomContainer;
