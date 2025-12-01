import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { hp, wp } from "../../utils/Common";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getTransactions } from "../../utils/TransactionUtils";
import { SafeAreaView } from "react-native-safe-area-context";
import {SelectedWalletContext} from "../../Context/SelectedWalletContext";
import { getWalletById, getWallets } from "../../utils/WalletUtils";

const HomeScreen = () => {
 
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const navigation = useNavigation();
  const [transactions, setTransactiondata] = useState([]);
  const [walletId, SetWalletid] = useState([]);
  const [totalBalance, SetTotalBalance] = useState(0);
  const [income, SetIncome] = useState(0);
  const [expense, SetExpense] = useState(0);
  const [walletData, setWalletData] = useState(null);

  const handleClick = () => {
    navigation.navigate("NewTransaction");
  };

  const uid = getAuth().currentUser?.uid;
  const  {walletname} = useContext(SelectedWalletContext);
 console.log("CTX VALUE:", walletname);
  

    
  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;

      if (!walletname?.id) {
        return null;
      } else {
        const data = await getTransactions(uid, walletname.id);
        

        console.log("walletname", walletname);
        console.log("Fetched transactions:", data);
        setTransactiondata(data);
      }
    };

    fetchData();
  }, [walletname]);

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;

      if (!walletname?.id) {
        return null;

        
      } else {
        const data = await getWalletById(uid,walletname.id);
        console.log("walletname", walletname);
        console.log("walletdata", data);
        setWalletData(data);
        SetTotalBalance(data.currentBalance);
        SetIncome(data.totalIncome);
        SetExpense(data.totalExpense);
      }
    };

    fetchData();
  }, [walletname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName);
        console.log(user.displayName);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.helloText}>Hello,</Text>
        <Text style={styles.nameText}>{username}!</Text>
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
        </View>

        <Text style={styles.balanceAmount}>₹{totalBalance}</Text>
        <View style={styles.incomeExpenseRow}>
          <View style={styles.incomeBox}>
            <Text style={styles.incomeArrow}>↓</Text>
            <Text style={styles.incomeLabel}>Income</Text>
            <Text style={styles.incomeAmount}>₹{income}</Text>
          </View>

          <View style={styles.expenseBox}>
            <Text style={styles.expenseArrow}>↑</Text>
            <Text style={styles.expenseLabel}>Expense</Text>
            <Text style={styles.expenseAmount}>₹{expense}</Text>
          </View>
        </View>
      </View>
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionText}>Recent Transactions</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleClick}>
          <Feather name="plus" size={18} color="#000" />
        </TouchableOpacity>
      </View>
      {/* <ScrollView style={{ padding: 16, marginTop: hp(2), color: "#ff" }}> */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              marginVertical: 4,
              backgroundColor: "#2b3c2bff",
              borderRadius: 20,
              width: wp(90),
              color: "#8b95a5ff",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.Category}
            </Text>
            <Text style={{ fontSize: 16 }}>₹{item.Amount}</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.typename}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.createdAt.toDate().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </View>
        )}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#192019",
    alignItems: "center",
    // justifyContent:'center'
  },
  nameContainer: {
    // marginTop: hp(5),
    marginLeft: wp(-50),
    // alignItems:'flex-start',
  },
  helloText: {
    color: "#e5e5e5",
    fontSize: 16,
    textAlign: "left",
  },

  nameText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "left",
  },

  balanceContainer: {
    backgroundColor: "#e5e5e5",
    height: hp(25),
    width: wp(90),
    borderRadius: 25,
    marginTop: hp(2),
  },

  balanceHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  balanceLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    //  marginLeft:wp(5),
    marginTop: hp(1),
  },

  balanceAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    // marginVertical: 10,
    marginLeft: wp(30),
  },

  incomeExpenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    // marginLeft:wp(-10)
  },

  incomeBox: {
    alignItems: "center",
    flex: 1,
  },

  expenseBox: {
    alignItems: "center",
    flex: 1,
  },

  incomeArrow: {
    color: "green",
    fontSize: 16,
  },

  expenseArrow: {
    color: "red",
    fontSize: 16,
  },

  incomeLabel: {
    color: "#333",
    fontSize: 14,
    marginTop: 4,
  },

  expenseLabel: {
    color: "#333",
    fontSize: 14,
    marginTop: 4,
  },

  incomeAmount: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 2,
  },

  expenseAmount: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 2,
  },

  transactionContainer: {
    // justifyContent:'space-between',
    // alignItems:'center',
    flexDirection: "row",
    marginTop: hp(2),
    // marginLeft:wp(0)
  },
  transactionText: {
    fontSize: 20,
    color: "#edede9",
    // marginTop:hp(2),
    letterSpacing: wp(0.3),
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#A5FF3F",
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: wp(10),
    height: hp(5),
    marginLeft: wp(16),
    // marginTop:hp(2)
  },
});

export default HomeScreen;
