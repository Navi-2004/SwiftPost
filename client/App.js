import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login, SignUp, Welcome } from "./Screens";
import HomeScreen from './Screens/HomeScreen';
import Coding from './Screens/Coding';
import ContestForm from './components/ContestForm';
import EditContestScreen from './Screens/EditContestScreen';
import CustomContainer from './constants/CustomContainer';
import Notes from './Screens/Notes';
import NotesCreate from './components/Notes/NotesCreate';
import EditNotes from './components/Notes/EditNotes'; 
import SoftSkills from './Screens/SoftSkills';
import Profile from './Screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect,useState } from 'react';
// import registerNNPushToken from 'native-notify';


// Force the application to use light mode




const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Welcome');

  
  useEffect(() => {
    checkUserId();
  }, []);
  
  const checkUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        setInitialRoute('home');
        console.log('User ID exists:', userId);
      } else {
        setInitialRoute('Welcome');
      }
    } catch (error) {
      console.error('Error checking user ID:', error);
    }
  };
  // registerNNPushToken(20265, 'aCNH4ptSzIab5klAqOE30d');

  return (
    <CustomContainer>
    <NavigationContainer >
      <Stack.Navigator
        initialRouteName='Welcome'
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="coding"
          component={Coding}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="conform"
          component={ContestForm}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="EditContest"
          component={EditContestScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Notes"
          component={Notes}
          options={{
            headerShown: false
          }}
        />
         <Stack.Screen
          name="NotesCreate"
          component={NotesCreate}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="EditNotes"
          component={EditNotes}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
        name="SoftSkills"
        component={SoftSkills}
        options={{
          headerShown: false
        }}
        />
         <Stack.Screen 
        name="Profile"
        component={Profile}
        options={{
          headerShown: false
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </CustomContainer>
  );
}