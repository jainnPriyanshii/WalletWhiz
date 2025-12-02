import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { hp, wp } from "../../utils/Common";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const Auth = getAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (user) => {
      if (user) {
        setUsername(user.displayName);
        setEmail(user.email);
      }
    });
    return unsubscribe;
  }, []);

  const menuItems = [
    {
      label: "Edit Profile",
      icon: "person",
      bgColor: "#2E4333",
      onPress: () => navigation.navigate("EditProfile"),
    },
    {
      label: "Settings",
      icon: "settings",
      bgColor: "#1F241F",
      onPress: () => {},
    },
    {
      label: "Privacy Policy",
      icon: "lock",
      bgColor: "#343434",
      onPress: () => {},
    },
    {
      label: "Logout",
      icon: "power-settings-new",
      bgColor: "#642E2E",
      onPress: handleLogout,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.HeadText}>Profile</Text>

      <Image
        style={styles.profileImage}
        source={require("../../assets/icon.png")}
      />

      <Text style={styles.name}>{username}</Text>
      <Text style={styles.email}>{email}</Text>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuCard}
            onPress={item.onPress}
            activeOpacity={0.8}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: item.bgColor }]}
            >
              <MaterialIcons name={item.icon} size={22} color="#fff" />
            </View>

            <Text style={styles.label}>{item.label}</Text>

            <MaterialIcons
              name="chevron-right"
              size={24}
              color="#777"
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
    backgroundColor: "#0E0E0E",
    alignItems: "center",
    paddingTop: hp(4),
  },

  HeadText: {
    fontSize: 26,
    color: "#E3FFE8",
    fontWeight: "700",
    letterSpacing: 1,
  },

  profileImage: {
    height: hp(18),
    width: hp(18),
    borderRadius: hp(10),
    marginTop: hp(3),

    borderWidth: 2,
    borderColor: "#2E4333",
  },

  name: {
    fontSize: 22,
    color: "#E3FFE8",
    marginTop: hp(2),
    fontWeight: "600",
  },

  email: {
    fontSize: 16,
    color: "#A9B8A9",
    marginBottom: hp(2),
  },

  menuContainer: {
    marginTop: hp(3),
    width: wp(90),
  },

  menuCard: {
    backgroundColor: "#161A16",
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1.5),

    borderWidth: 1,
    borderColor: "#1F281F",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  iconContainer: {
    padding: hp(1.2),
    borderRadius: 10,
    marginRight: wp(4),
  },

  label: {
    color: "#E3FFE8",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default ProfileScreen;
