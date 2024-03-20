import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, Image } from 'react-native';
import Questions from '../components/Soft/Questions';
import Answers from '../components/Soft/Answers';
import COLORS from '../constants/color';

// Define your screens
const Screen1 = () => (
  <View style={styles.container}>
    {/* <Text>Screen 1</Text> */}
    <Questions />
  </View>
);

const Screen2 = () => (
  <View style={styles.container}>
    {/* <Text>Screen 2</Text> */}
    <Answers />
  </View>
);

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

const SoftSkills = () => {
  return(
  <NavigationContainer independent={true}>
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconSource;

        if (route.name === 'Questions') {
          iconSource = focused
            ? require('../assets/soft.jpg')
            : require('../assets/coding.jpg');
        } else if (route.name === 'Your Space') {
          iconSource = focused
            ? require('../assets/soft.jpg')
            : require('../assets/coding.jpg');
        }

        return <Image source={iconSource} style={{ width: 24, height: 24,marginBottom:10 }} />;
      },
      tabBarStyle: {
        backgroundColor: 'white', // Background color of the tabBar
        borderTopWidth: 4, // Optional: Add a borderTop
        borderTopColor: '#ccc', // Optional: Border color
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold' ,
        height:60,
        color:COLORS.primary// Adjust paddingBottom to raise or lower the tabBar
      },
      tabBarItemStyle: {
        paddingVertical: 8,
         // Adjust padding for each tab
      },
    })}
  >
    <Tab.Screen name="Questions" component={Questions} />
    <Tab.Screen name="Your Space" component={Answers} />
  </Tab.Navigator>
</NavigationContainer>
  );
};

export default SoftSkills;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
    height:50, // Background color of the tabBar
    borderTopWidth: 4, // Optional: Add a borderTop
    borderTopColor: '#ccc', // Optional: Border color
    paddingBottom: 5,
    fontSize:18,
    fontWeight:'bold', 
  // Adjust paddingBottom to raise or lower the tabBar
  },
});
