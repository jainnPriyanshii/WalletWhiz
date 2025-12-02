import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { hp, wp } from "../../utils/Common";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getTransactions } from "../../utils/TransactionUtils";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectedWalletContext } from "../../Context/SelectedWalletContext";
import { getWalletById } from "../../utils/WalletUtils";

const HomeScreen = () => {
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const navigation = useNavigation();
  const [transactions, setTransactiondata] = useState([]);
  const [totalBalance, SetTotalBalance] = useState(0);
  const [income, SetIncome] = useState(0);
  const [expense, SetExpense] = useState(0);

  const uid = getAuth().currentUser?.uid;
  const { walletname } = useContext(SelectedWalletContext);

  const handleClick = () => {
    navigation.navigate("NewTransaction");
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!uid || !walletname?.id) return;

      const data = await getTransactions(uid, walletname.id);
      setTransactiondata(data);
    };

    fetchTransactions();
  }, [walletname]);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!uid || !walletname?.id) return;

      const data = await getWalletById(uid, walletname.id);
      SetTotalBalance(data.currentBalance);
      SetIncome(data.totalIncome);
      SetExpense(data.totalExpense);
    };

    fetchWalletData();
  }, [walletname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUsername(user.displayName);
    });
    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.transactionRow}>
        <Text style={styles.categoryText}>{item.Category}</Text>
        <Text
          style={[
            styles.amountText,
            { color: item.typename === "Income" ? "#6BFF8A" : "#FF6B6B" },
          ]}
        >
          ₹{item.Amount}
        </Text>
      </View>

      <View style={styles.transactionDetailRow}>
        <Text style={styles.typeText}>{item.typename}</Text>

        <Text style={styles.dateText}>
          {item.createdAt.toDate().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.nameContainer}>
        <Text style={styles.helloText}>Hello,</Text>
        <Text style={styles.nameText}>{username}!</Text>
      </View>

      {/* BALANCE CARD */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>₹{totalBalance}</Text>

        <View style={styles.incomeExpenseRow}>
          <View style={styles.incomeExpenseBox}>
            <Text style={styles.incomeLabel}>Income</Text>
            <Text style={styles.incomeValue}>₹{income}</Text>
          </View>

          <View style={styles.incomeExpenseBox}>
            <Text style={styles.expenseLabel}>Expense</Text>
            <Text style={styles.expenseValue}>₹{expense}</Text>
          </View>
        </View>
      </View>

      {/* TRANSACTIONS HEADER */}
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionText}>Recent Transactions</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleClick}>
          <Feather name="plus" size={18} color="#0E0E0E" />
        </TouchableOpacity>
      </View>

      {/* TRANSACTION LIST */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(5) }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    alignItems: "center",
    paddingTop: hp(3),
  },

  nameContainer: {
    width: wp(90),
    marginBottom: hp(1),
  },

  helloText: {
    color: "#A3A3A3",
    fontSize: 16,
  },

  nameText: {
    color: "#E7FFE9",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  balanceCard: {
    backgroundColor: "#161A16",
    width: wp(90),
    borderRadius: 18,
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,

    marginBottom: hp(3),
  },

  balanceLabel: {
    color: "#C8E5CE",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  balanceAmount: {
    color: "#E3FFE8",
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    marginTop: hp(1),
  },

  incomeExpenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(2),
  },

  incomeExpenseBox: {
    alignItems: "center",
    flex: 1,
  },

  incomeLabel: {
    color: "#89FF8A",
    fontSize: 14,
    fontWeight: "600",
  },

  expenseLabel: {
    color: "#FF7F7F",
    fontSize: 14,
    fontWeight: "600",
  },

  incomeValue: {
    color: "#7EFF9C",
    fontSize: 18,
    fontWeight: "700",
    marginTop: hp(0.5),
  },

  expenseValue: {
    color: "#FF6B6B",
    fontSize: 18,
    fontWeight: "700",
    marginTop: hp(0.5),
  },

  transactionHeader: {
    flexDirection: "row",
    width: wp(90),
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1.5),
  },

  transactionText: {
    color: "#C8E5CE",
    fontSize: 20,
    fontWeight: "700",
  },

  addButton: {
    backgroundColor: "#A5FF3F",
    padding: 10,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  transactionCard: {
    backgroundColor: "#1A1F1A",
    borderRadius: 14,
    width: wp(90),
    padding: wp(4),
    marginVertical: hp(0.8),

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,

    borderWidth: 1,
    borderColor: "#232A23",
  },

  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  categoryText: {
    color: "#E3FFE8",
    fontSize: 17,
    fontWeight: "700",
  },

  amountText: {
    fontSize: 18,
    fontWeight: "700",
  },

  transactionDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },

  typeText: {
    color: "#A3AFA3",
    fontSize: 14,
  },

  dateText: {
    color: "#A3AFA3",
    fontSize: 14,
  },
});

export default HomeScreen;
