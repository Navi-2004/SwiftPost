

import React from 'react';
import { View, Text, ScrollView, StyleSheet ,TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import COLORS from '../constants/color'; // Assuming COLORS is in constants folder
import { MaterialIcons } from '@expo/vector-icons'; // Example for icons; you can use any other icon set
import { useNavigation } from '@react-navigation/native';

const LayoutDesign = () => {
    const navigation = useNavigation();

    const counters = [
        { name: "COUNTER 1: PARCEL", estTime: 5, color: COLORS.green },
        { name: "COUNTER 2: BANKING", estTime: 15, color: COLORS.orange },
        { name: "COUNTER 3: PAYMENT", estTime: 25, color: COLORS.primary },
        { name: "COUNTER 4: PASSPORT", estTime: 10, color: COLORS.green }
      ];
  return (
    <View style={styles.wrapper}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.mapContainer}>
        <View style={styles.map}>
          <View style={styles.counterPoint}>
            <MaterialIcons name="storefront" size={32} color={COLORS.primary} />
            <Text style={styles.counterText}>PARCEL</Text>
            <Text style={styles.queueText}>6 in queue</Text>
          </View>
          <View style={styles.counterPoint}>
            <MaterialIcons name="payment" size={32} color={COLORS.primary} />
            <Text style={styles.counterText}>PAYMENT</Text>
            <Text style={styles.queueText}>34 in queue</Text>
          </View>
          <View style={styles.counterPoint}>
            <MaterialIcons name="account-balance" size={32} color={COLORS.primary} />
            <Text style={styles.counterText}>BANKING</Text>
            <Text style={styles.queueText}>15 in queue</Text>
          </View>
        </View>
        <MaterialIcons name="person" size={32} color={COLORS.primary} style={styles.person} />
        <Text style={styles.personText}>You</Text>

        
        <View style={styles.rightLabels}>
          <View style={styles.counterPoint}>
            <MaterialIcons name="local-library" size={24} color={COLORS.black} style={styles.icon} />
            <Text style={styles.labelText}>PASSPORT</Text>
            <Text style={styles.queueText}>5 in queue</Text>

          </View>
          <View style={styles.counterPoint}>
            <MaterialIcons name="security" size={24} color={COLORS.black} style={styles.icon} />
            <Text style={styles.labelText}>INSURANCE</Text>
            <Text style={styles.queueText}> in queue</Text>

          </View>
          <View style={styles.counterPoint}>
            <MaterialIcons name="person" size={24} color={COLORS.black} style={styles.icon} />
            <Text style={styles.labelText}>PHILATELY</Text>
            <Text style={styles.queueText}>24 in queue</Text>

          </View>
        </View>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate("details")}}>
        <View style={styles.counters}>
      {counters.map((counter, index) => (
        <View key={index} style={[styles.counter, { backgroundColor:counter.color}]}>
          <View style={styles.counterContent}>
            <MaterialIcons name="person" size={24} color={COLORS.black} style={styles.icon} />
            <Text style={styles.counterText}>{counter.name}</Text>
          </View>
          <Text style={[styles.counterTime]}>
            EST TIME: {counter.estTime} MINS
          </Text>
        </View>
      ))}
    </View>
    </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.white,

  },
  mapContainer:{
    borderWidth: 1,
    borderColor: COLORS.grey,
    height:500,
  },
  container: {
    padding: 20,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 30,
  },
  counterBox: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: 1,
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  counterText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  rightLabels: {
    position: 'absolute',
    right: 10,
    top: 170,
  },
  verticalLabel: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: 10,
    marginVertical: 40,
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    transform: [{ rotate: '90deg' }],
  },
  labelText: {
    color: COLORS.black,
    fontWeight: 'bold',

  },
  counters: {
    marginTop: 20,
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.primary,
  },
  counterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  counterTime: {
    color: COLORS.white,
  },
  map: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 40,

    padding: 10,
    backgroundColor: COLORS.white,
  },
  counterPoint: {
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: COLORS.grey,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.secondary,
    width: 100,
  },
  counterText: {
    color: COLORS.black,
    fontWeight: 'bold',
    marginTop: 5,
  },
  queueText: {
    color: COLORS.grey,
    marginTop: 5,
  },
  person:{
    marginLeft:40,
  },
  personText:{
    color:COLORS.black,
    fontWeight:'bold',
    marginLeft:43,
  }
});

export default LayoutDesign;
