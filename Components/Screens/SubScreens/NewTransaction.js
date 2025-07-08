import { View, Text,StyleSheet,TouchableOpacity,SafeAreaView,TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {hp,wp} from "../../../utils/Common"


const NewTransaction = () => {
  const [type,setType] = useState('Expense')
  const[amount,setAmount] = useState('')
  const[category,setCategory] = useState('')
  const [date,setDate] = useState(new Date())
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const[description,setDescription] = useState('')

  return (
   <ScrollView style={styles.container}>
  <Text style={styles.header}>Add Transaction</Text>
{/* ADD styles to picker */}
  <Text style={styles.label}>Type</Text>
  <Picker selectedValue={type} onValueChange={(value) => setType(value)}>
    <Picker.Item label="Expense" value="Expense" />
    <Picker.Item label="Income" value="Income" />
  </Picker>

  <Text style={styles.label}>Amount</Text>
  <TextInput
    style={styles.input}
    placeholder="Enter amount"
    keyboardType="numeric"
    value={amount}
    onChangeText={setAmount}
  />

   <Text style={styles.label}>Category</Text>
<TextInput
  style={styles.input}
  placeholder="Enter category"
  value={category}
  onChangeText={setCategory}
/>
  
{/* ADDD SECTION FOR THE SELECTING WALLETS */}
  {/* <Text style={styles.label}>Wallet</Text>   
  <TouchableOpacity style={styles.selector} onPress={openWalletPicker}>
    <Text>{selectedWallet?.name || 'Select Wallet'}</Text>
  </TouchableOpacity> */}
   <Text style={styles.label}>Date</Text>
<TouchableOpacity style={styles.selector} onPress={() => setDatePickerVisibility(true)}>
  <Text>{date.toDateString()}</Text>
</TouchableOpacity>

<DateTimePickerModal
  isVisible={isDatePickerVisible}
  mode="date"
  onConfirm={(selectedDate) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  }}
  onCancel={() => setDatePickerVisibility(false)}
  date={date}
/>
<Text style={styles.label}>Description</Text>
<TextInput
  style={styles.descinput}
  placeholder="Enter Description(optional)"
  value={description}
  onChangeText={setDescription}
/>
<TouchableOpacity style={styles.addButton} >
    <Text style={styles.addButtonText}>Add</Text>
  </TouchableOpacity>
</ScrollView>

 )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#192019',
   

  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#87C184',
     alignItems:'center'
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    color:'#415B46',
    fontSize:18
  },
  input: {
    borderWidth: 1,
    borderColor: '#87C184',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    color:'#fff'
  },
  selector: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#87C184',
    borderRadius: 8,
    marginTop: 5,
    color:'#fff'
  },
  descinput:{
    height:hp(12),
     borderWidth: 1,
    borderColor: '#87C184',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    color:'#fff'

  },
  addButton: {
    marginTop: 30,
    backgroundColor: '#415B48',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default NewTransaction