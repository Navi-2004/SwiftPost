import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, StyleSheet,Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/color';
import Button from '../../components/Button';
import axios from '../../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NoteCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [e, setE] = useState('');
  const navigation = useNavigation();

  const [reminderFrequency, setReminderFrequency] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
  const getUserId = async () => {
    try {
        const response = await AsyncStorage.getItem('userId');
        console.log('User ID:', response);
        setUserId(response);
    } catch (error) {
        console.error('Error getting user ID:', error.message);
    }
    };
    getUserId();
    }, []);

  const handleSubmit =  () => {
    // if (!title || !description || !category || !reminderFrequency) {
    //   Alert.alert('Missing Information', 'Please fill in all fields');
    //   return;
    // }
    //       Alert.alert('Missing Information', 'Please fill in all fields');


    // const noteData = { title, description, category, reminderFrequency, userId};

    // try {
    //     console.log('Note data:', noteData);
    //     console.log('User ID:', userId);
    //   const response = await axios.post('/notes/create', noteData);
    //   console.log('Note submitted successfully:', response.data);
    //     Alert.alert('Success', 'Note submitted successfully');
    //   // Optionally, you can navigate to another screen or perform any other action upon successful submission
    // } catch (error) {
    //   console.error('Error submitting note:', error.message);
    //   Alert.alert('Error', 'Failed to submit note. Please try again later.');
    // }
    Alert.alert('Success', 'Your Parcel Request is successfully received');
    navigation.navigate("Profile")
  };

  return (
    <SafeAreaView>
    <View style={styles.container}>
        <Text style={styles.text}>Create A New Parcel</Text>
        <Text style={{color:COLORS.grey,fontSize:15,marginLeft:-212,marginTop:10,color:COLORS.teal}}>Choose A Category</Text>
      <Picker
        selectedValue={reminderFrequency}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setReminderFrequency(itemValue)}
      >
        <Picker.Item label="Electronic" value="daily" />
        <Picker.Item label="Clothes" value="everyTwoDays" />
        <Picker.Item label="Food" value="everyFiveDays" />
        <Picker.Item label="Money" value="everyFifteenDays" />
        <Picker.Item label="Other" value="never" />

      </Picker>
      
      <TextInput
        style={[styles.input]} // Increase height for description
        placeholder="ESTIMATED WEIGHT"
        multiline
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Receiver Name"
        value={a}
        onChangeText={text => setA(text)}
      />
        <TextInput
        style={styles.input}
        placeholder="Receiver Name"
        value={category}
        onChangeText={text => setCategory(text)}
      />
        <TextInput
        style={styles.input}
        placeholder="Receiver Mobile number"
        value={b}
        onChangeText={text => setB(text)}
      />
        <TextInput
        style={styles.input}
        placeholder="Receiver ZipCode"
        value={c}
        onChangeText={text => setC(text)}
      />
         <TextInput
        style={styles.input}
        placeholder="Receiver Location"
        value={d}
        onChangeText={text => setD(text)}
      />
      
      <Button
      style={{fontWeight:'bold',paddingHorizontal:8,paddingVertical:6,height:50}}
        title="Submit "
        onPress={handleSubmit}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
     // Background color of the container
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 2,
    marginVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    color: COLORS.black,
    // padding: 10,
    // width: 100,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  text:{
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20
  },
  picker: {
    height: 50,
    width: '100%',
    padding: 10,
    fontSize: 16,
    color: '#333',

    borderWidth: 2,
    marginVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderTopColor: COLORS.primary,

  },

});

export default NoteCreate;
