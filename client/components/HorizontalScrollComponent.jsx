import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import Card from './Card';
import soft from "../assets/soft.jpg";
import coding from "../assets/coding.jpg";
import aptitude from "../assets/aptitude.jpg";
import banking from "../assets/banking.jpeg";
import payment from "../assets/payment.jpeg";
import parcel from "../assets/parcel.jpg";
import { useNavigation } from '@react-navigation/native';

const HorizontalScrollComponent = () => {
  const navigation = useNavigation();

  const handleCardPress = (screenName) => {
    console.log('Navigating to', screenName);
    navigation.navigate(screenName);
  };

  // Data for the FlatList
  const data = [
    { id: '1', title: 'Parcel', image: parcel, screenName: 'Notes' },
    { id: '2', title: 'Banking', image: banking, screenName: 'conform' },
    { id: '3', title: 'Payment', image: payment, screenName: 'coding' },
    { id: '4', title: 'Insurance', image: coding, screenName: 'SoftSkills' },
    { id: '5', title: 'Navigation', image: aptitude, screenName: 'navigation' },
    { id: '6', title: 'Q&A', image: soft, screenName: 'SoftSkills' },
    // Add more items as needed
  ];

  return (
    <View style={styles.contain}>
      <Text style={styles.heading}>Explore Categories</Text>
      <Text style={styles.subheading}>Tap and enjoy your Services</Text>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item.screenName)} style={styles.cardContainer}>
            <Card
              title={item.title}
              image={item.image}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2} // Set number of columns to 2
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 1,
    // alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  contain: {
    marginTop: 20,
    marginLeft:-10,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    marginBottom: 20,
  },
});

export default HorizontalScrollComponent;
