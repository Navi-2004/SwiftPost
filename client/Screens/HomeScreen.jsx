import { ScrollView, StyleSheet, Text, View,SafeAreaView,Appearance, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import COLORS from '../constants/color'; 
import Timer from '../components/Timer';
import Header from '../components/Header';
import HorizontalScrollComponent from '../components/HorizontalScrollComponent';
import axios from "../axiosConfig"
import Welcome from './Welcome';
import {  Pressable, Image } from 'react-native'
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation=useNavigation();
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
      {/* <Timer /> */}
      <View style={{
                    paddingHorizontal: 22,
                    // position: "absolute",
                    top: 10,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.primary
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.primary
                    }}>Started</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                            marginVertical: 4
                        }}>We Are India's largest fully intergrated logistics serivice provider</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black,
                        }}> Enjoy Safe and fast Post Office Experience</Text>
                    </View>

                    <Button
                        title="Join Now"
                        onPress={() => navigation.navigate("navigation")}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        

                    </View>
                </View>
      <HorizontalScrollComponent />
    
 
    </View>
    </SafeAreaView>

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
