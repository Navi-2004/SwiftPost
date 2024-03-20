import { ScrollView, StyleSheet, Text, View,SafeAreaView,Appearance, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../constants/color'; 
import Timer from '../components/Timer';
import Header from '../components/Header';
import HorizontalScrollComponent from '../components/HorizontalScrollComponent';
import axios from "../axiosConfig"

const HomeScreen = () => {
  const colorScheme = Appearance.getColorScheme();
  const handleEmail =async () => { 
    console.log('test email')
    const res=await axios.get('/send-test-email')
    .then((res) => {
      console.log(res.data);
    }
    )
    .catch((err) => {
      console.log(err);
    });
  }

  

  return (
    <ScrollView>
      <SafeAreaView>
            <Header />

    <View style={styles.container}>
      {/* <View style={styles.appNameContainer}>
        <Text style={[styles.appName, { color: COLORS.white }]}>Sterry</Text>
      </View> */}
      <Timer />
      <HorizontalScrollComponent />
    
 
    </View>
    </SafeAreaView>
    {/* <TouchableOpacity onPress={handleEmail}>
      <Text>
        test email
      </Text>   
    </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // Align items to the left
    paddingTop: 50, // Add padding to create space at the top
    paddingLeft: 20, // Add padding to align items to the left
  },
  appNameContainer: {
    marginBottom: 20, // Add margin to create space between app name and stopwatch
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
 
});

export default HomeScreen;
