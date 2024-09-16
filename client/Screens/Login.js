import {
  View,
  Text,

  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/color";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import axios from "../axiosConfig";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
    console.log("Login Pressed");
    console.log(email);
    console.log(password);
    Alert.alert('Login Successful', 'You have been logged in successfully.');
    navigation.navigate('home');
  
    // try {
    //   const response = await axios.post("/user/login", {
    //     email,
    //     password
    //   });
  
    //   console.log(response.data);
  
    //   if (response.data.user && response.data.user._id) {
    //     const userId = response.data.user._id;
    //     await AsyncStorage.setItem('userId', userId);
    //     const id = await AsyncStorage.getItem('userId');
    //     console.log('User ID stored in AsyncStorage:', id);
    //     Alert.alert('Login Successful', 'You have been logged in successfully.');
    //     navigation.navigate('home');

    //   } else {
    //     console.log('User data or user ID not found in response');
    //     Alert.alert('Error', 'An error occurred. Please try again later.');
    //   }
    // } catch (error) {
    //   console.log('Error:', error);
    //   if (error.response && error.response.status === 401) {
    //     Alert.alert('Invalid Email or Password', 'Please check your email and password and try again.');
    //   } else {
    //     Alert.alert('Error', 'An error occurred. Please try again later.');
    //   }
    // }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Hi Welcome Back ! 👋
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Hello again you have been missed!
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Email address
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              value={email} 
              onChangeText={setEmail} 
              style={{ width: "100%" }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              value={password} 
              onChangeText={setPassword} 
              style={{ width: "100%" }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown == true ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title="Login"
          filled
          onPress={handleLogin}
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
