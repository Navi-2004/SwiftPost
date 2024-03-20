import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import NotesCreate from '../components/Notes/NotesCreate'
import { SafeAreaView } from 'react-native-safe-area-context'
import DisplayNotes from '../components/Notes/DisplayNotes'
 // Example: send reminder tomorrow at 8:00 AM


const Notes = () => {

  

  return (
    <SafeAreaView>
    <View>
      {/* <Text>Notes</Text> */}
      {/* <NotesCreate /> */}
      <DisplayNotes />
    </View>
    </SafeAreaView>
  )
}

export default Notes

const styles = StyleSheet.create({})