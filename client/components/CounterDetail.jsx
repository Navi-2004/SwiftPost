// Import colors from your colors.js file
import COLORS from "../constants/color";

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from "./Header";

const CounterDetail = () => {
  return (
    <View>
        <Header />
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.counterHeader}>
        <Text style={styles.headerText}>COUNTER 3</Text>
      </View>

      <View style={styles.serviceDetails}>
        <Text style={styles.detailText}>SERVICE: BANKING</Text>
        <Text style={styles.detailText}>STAFF: MADHAN</Text>
        <Text style={styles.detailText}>STATUS: ACTIVE</Text>
        <Text style={styles.detailText}>PEOPLE IN LINE: 11</Text>
        <Text style={styles.detailText}>EST. TIME: 15 MINS</Text>
      </View>

      <View style={styles.guidelinesSection}>
        <Text style={styles.sectionHeader}>GUIDELINES</Text>
      </View>

      <View style={styles.requiredDocsSection}>
        <Text style={styles.sectionHeader}>REQUIRED DOCS:</Text>
        <Text style={styles.docText}>- Aadhar Card</Text>
        <Text style={styles.docText}>- PAN Card</Text>
        <Text style={styles.docText}>- Driving License</Text>
        <Text style={styles.docText}>- Birth Certificate</Text>
        <Text style={styles.docText}>- Education Certificate</Text>
        <Text style={styles.docText}>- Community Certificate</Text>

      </View>
      <Text style={styles.sectionHeader}>INSTRUCTIONS</Text>
  <Text style={styles.docText}>- Please maintain social distancing.</Text>
  <Text style={styles.docText}>- Wear a face mask at all times.</Text>
  <Text style={styles.docText}>- Carry a copy of the appointment slip.</Text>
  <Text style={styles.docText}>- Follow the instructions provided by the staff.</Text>
  <Text style={styles.docText}>- Have all required documents ready for verification.</Text>
  <Text style={styles.docText}>- Mobile phones should be kept on silent mode.</Text>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background, // Use a background color from colors.js
  },
  counterHeader: {
    backgroundColor: COLORS.primary,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textLight, // Use a text color from colors.js
  },
  serviceDetails: {
    backgroundColor: COLORS.grey,
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  detailText: {
    fontSize: 16,
    color: COLORS.textDark, // Use a text color from colors.js
    marginBottom: 5,
  },
  guidelinesSection: {
    // backgroundColor: COLORS.black,
    color:COLORS.black,
    // padding:5,
    marginBottom: 20,

    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black, // Use a text color from colors.js
    marginBottom: 10,
  },
  requiredDocsSection: {
    padding: 15,
    borderRadius: 10,

  },
  docText: {
    fontSize: 16,
    color: COLORS.textDark, // Use a text color from colors.js
    marginBottom: 5,
  },
});

export default CounterDetail;
