import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity ,Text} from 'react-native';
import Card from './Card';
import soft from "../assets/soft.jpg";
import coding from "../assets/coding.jpg";
import aptitude from "../assets/aptitude.jpg";
import notes from "../assets/notes.png";
import { useNavigation } from '@react-navigation/native';

const HorizontalScrollComponent = () => {
  // Get the navigation object from the us
  const navigation = useNavigation();
  const handleCardPress = (screenName) => {
    // Navigate to the specified screen upon card press
    console.log('Navigating to', screenName);
  
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.contain}>
            <Text style={styles.heading}>Explore Categories</Text>
            <Text style={styles.subheading}>Tap and enjoy your Placement preparation</Text>


    <ScrollView horizontal style={styles.scrollView}>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => handleCardPress('Notes')}>
          <Card
            title="Notes"
            image={notes}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCardPress('conform')}>
          <Card
            title="Aptitude Notes"
            image={aptitude}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCardPress('coding')}>
          <Card
            title="Coding Platforms"
            image={coding}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCardPress('SoftSkills')}>
          <Card
            title="Soft Skills"
            image={soft}
          />
        </TouchableOpacity>
        {/* Add more TouchableOpacity components with appropriate onPress handlers for more cards */}
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  contain:{
    marginTop: 30,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    marginBottom: 20,
  },
});

export default HorizontalScrollComponent;
