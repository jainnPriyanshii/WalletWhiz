import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { hp, wp } from "../../../utils/Common";
import { auth } from "../../../firebaseConfig";
import { reload, updateProfile } from "firebase/auth";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, { displayName: username });
        await reload(user);
        setUsername(user.displayName);

        console.log("Profile updated!", user.displayName);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.Headtext}>Edit Profile</Text>

      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={pickImageAsync}>
          <Image
            source={{
              uri: profileImage || "https://via.placeholder.com/150",
            }}
            style={styles.profileImage}
          />

          <View style={styles.editIconContainer}>
            <Feather name="edit-2" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>New Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    paddingHorizontal: wp(5),
    alignItems: "center",
  },

  Headtext: {
    fontSize: 26,
    color: "#E3FFE8",
    fontWeight: "700",
    marginTop: hp(5),
    letterSpacing: 1,
  },

  imageWrapper: {
    marginTop: hp(4),
    alignItems: "center",
  },

  profileImage: {
    width: hp(20),
    height: hp(20),
    borderRadius: hp(10),
    borderWidth: 2,
    borderColor: "#2E4333",
  },

  editIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#415B48",
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
  },

  formCard: {
    width: wp(90),
    backgroundColor: "#161A16",
    padding: wp(5),
    borderRadius: 14,
    marginTop: hp(4),

    borderWidth: 1,
    borderColor: "#1F281F",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  label: {
    fontSize: 16,
    color: "#B8CBB8",
    marginBottom: hp(1),
    fontWeight: "500",
  },

  input: {
    height: hp(6.5),
    backgroundColor: "#1B1F1B",
    borderWidth: 1,
    borderColor: "#2F352F",
    borderRadius: 10,
    paddingHorizontal: wp(3),
    color: "#E3FFE8",
  },

  buttonContainer: {
    marginTop: hp(5),
    width: wp(90),
  },

  updateBtn: {
    height: hp(6),
    backgroundColor: "#415B48",
    borderRadius: 12,
    justifyContent: "center",
    marginBottom: hp(2),
  },

  deleteBtn: {
    height: hp(6),
    backgroundColor: "#B53939",
    borderRadius: 12,
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default EditProfile;
