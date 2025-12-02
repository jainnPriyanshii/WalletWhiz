// import { View, Text ,Button,StyleSheet, KeyboardAvoidingView,TextInput,TouchableOpacity} from 'react-native'
// import React from 'react'
// import { useState } from 'react'
// import { useNavigation } from '@react-navigation/native'
// import {wp,hp} from '../../utils/Common'
// import { auth } from '../../firebaseConfig';
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


// const RegisterScreen = () => {
//     const navigation = useNavigation();
//     const [username,setUsername]=useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

 


// const handleSignup = async (email, password, username) => {
//   try {
//     console.log("Attempting to create user...");
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     console.log("User created, attempting to update profile...");

//     await updateProfile(user, {
//       displayName: username,
//     });

//     console.log("✅ User signed up:", user);
//   } catch (error) {
//     console.error("❌ Error signing up:");
//     if (error.code) { 
//         console.error("Error code:", error.code);
//         console.error("Error message:", error.message);
//         if (error.code === 'auth/network-request-failed') {
//             console.warn("It looks like there's a network issue. Please check your internet connection and try again.");
//         }
       
//     } else { 
//         console.error("Non-Firebase error:", error);
//     }
//   }
// };





//   return (
//     <KeyboardAvoidingView style={styles.container}>
//     <View>
//       <Text style={styles.Headtext1}>Let's Get Started</Text>
//       <Text style={styles.Headtext}>create an Account to track your expenses</Text>
//       <View>
//         <Text style={styles.label}>Username</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter Username"
//                 value={username}
//                 onChangeText={setUsername}
//               />
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter email"
//                 value={email}
//                 onChangeText={setEmail}
//               />
             
//               <Text style={styles.label}>Password</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password please"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//               />
             
//               <TouchableOpacity style = {styles.button} onPress={()=>handleSignup(email,password,username)}>
//                 <Text style={styles.buttontext}>Register</Text>
//               </TouchableOpacity>
              
//             </View>
//             <Text style={{ textAlign: 'center', marginTop: hp(5) ,color:'#87C184'}}>
//                   Already have an account?{" "}
//                   <Text
//                     style={{ color: '#2AFBB7', textDecorationLine: 'underline' }}
//                     onPress={() => navigation.navigate('Login')}
//                   >
//                     Login
//                   </Text>
//                    </Text>
               
   
//     </View>
//     </KeyboardAvoidingView>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: '#192019',
//   },
//   Headtext1:{
//     fontSize:30,
//     color:'#fff',
//     fontWeight:'bold',
//     marginBottom:hp(1),
//     marginTop:hp(5)
   
//   },
//   Headtext:{
//     fontSize:16,
//     color:'#87C184',
//     fontWeight:'bold',
//     marginBottom:hp(5),
//   //  textAlign:'center'
//   },
  
//    label: {
//       fontSize: wp(4),
//       marginBottom: hp(0.5),
//       fontWeight: "bold",
//       color:'#415B46'
//     },
  
//     input: {
//       height: hp(5),
//       borderColor: "#ddd",
//       borderWidth: 1,
//       marginBottom: hp(1.5),
//       padding: wp(2.5),
//       borderRadius: wp(1.5),
//       color:'#fff'
//     },
//      button:{
//     height:hp(5),
//     // width:wp(),
//     backgroundColor:'#415B48',
//     borderRadius:10,
//     marginTop:hp(0.5),
    
//   },

//   buttontext:{
//  color:'#fff',
//   textAlign:'center',
//   paddingTop:hp(0.6),
//   fontWeight:'bold',
//   fontSize:18,
//   },
// })

// export default RegisterScreen
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { wp, hp } from "../../utils/Common";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (email, password, username) => {
    try {
      console.log("Creating user...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      console.log("User Created:", user);
    } catch (error) {
      console.error("Signup Error:", error.code, error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <Text style={styles.title}>Let's Get Started</Text>
      <Text style={styles.subtitle}>Create an account to track your expenses</Text>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password please"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSignup(email, password, username)}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    paddingHorizontal: wp(6),
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    color: "#E4FFE9",
    fontWeight: "700",
    marginBottom: hp(1.5),
    textAlign: "center",
    letterSpacing: 0.4,
  },

  subtitle: {
    fontSize: 16,
    color: "#87C184",
    marginBottom: hp(4),
    textAlign: "center",
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#161A16",
    padding: wp(6),
    borderRadius: 14,

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    borderWidth: 1,
    borderColor: "#1F281F",
  },

  label: {
    fontSize: wp(3.8),
    color: "#C8E5CE",
    marginBottom: hp(0.5),
    fontWeight: "600",
  },

  input: {
    height: hp(5.5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2B332B",
    backgroundColor: "#1F241F",
    color: "#E3FFE8",
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    fontSize: 15,
  },

  button: {
    height: hp(6),
    backgroundColor: "#2E4333",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  footerText: {
    textAlign: "center",
    marginTop: hp(4),
    color: "#87C184",
    fontSize: 15,
  },

  link: {
    color: "#34F5C5",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});

export default RegisterScreen;
