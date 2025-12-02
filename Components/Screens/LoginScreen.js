import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { hp, wp } from "../../utils/Common";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handlelogin = (email, password) => {
    console.log("user login");
    return signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <Text style={styles.Headtext}>Login to track your expenses</Text>

      {/* FORM CARD */}
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => handlelogin(email, password)}
        >
          <Text style={styles.buttontext}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER NAV */}
      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
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
    backgroundColor: "#0E0E0E",
    justifyContent: "center",
    paddingHorizontal: wp(6),
  },

  Headtext: {
    fontSize: 22,
    color: "#A8F0B0",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: hp(4),
    letterSpacing: 0.4,
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
    fontWeight: "600",
    marginBottom: hp(0.8),
  },

  input: {
    height: hp(5.5),
    backgroundColor: "#1F241F",
    borderColor: "#2B332B",
    borderWidth: 1,
    borderRadius: 10,
    color: "#E3FFE8",
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
    fontSize: 15,
  },

  button: {
    height: hp(6),
    backgroundColor: "#2E4333",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  buttontext: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  errorText: {
    color: "#FF6B6B",
    marginBottom: hp(1),
    fontSize: 13,
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

export default LoginScreen;
