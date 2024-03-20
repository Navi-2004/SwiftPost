import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from '../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import Header from '../components/Header';
import COLORS from '../constants/color';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await axios.get(`/user/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } else {
        console.log('User ID not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  return (
    <View>
    <Header />

    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : userData ? (
        <>
          <Text style={styles.heading}>User Profile</Text>
          <View style={styles.userInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.text}>{userData.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.text}>{userData.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone Number:</Text>
              <Text style={styles.text}>{userData.phoneNumber}</Text>
            </View>
            {/* Add more user details here */}
          </View>
        </>
      ) : (
        <Text style={styles.errorText}>Failed to fetch user data</Text>
        // <Loading />
      )}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    // backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    padding: 20,
  },
  infoRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});

export default Profile;
