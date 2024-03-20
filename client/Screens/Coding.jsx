import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Codechef from "../components/CodingPlatforms/Codechef";
import Leetcode from "../components/CodingPlatforms/Leetcode";
import Codeforces from "../components/CodingPlatforms/Codeforces";
import Header from "../components/Header";
import COLORS from "../constants/color";
import { useNavigation } from "@react-navigation/native";
const Coding = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Header />
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>Coding Platforms</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate("conform")}}>
        <Text style={styles.button}>Add and View</Text>
      </TouchableOpacity>
      <Codechef />
      <Leetcode />
      <Codeforces />
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: 10,
    // marginLeft:-110,
    marginTop:10,
    marginRight:240,
    // alignItems:"flex-end",
    borderRadius: 5,
    // textAlign: "center",
    fontWeight: "bold",
  },
  
});

export default Coding;