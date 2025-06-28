import { View, Text ,Button,StyleSheet, KeyboardAvoidingView,TextInput,TouchableOpacity} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {wp,hp} from '../../utils/Common'
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const RegisterScreen = () => {
    const navigation = useNavigation();
    const [username,setUsername]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

 


const handleSignup = async (email, password, username) => {
  try {
    console.log("Attempting to create user...");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User created, attempting to update profile...");

    await updateProfile(user, {
      displayName: username,
    });

    console.log("✅ User signed up:", user);
  } catch (error) {
    console.error("❌ Error signing up:");
    if (error.code) { 
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        if (error.code === 'auth/network-request-failed') {
            console.warn("It looks like there's a network issue. Please check your internet connection and try again.");
        }
       
    } else { 
        console.error("Non-Firebase error:", error);
    }
  }
};





  return (
    <KeyboardAvoidingView style={styles.container}>
    <View>
      <Text style={styles.Headtext1}>Let's Get Started</Text>
      <Text style={styles.Headtext}>create an Account to track your expenses</Text>
      <View>
        <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Username"
                value={username}
                onChangeText={setUsername}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
              />
             
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password please"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
             
              <TouchableOpacity style = {styles.button} onPress={()=>handleSignup(email,password,username)}>
                <Text style={styles.buttontext}>Register</Text>
              </TouchableOpacity>
              
            </View>
            <Text style={{ textAlign: 'center', marginTop: hp(5) ,color:'#87C184'}}>
                  Already have an account?{" "}
                  <Text
                    style={{ color: '#2AFBB7', textDecorationLine: 'underline' }}
                    onPress={() => navigation.navigate('Login')}
                  >
                    Login
                  </Text>
                   </Text>
               
   
    </View>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#192019',
  },
  Headtext1:{
    fontSize:30,
    color:'#fff',
    fontWeight:'bold',
    marginBottom:hp(1),
    marginTop:hp(5)
   
  },
  Headtext:{
    fontSize:16,
    color:'#87C184',
    fontWeight:'bold',
    marginBottom:hp(5),
  //  textAlign:'center'
  },
  
   label: {
      fontSize: wp(4),
      marginBottom: hp(0.5),
      fontWeight: "bold",
      color:'#415B46'
    },
  
    input: {
      height: hp(5),
      borderColor: "#ddd",
      borderWidth: 1,
      marginBottom: hp(1.5),
      padding: wp(2.5),
      borderRadius: wp(1.5),
      color:'#fff'
    },
     button:{
    height:hp(5),
    // width:wp(),
    backgroundColor:'#415B48',
    borderRadius:10,
    marginTop:hp(0.5),
    
  },

  buttontext:{
 color:'#fff',
  textAlign:'center',
  paddingTop:hp(0.6),
  fontWeight:'bold',
  fontSize:18,
  },
})

export default RegisterScreen