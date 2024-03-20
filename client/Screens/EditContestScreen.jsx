import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from '../axiosConfig';
import COLORS from '../constants/color';

import Header from '../components/Header';
const EditContestScreen = ({ route }) => {
  const [contestDetails, setContestDetails] = useState({});
  const [editedDetails, setEditedDetails] = useState({
    platformName: '',
    username: '',
    contestTiming: '',
    contestDay: '',
  });

  useEffect(() => {
    // Fetch contest details based on contestId
    fetchContestDetails();
  }, []);

  const fetchContestDetails = async () => {
    try {
      const response = await axios.get(`/coding/${route.params.contestId}`);
      setContestDetails(response.data);
    } catch (error) {
      console.error('Error fetching contest details:', error);
    }
  };

  const handleSubmit = async () => {
    try {
        console.log(route.params.contestId);
      const response = await axios.put(`/coding/edit/${route.params.contestId}`, editedDetails);
      if (response.status === 200) {
        Alert.alert('Contest details updated successfully');
      }
    } catch (error) {
      console.error('Error updating contest details:', error);
      Alert.alert('Error updating contest details');
    }
  };

  return (
    <View style={styles.containe}>
      <Header />
    <View style={styles.container}>
      {/* Display current contest details in TextInput fields */}
      <Text style={styles.heading}>Edit Platform Details</Text>
      <TextInput
        style={styles.input}
        placeholder={contestDetails.platformName}
        value={editedDetails.platformName}
        onChangeText={(text) => setEditedDetails({ ...editedDetails, platformName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder={contestDetails.username}
        value={editedDetails.username}
        onChangeText={(text) => setEditedDetails({ ...editedDetails, username: text })}
      />
      <TextInput
        style={styles.input}
        // placeholder="Contest Timing"
        placeholder={contestDetails.contestTiming}
        value={editedDetails.contestTiming}
        onChangeText={(text) => setEditedDetails({ ...editedDetails, contestTiming: text })}
      />
      <TextInput
        style={styles.input}
        placeholder={contestDetails.contestDay}
        value={editedDetails.contestDay}
        onChangeText={(text) => setEditedDetails({ ...editedDetails, contestDay: text })}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop:100,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: 10,
    width: 100,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // Adjust the margin as needed
    // Add any other styles you want to apply
  },
});

export default EditContestScreen;
