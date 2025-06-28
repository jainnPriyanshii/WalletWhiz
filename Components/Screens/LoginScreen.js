import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {hp,wp} from '../../utils/Common'
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';



const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});



 const handlelogin = (email, password) => {
  console.log("user login")
  return signInWithEmailAndPassword(auth, email, password);
  
};



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <Text style={styles.Headtext}>Login now to track your all expenses</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password please"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
        <TouchableOpacity style = {styles.button}  onPress={() => handlelogin(email, password)}>
          <Text style={styles.buttontext}>Login</Text>
        </TouchableOpacity>
        
      </View>
       <Text style={{ textAlign: 'center', marginTop: hp(5) ,color:'#87C184'}}>
      Don't have an account?{" "}
      <Text
        style={{ color: '#2AFBB7', textDecorationLine: 'underline' }}
        onPress={() => navigation.navigate('Register')}
      >
        Create One
      </Text>
    </Text>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#192019",
    paddingHorizontal: wp(5),
  },
 Headtext:{
    fontSize:18,
    color:'#87C184',
    fontWeight:'bold',
    marginBottom:hp(5),
   textAlign:'center'
  },
  form: {
    backgroundColor: "#87C184",
    padding: wp(5),
    borderRadius: wp(2.5),
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: hp(0.25),
    },
    shadowOpacity: 0.25,
    shadowRadius: wp(1),
    elevation: 5,
  },

  label: {
    fontSize: wp(4),
    marginBottom: hp(0.5),
    fontWeight: "bold",
  },

  input: {
    height: hp(5),
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: hp(1.5),
    padding: wp(2.5),
    borderRadius: wp(1.5),
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

  errorText: {
    color: "red",
    marginBottom: hp(1),
  },
});
export default LoginScreen;
