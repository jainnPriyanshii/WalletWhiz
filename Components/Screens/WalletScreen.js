import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { wp, hp } from "../../utils/Common";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getWallets } from "../../utils/WalletUtils";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

const WalletScreen = () => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate("AddWallet");
  };
  const [wallets, SetWalletdata] = useState([]);
  const [totalbalance,Settotalbalance] = useState();

  const uid = getAuth().currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;
      const data = await getWallets(uid);
      SetWalletdata(data);

      
      const total = data.reduce((sum, wallet) => {
        const balance = parseFloat(wallet.balance)
        return sum + Number(isNaN(balance) ? 0 : balance);
}, 0);
      Settotalbalance(total)
      console.log(total)
    };
    fetchData();
  }, [uid]);


  return (
    <View style={styles.container}>
      <View style={styles.balance}>
        <Text style={styles.balanceText}>₹{Number(totalbalance || 0).toFixed(2)}</Text>
        <Text style={styles.TotalBalancetext}>Total Balance</Text>
      </View>

      <View style={styles.Walletcontainer}>
        <Text style={styles.walletText}>My Wallets</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleClick}>
        <Feather name="plus" size={18} color="#000" />
      </TouchableOpacity>
      </View>
      <View style={{ padding: 16, marginTop: hp(2),color:'#ff'
       }}>
        <FlatList
          data={wallets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 20,
                marginVertical: 2,
                backgroundColor: '#2b3c2bff',
                borderRadius: 20,
                width: wp(90),
                color:'#fff'
              }}
            >
              {/* <Image source = {{uri:item.image}}
          style = {{width: 50, height: 50, borderRadius: 25, marginRight: 12}}
          /> */}
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 16 }}>₹{item.balance}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192019",
    alignItems: "center",
  },

  balance: {
    backgroundColor: "black",
    width: wp(100),
    height: hp(30),
    justifyContent: "center",
    alignItems: "center",
  },

  balanceText: {
    color: "#fff",
    fontSize: 40,
  },

  TotalBalancetext: {
    fontSize: 16,
    color: "#e5e5e5",
  },

  Walletcontainer: {
    backgroundColor: "#192019",
    flex: 1,
    width: wp(99),
    marginTop: hp(-3),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: wp(5),
    paddingTop: hp(3),
  },

  walletText: {
    fontSize: 20,
    color: "#e5e5e5",
    marginTop: hp(25),

    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#A5FF3F",
    marginTop:hp(-2),
    padding: 6,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: wp(10),
    height: hp(5),
  },
});

export default WalletScreen;
