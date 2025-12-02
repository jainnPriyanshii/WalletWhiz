import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { wp, hp } from "../../utils/Common";
import { getWallets } from "../../utils/WalletUtils";
import { getAuth } from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import { SelectedWalletContext } from "../../Context/SelectedWalletContext";
import { useNavigation } from "@react-navigation/native";

const SelectWalletScreen = () => {
  const [walletData, setWalletData] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const { SetSelectedWalletname } = useContext(SelectedWalletContext);

  const uid = getAuth().currentUser?.uid;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;
      const data = await getWallets(uid);
      setWalletData(data);
    };
    fetchData();
  }, [uid]);

  const onWalletpress = (wallet) => {
    SetSelectedWalletname(wallet);
    navigation.navigate("WalletWhizHome");
  };

  const renderWalletDropdown = () => {
    if (!isDropdownVisible) return null;

    return (
      <View style={styles.dropdown}>
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
          {walletData.map((wallet) => (
            <TouchableOpacity
              key={wallet.id}
              style={styles.walletItem}
              onPress={() => {
                onWalletpress(wallet);
                setIsDropdownVisible(false);
              }}
            >
              <Text style={styles.walletText}>{wallet.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.Headtext1}>Select Wallet</Text>
        <Text style={styles.Headtext2}>Choose the wallet you want to view</Text>
      </View>

      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        activeOpacity={0.8}
      >
        <Text style={styles.selectorText}>
          {selectedWallet?.name || "Select Wallet"}
        </Text>
        <Feather
          name={isDropdownVisible ? "chevron-up" : "chevron-down"}
          size={20}
          color="#C8E5CE"
        />
      </TouchableOpacity>

      {renderWalletDropdown()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    alignItems: "center",
    paddingTop: hp(10),
  },

  headerContainer: {
    marginBottom: hp(4),
    alignItems: "center",
  },

  Headtext1: {
    fontSize: 26,
    color: "#A8F0B0",
    fontWeight: "700",
    letterSpacing: 0.6,
  },

  Headtext2: {
    fontSize: 16,
    color: "#7FAD84",
    marginTop: 6,
    fontWeight: "400",
  },

  selector: {
    width: wp(70),
    backgroundColor: "#161A16",
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(5),
    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#1F281F",

    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  selectorText: {
    color: "#C8E5CE",
    fontSize: 16,
    fontWeight: "600",
  },

  dropdown: {
    width: wp(70),
    marginTop: hp(1.5),

    backgroundColor: "#161A16",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2B332B",

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    maxHeight: hp(28),
  },

  walletItem: {
    paddingVertical: hp(1.8),
    borderBottomWidth: 1,
    borderColor: "#1F281F",
    alignItems: "center",
  },

  walletText: {
    color: "#E3FFE8",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SelectWalletScreen;
