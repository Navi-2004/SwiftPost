import React, { useState, useEffect,useMemo } from 'react';
import { StyleSheet, Text, View, FlatList ,ScrollView, TouchableOpacity,TextInput} from 'react-native';
import axios from '../../axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/color';
import { useNavigation } from '@react-navigation/native';


const DisplayNotes = () => {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const [categoryQuery, setCategoryQuery] = useState('');
  const [titleQuery, setTitleQuery] = useState('');

  

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.error('User ID not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving user ID from AsyncStorage:', error);
      }
    };
  
    fetchUserId();
  }, []);
  
  useEffect(() => {
    if (userId) {
      const fetchNotes = async () => {
        try {
          console.log('Fetching notes for user ID:', userId);
          const response = await axios.get(`/notes/getAll?userId=${userId}`);
          console.log('Fetched notes:', response.data);
          setNotes(response.data);
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      };
  
      fetchNotes();
    }
  }, [userId]);
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString(); // Customize as per your requirements
  };
  const filterNotes = () => {
    const filteredNotes = notes.filter(note =>
      note.category.toLowerCase().includes(categoryQuery.toLowerCase()) &&
      note.title.toLowerCase().includes(titleQuery.toLowerCase())
    );
    return filteredNotes;
  };

  const handleDelete = async (noteId) => {
    console.log('Delete note with ID:', noteId);
    try {
      await axios.delete(`/notes/delete/${noteId}`);
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = async (noteId) => {
    console.log('Edit note with ID:', noteId);
    navigation.navigate('EditNotes', { noteId });
  }
    

  const renderItem = ({ item }) => (
    <View style={styles.noteContainer}>
      <Text style={styles.title}><Text style={styles.highlightedText}>Title : </Text>{item.title}</Text>
      <Text style={styles.description}><Text style={styles.highlightedText}>Description : </Text>{item.description}</Text>
      <Text style={styles.category}><Text style={styles.highlightedText}>Category : </Text> {item.category}</Text>
      <Text style={styles.creationTime}><Text style={styles.highlightedText}>Created At : </Text> {formatDate(item.creationTime)}</Text>
      <Text style={styles.reminderFrequency}><Text style={styles.highlightedText}>Remainder : </Text>{item.reminderFrequency}</Text>
      <View style={styles.box}>
        <TouchableOpacity style={styles.editButton}  onPress={()=>handleEdit(item._id)}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={()=>handleDelete(item._id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <Text style={styles.head}>Your Notes</Text>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('NotesCreate')}>
        <Text>
        Add Notes
        </Text> 
        </TouchableOpacity>
        <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by Category"
          value={categoryQuery}
          onChangeText={text => setCategoryQuery(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Search by Title"
          value={titleQuery}
          onChangeText={text => setTitleQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => setNotes(filterNotes())}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
        <FlatList
          data={filterNotes()}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  noteContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:COLORS.primary,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  category: {
    fontSize: 14,
    color: COLORS.black,
  },
  creationTime: {
    fontSize: 14,
    color: COLORS.black,
  },
  reminderFrequency: {
    fontSize: 14,
    color: COLORS.black,
  },
  head:{
    textAlign:'center',
    fontSize:25,
    fontWeight:'bold',
    color:COLORS.primary,
    marginBottom:10,
    marginTop:20  
  },
  button: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    padding: 10,
    width: 100,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom:20,
    marginLeft:15
  },
  highlightedText: {
    fontWeight: 'bold',
    color: COLORS.teal,
  },

  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    marginHorizontal:2,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    color:'#fff',
    
  },
  editButton: {
    backgroundColor: COLORS.primary,
    width:60,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    width:70,
    borderRadius: 5,
  },
  box:{
    flex:1,
    flexDirection:'row',
    marginTop:10,
  }
});

export default DisplayNotes;
