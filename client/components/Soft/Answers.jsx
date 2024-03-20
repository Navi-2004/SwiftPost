import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import axios from '../../axiosConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/color'

const Answers = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [userEntries, setUserEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await axios.get(`/soft/entries?userId=${userId}`);
        setUserEntries(response.data);
        console.log('response:', response.data);
      } else {
        console.error('User ID not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };
  

  const handleAddEntry = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      console.log('userId:', userId);
      if (userId && userQuestion.trim() !== '' && userAnswer.trim() !== '') {
        const response = await axios.post('/soft/entries', {
          userId,
          question: userQuestion,
          userResponse: userAnswer,
        });

        if (response.status === 201) {
          await fetchEntries();
          setUserQuestion('');
          setUserAnswer('');
        } else {
          console.error('Failed to add entry:', response.statusText);
        }
      } else {
        console.error('User ID, question, and answer are required');
      }
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userEntryContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter the question"
          value={userQuestion}
          onChangeText={setUserQuestion}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your answer"
          value={userAnswer}
          onChangeText={setUserAnswer}
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddEntry}>
          <Text style={styles.buttonText}>Add Entry</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.entryList}>
        {userEntries.map((entry, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{entry.question}</Text>
            <Text style={styles.answerText}>{entry.userResponse}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userEntryContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  entryList: {
    marginBottom: 20,
    
  },
  questionContainer: {
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
  },
  answerText: {
    fontSize: 16,
    color: '#666',
  },
});

export default Answers;
