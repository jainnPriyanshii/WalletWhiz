import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { hp, wp } from "../../../utils/Common";
import { useState } from "react";

const EditProfile = ({ profileImage, onEdit }) => {
  const [username, setUsername] = useState("");
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.Headtext}>EditProfile</Text>
      <TouchableOpacity onPress={onEdit}>
        <Image
          source={{ uri: profileImage || "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <View style={styles.editIconContainer}>
          <Feather name="edit-2" size={16} color="#fff" />
        </View>
      </TouchableOpacity>
      <View style={styles.namecontainer}>
        <Text style={styles.label}>New Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.updtbutton}>
          <Text style={styles.buttontext}>Update profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dltbutton}>
          <Text style={styles.buttontext}>Delete Account</Text>
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
    alignItems: "center",
  },
  Headtext: {
    fontSize: 24,
    color: "#87C184",
    fontWeight: "bold",
    marginTop: hp(5),
    textAlign: "center",
    letterSpacing: wp(0.5),
    marginBottom: hp(5),
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  namecontainer: {
    marginTop: hp(5),
  },
  label: {
    fontSize: wp(5),
    marginBottom: hp(1),
    fontWeight: "bold",
    color: "#fff",
  },

  input: {
    height: hp(6),
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: hp(1.5),
    padding: wp(2.5),
    borderRadius: wp(1.5),
    color: "#fff",
    width: wp(88),
  },
  updtbutton:{
    height:hp(5),
    backgroundColor:'#415B48',
    borderRadius:10,
    width: wp(88),
    marginTop:hp(25),
    
  },

  dltbutton:{
    height:hp(5),
    backgroundColor:'#F44336',
    borderRadius:10,
    width: wp(88),
    marginTop:hp(2),
  },
  

  buttontext:{
 color:'#fff',
  textAlign:'center',
  paddingTop:hp(0.6),
  fontWeight:'bold',
  fontSize:18,
  },
});

export default EditProfile;
