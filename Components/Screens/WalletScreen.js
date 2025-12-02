import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { wp, hp } from "../../utils/Common";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getWallets } from "../../utils/WalletUtils";
import { getAuth } from "firebase/auth";

const WalletScreen = () => {
  const navigation = useNavigation();
  const [wallets, setWallets] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  const uid = getAuth().currentUser?.uid;

  const handleClick = () => navigation.navigate("AddWallet");

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;

      const data = await getWallets(uid);
      setWallets(data);

      const total = data.reduce((sum, wallet) => {
        const bal = Number(wallet.balance);
        return sum + (isNaN(bal) ? 0 : bal);
      }, 0);

      setTotalBalance(total);
    };

    fetchData();
  }, [uid]);

  return (
    <View style={styles.container}>
      {/* HEADER BALANCE CARD */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceAmount}>₹{totalBalance.toFixed(2)}</Text>
        <Text style={styles.balanceLabel}>Total Balance</Text>
      </View>

      {/* WALLET LIST HEADER */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>My Wallets</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleClick}>
          <Feather name="plus" size={20} color="#0E0E0E" />
        </TouchableOpacity>
      </View>

      {/* WALLET LIST */}
      <FlatList
        data={wallets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: hp(5) }}
        renderItem={({ item }) => (
          <View style={styles.walletCard}>
            <View>
              <Text style={styles.walletName}>{item.name}</Text>
              <Text style={styles.walletBalance}>₹{item.balance}</Text>
            </View>

            <Feather name="chevron-right" size={22} color="#A0A0A0" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    alignItems: "center",
  },

  balanceCard: {
    width: wp(100),
    height: hp(27),
    backgroundColor: "#161A16",
    justifyContent: "center",
    alignItems: "center",

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,

    borderBottomWidth: 1,
    borderColor: "#1F281F",
  },

  balanceAmount: {
    fontSize: 42,
    fontWeight: "700",
    color: "#E3FFE8",
  },

  balanceLabel: {
    fontSize: 16,
    color: "#A3AFA3",
    marginTop: 4,
  },

  listHeader: {
    width: wp(90),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(3),
  },

  listTitle: {
    fontSize: 22,
    color: "#E3FFE8",
    fontWeight: "700",
  },

  addButton: {
    backgroundColor: "#A5FF3F",
    padding: 10,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  walletCard: {
    backgroundColor: "#161A16",
    width: wp(90),
    padding: wp(5),
    borderRadius: 16,
    marginTop: hp(1.5),

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#1F281F",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  walletName: {
    color: "#E3FFE8",
    fontSize: 18,
    fontWeight: "600",
  },

  walletBalance: {
    color: "#999",
    marginTop: 4,
    fontSize: 14,
  },
});

export default WalletScreen;

