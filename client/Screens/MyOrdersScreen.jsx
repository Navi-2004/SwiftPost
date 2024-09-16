import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ParcelItem = ({ id, name, status }) => (
  <View style={styles.parcelContainer}>
    <View style={styles.parcelInfo}>
      <Text style={styles.parcelId}>Parcel ID: #{id}</Text>
      <Text style={styles.parcelName}>Name: {name}</Text>
      <Text style={styles.parcelStatus}>Status: {status}</Text>
    </View>
  </View>
);

const MyOrdersScreen = () => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>My Orders</Text>

        <Text style={styles.subHeader}>Your Parcel Status:</Text>
        <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
          <ParcelItem id="43420A" name="Furnitures" status="Yet to be Confirmed" />
          <ParcelItem id="43420B" name="Clothes" status="Yet to be Confirmed" />
          <ParcelItem id="43420C" name="Electronics" status="Confirmed" />
          <ParcelItem id="43420D" name="Furnitures" status="Yet to be Confirmed" />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    // flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // flex: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333', // Darker text for better readability
  },
  newParcelButton: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff', // Blue background
    borderRadius: 8,
    marginBottom: 16,
  },
  newParcelText: {
    color: '#ff0000', // White text
    fontSize: 16,
    fontWeight: '600',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#666', // Slightly lighter text color
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  parcelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ddd', // Light border color
    borderRadius: 8,
    backgroundColor: '#fff', // White background for parcel items
    shadowColor: '#000', // Shadow for better elevation effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop:20,
  },
  parcelInfo: {
    
  },
  parcelId: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333', // Darker text color
  },
  parcelName: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555', // Medium text color
  },
  parcelStatus: {
    fontSize: 14,
    color: '#888', // Light grey text color
  },
});

export default MyOrdersScreen;
