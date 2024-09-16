import React from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import hero1 from '../assets/profile.png';
import COLORS from '../constants/color';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <Animated.View style={[styles.header, { transform: [{ translateX }] }]}>
      <TouchableOpacity onPress={()=>{navigation.navigate("home")}} >
        {/* Logo */}
        <View style={flexDirection="row"}>

        {/* <Image
          source={hero1}
          style={styles.logo}
        /> */}
        {/* Title */}
        <Text style={styles.title}>SwiftPost</Text>
        </View>

        </TouchableOpacity>

      {/* Profile Photo (Placeholder) */}
      <TouchableOpacity onPress={()=>{navigation.navigate("Profile")}}>
        <Image
          source={hero1}
          style={styles.profilePhoto}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    borderRadius: 10,
    marginTop: 30,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginLeft: 50,
    // marginTop:-35,
    color: COLORS.black,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
});

export default Header;
