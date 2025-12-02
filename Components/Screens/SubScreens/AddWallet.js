import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { hp, wp } from "../../../utils/Common";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createWallet } from "../../../utils/WalletUtils";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const AddWallet = () => {
  const [walleticon, setWalleticon] = useState(null);
  const [walletname, SetWalletName] = useState("");
  const [balance, SetBalance] = useState("");

  const { user } = useAuth();
  const uid = user?.uid;
  const navigation = useNavigation();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setWalleticon(result.assets[0].uri);
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

  const newWallet = async () => {
    try {
      const walletData = {
        name: walletname,
        image: walleticon,
        balance: balance,
      };

      await createWallet(uid, walletData);
      navigation.navigate("Wallet");
    } catch (err) {
      console.error("Error adding wallet:", err);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.Headtext}>Add New Wallet</Text>

      <View style={styles.formCard}>
        {/* WALLET NAME */}
        <Text style={styles.label}>Wallet Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter wallet name"
          placeholderTextColor="#666"
          value={walletname}
          onChangeText={SetWalletName}
        />

        {/* BALANCE */}
        <Text style={styles.label}>Balance</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter balance"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={balance}
          onChangeText={SetBalance}
        />

        {/* UPLOAD IMAGE */}
        <Text style={styles.label}>Icon</Text>

        <TouchableOpacity style={styles.uploadBox} onPress={pickImageAsync}>
          <Feather name="upload" size={20} color="#A0A0A0" />
          <Text style={styles.uploadText}>Choose Image</Text>
        </TouchableOpacity>

        {walleticon && (
          <Image
            source={{ uri: walleticon }}
            style={styles.previewImage}
          />
        )}

        {/* ADD BUTTON */}
        <TouchableOpacity style={styles.button} onPress={newWallet}>
          <Text style={styles.buttontext}>Create Wallet</Text>
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
  },

  Headtext: {
    marginTop: hp(5),
    fontSize: 26,
    color: "#E3FFE8",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1,
  },

  formCard: {
    marginTop: hp(4),
    backgroundColor: "#161A16",
    padding: wp(5),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1F281F",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },

  label: {
    fontSize: 16,
    color: "#B8CBB8",
    marginTop: hp(2),
    marginBottom: hp(1),
    fontWeight: "500",
  },

  input: {
    height: hp(6.5),
    backgroundColor: "#1B1F1B",
    borderWidth: 1,
    borderColor: "#2C352C",
    borderRadius: 10,
    paddingHorizontal: wp(3),
    color: "#E3FFE8",
    fontSize: 15,
  },

  uploadBox: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#555",
    borderRadius: 12,
    backgroundColor: "#1C1F1C",
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  uploadText: {
    color: "#A0A0A0",
    fontSize: 15,
  },

  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#2F3A2F",
  },

  button: {
    height: hp(6),
    backgroundColor: "#415B48",
    borderRadius: 12,
    justifyContent: "center",
    marginTop: hp(4),
  },

  buttontext: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default AddWallet;
