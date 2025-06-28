import { View, Text,StyleSheet,SafeAreaView} from 'react-native'
import React, { useState } from 'react'
import {hp,wp} from '../../../utils/Common'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewTransaction = () => {
  const [type,SetType] = useState('Expense')
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Headtext}>Add Transaction</Text>
  <Text style={styles.label}>Type</Text>
      <Picker
        selectedValue={type}
        onValueChange={(value) => SetType(value)}
        style={styles.picker}
      >
        <Picker.Item label="Expense" value="Expense" />
        <Picker.Item label="Income" value="Income" />
      </Picker>       
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#192019",

    alignItems: "center",
  },
  Headtext:{
      fontSize:24,
      color:'#87C184',
      fontWeight:'bold',
      marginTop:hp(5),
      textAlign:'center',
      letterSpacing:wp(0.5),
    },
    picker: {
    backgroundColor: '#333',
    color: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
})

export default NewTransaction