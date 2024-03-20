import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, StyleSheet,Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/color';
import Button from '../../components/Button';
import axios from '../../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditNotes = ({ route }) => {
    const { noteId } = route.params; 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [reminderFrequency, setReminderFrequency] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    // Fetch note data by noteId and set the state accordingly
    const fetchNoteData = async () => {
      try {
        const response = await axios.get(`/notes/get/${noteId}`);
        const noteData = response.data;
        setTitle(noteData.title);
        setDescription(noteData.description);
        setCategory(noteData.category);
        setReminderFrequency(noteData.reminderFrequency);
      } catch (error) {
        console.error('Error fetching note data:', error.message);
        // Handle error accordingly, e.g., show error message
      }
    };

    fetchNoteData();
  }, [noteId]);

  const handleUpdate = async () => {
    if (!title || !description || !category || !reminderFrequency) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    const updatedNoteData = { title, description, category, reminderFrequency };

    try {
      await axios.put(`/notes/update/${noteId}`, updatedNoteData);
      Alert.alert('Success', 'Note updated successfully');
      // Optionally, you can navigate to another screen or perform any other action upon successful update
    } catch (error) {
      console.error('Error updating note:', error.message);
      Alert.alert('Error', 'Failed to update note. Please try again later.');
    }
  };

  return (
    <SafeAreaView>
    <View style={styles.container}>
        <Text style={styles.text}>Add Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={[styles.input, { height: 120 }]} // Increase height for description
        placeholder="Description"
        multiline
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={text => setCategory(text)}
      />
      <Text style={{color:COLORS.grey,fontSize:15,marginLeft:-212,marginTop:10,color:COLORS.teal}}>Reminder Frequency</Text>
      <Picker
        selectedValue={reminderFrequency}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setReminderFrequency(itemValue)}
      >
        <Picker.Item label="Remind me every day" value="daily" />
        <Picker.Item label="Remind me every 2 days" value="everyTwoDays" />
        <Picker.Item label="Remind me every 5 days" value="everyFiveDays" />
        <Picker.Item label="Remind me every 15 days" value="everyFifteenDays" />
        <Picker.Item label="Never Remind" value="never" />

      </Picker>
      <Button
      style={{fontWeight:'bold',paddingHorizontal:8,paddingVertical:6,height:50}}
        title="Submit Note"
        onPress={handleUpdate}
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

export default EditNotes;
