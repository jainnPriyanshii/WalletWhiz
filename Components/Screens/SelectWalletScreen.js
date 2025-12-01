import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { wp, hp } from "../../utils/Common";
import { getWallets } from "../../utils/WalletUtils";
import { getAuth } from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import {SelectedWalletContext} from '../../Context/SelectedWalletContext'
import { useNavigation } from "@react-navigation/native";

const SelectWalletScreen = () => {
  const [walletData, setWalletData] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const {SetSelectedWalletname}= useContext(SelectedWalletContext);

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


  function onWalletpress(wallet)  {
    SetSelectedWalletname(wallet)
    navigation.navigate('WalletWhizHome');
  }
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
                // setSelectedWallet(wallet);
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
        <Text style={styles.Headtext2}>### You Wish to Check ###</Text>
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
          color="#fff"
        />
      </TouchableOpacity>

      {renderWalletDropdown()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192019",
    alignItems: "center",
    paddingTop: hp(8),
  },
  headerContainer: {
    marginBottom: hp(4),
    alignItems: "center",
  },
  Headtext1: {
    fontSize: 26,
    color: "#87C184",
    fontWeight: "bold",
  },
  Headtext2: {
    fontSize: 18,
    color: "#87C184",
    marginTop: 4,
  },
  selector: {
    width: wp(66),
    backgroundColor: "#87C184",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  selectorText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  dropdown: {
    width: wp(66),
    marginTop: hp(1.5),
    borderWidth: 1,
    borderColor: "#87C184",
    borderRadius: 10,
    backgroundColor: "rgba(174, 244, 166, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: hp(25),
  },
  walletItem: {
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
  },
  walletText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SelectWalletScreen;
