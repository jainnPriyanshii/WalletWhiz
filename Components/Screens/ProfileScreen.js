import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { hp, wp } from "../../utils/Common";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native'
import { signOut } from "firebase/auth";
import {auth} from '../../firebaseConfig'

const ProfileScreen = () => {
  const handleLogout = async() =>{
   try {
    await signOut(auth)
    console.log("User logged out")
   } catch (error) {
    console.error("Error while logging out:",error)
   }
  }
  const navigation = useNavigation();
  const menuItems = [
    { label: "Edit Profile", icon: "person", bgColor: "#5A65EA",onPress: () => navigation.navigate("EditProfile") },
    { label: "Settings", icon: "settings", bgColor: "#3B945E" },
    { label: "Privacy Policy", icon: "lock", bgColor: "#555555" },
    { label: "Logout", icon: "power-settings-new", bgColor: "#D24545" , onPress:()=>{handleLogout()}},
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.HeadText}>Profile</Text>
      <View>
        <Image
          style={styles.profileImage}
          source={require("../../assets/icon.png")}
        />
      </View>
      <Text style={styles.name}>Priyanshi jain</Text>
      <Text style={styles.email}>priyanshijain664@gmail</Text>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}
>
            <View
              style={[styles.iconContainer, { backgroundColor: item.bgColor }]}
            >
              <Icon name={item.icon} size={20} color="#fff" />
            </View>
            <Text style={styles.label}>{item.label}</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#aaa"
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#192019",

    alignItems: "center",
  },

  HeadText: {
    fontSize: 24,
    color: "#edede9",
    marginTop: hp(5),
    letterSpacing: wp(0.5),
    fontWeight: "bold",
  },

  profileImage: {
    height: hp(20),
    width: wp(40),
    borderRadius: wp(20),
    marginTop: wp(10),
  },

  name: {
    fontSize: 20,
    color: "#edede9",
    marginTop: hp(1),
    letterSpacing: wp(0.5),
    fontWeight: "bold",
    textAlign: "center",
  },
  email: {
    fontSize: 18,
    color: "#e5e5e5",
    fontWeight: 300,
  },
  menuContainer: {
    marginTop: hp(3),
    width: wp(90),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: hp(1),
  },
  iconContainer: {
    padding: hp(1.5),
    borderRadius: hp(1),
    marginRight: wp(5),
  },
  label: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;
