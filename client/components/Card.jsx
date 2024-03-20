import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ title, image }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 150,
    height: 200,
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Card;
