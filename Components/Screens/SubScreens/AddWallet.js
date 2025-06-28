import { View, Text, StyleSheet, TextInput,TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { hp, wp } from "../../../utils/Common";
import { Feather } from '@expo/vector-icons';

const AddWallet = () => {
const [walletname, SetWalletName] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.Headtext}>New Wallet</Text>
      <View style={styles.AddWalletForm}>
        <Text style={styles.label}>Wallet name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Walletname"
          value={walletname}
          onChangeText={SetWalletName}
        />
        <Text style={styles.label}>Set Icon</Text>
        <TouchableOpacity style={styles.uploadBox}>
        <Feather name="upload" size={20} color="#ccc" />
        <Text style={styles.uploadText}>Upload Image</Text>
      </TouchableOpacity>
        
        <TouchableOpacity style = {styles.button} >
                        <Text style={styles.buttontext}>Add Wallet</Text>
                      </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#192019",

    // alignItems: "center",
  },
  Headtext: {
    fontSize: 24,
    color: "#87C184",
    fontWeight: "bold",
    marginTop: hp(5),
    textAlign: "center",
    letterSpacing: wp(0.5),
  },
  label: {
    fontSize: wp(6),
    marginBottom: hp(1),
    // fontWeight: "bold",
    color: "#fff",
    marginTop:hp(2)
  },

  input: {
    height: hp(7),
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: hp(1),
    padding: wp(2.5),
    borderRadius: wp(1.5),
    color: "#fff",
    
  },
  AddWalletForm:{
    marginTop:hp(5),
    height:hp(50),
  },

   uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#555',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#222',
  },
  uploadText: {
    color: '#ccc',
    marginLeft: 8,
    fontSize: 16,
  },

  button:{
    height:hp(5),
    backgroundColor:'#415B48',
    borderRadius:10,
    marginTop:hp(40),
    
  },

  buttontext:{
 color:'#fff',
  textAlign:'center',
  paddingTop:hp(0.6),
  fontWeight:'bold',
  fontSize:18,
  },
});

export default AddWallet;
