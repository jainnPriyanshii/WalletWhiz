import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect, useContext } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { hp, wp } from "../../../utils/Common";
import { getWallets, getWalletById, updateWallet } from "../../../utils/WalletUtils";
import { getAuth } from "firebase/auth";
import { addTransaction } from "../../../utils/TransactionUtils";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectedWalletContext } from "../../../Context/SelectedWalletContext";

const NewTransaction = () => {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [description, setDescription] = useState("");

  const navigation = useNavigation();
  const uid = getAuth().currentUser?.uid;
  const { walletname } = useContext(SelectedWalletContext);

  const newTransaction = async () => {
    try {
      if (!walletname?.id) {
        alert("No wallet selected.");
        return;
      }

      const wallet = await getWalletById(uid, walletname.id);

      let currentBalance = Number(wallet.currentBalance);
      let totalIncome = Number(wallet.totalIncome);
      let totalExpense = Number(wallet.totalExpense);
      let txnAmount = Number(amount);

      if (!txnAmount) {
        alert("Enter a valid amount!");
        return;
      }

      if (type === "Expense") {
        if (txnAmount > currentBalance) {
          alert("Insufficient balance!");
          return;
        }
        currentBalance -= txnAmount;
        totalExpense += txnAmount;
      } else {
        currentBalance += txnAmount;
        totalIncome += txnAmount;
      }

      const TransactionData = {
        typename: type,
        Amount: txnAmount,
        Category: category,
        Datetransaction: date,
        Description: description,
      };

      await updateWallet(uid, walletname.id, {
        currentBalance,
        totalIncome,
        totalExpense,
      });

      await addTransaction(uid, walletname.id, TransactionData);

      navigation.navigate("Home");
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add Transaction</Text>

      {/* CARD */}
      <View style={styles.card}>
        {/* TYPE */}
        <Text style={styles.label}>Type</Text>
        <View style={styles.pickerContainer}>
           <Picker
            selectedValue={type}
            onValueChange={setType}
            dropdownIconColor="#C8E5CE"
            style={styles.picker}
          > 
            <Picker.Item label="Expense" value="Expense" color="#1e5d54ff" />
            <Picker.Item label="Income" value="Income" color="#1e5d54ff"  />
          </Picker>
        </View> 

        {/* AMOUNT */}
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="#777"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* CATEGORY */}
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter category"
          placeholderTextColor="#777"
          value={category}
          onChangeText={setCategory}
        />

        {/* DATE */}
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text style={styles.selectorText}>{date.toDateString()}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(selectedDate) => {
            setDate(selectedDate);
            setDatePickerVisibility(false);
          }}
          onCancel={() => setDatePickerVisibility(false)}
          date={date}
        />

        {/* DESCRIPTION */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.descInput}
          placeholder="Optional description"
          placeholderTextColor="#777"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.addButton} onPress={newTransaction}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    paddingHorizontal: wp(6),
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#A8F0B0",
    marginTop: hp(2),
    marginBottom: hp(3),
    textAlign: "center",
  },

  card: {
    backgroundColor: "#161A16",
    borderRadius: 16,
    padding: wp(5),

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,

    borderWidth: 1,
    borderColor: "#1F281F",
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#C8E5CE",
    marginTop: hp(1.5),
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#2B332B",
    backgroundColor: "#1F241F",
    borderRadius: 10,
    marginTop: 8,
  },

  picker: {
    height: hp(8),
    color: "#E3FFE8",
  },

  input: {
    height: hp(5.5),
    borderWidth: 1,
    borderColor: "#2B332B",
    backgroundColor: "#1F241F",
    borderRadius: 10,
    color: "#E3FFE8",
    paddingHorizontal: wp(3),
    marginTop: 8,
  },

  selector: {
    height: hp(5.5),
    borderWidth: 1,
    borderColor: "#2B332B",
    backgroundColor: "#1F241F",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: wp(3),
    marginTop: 8,
  },

  selectorText: {
    color: "#E3FFE8",
    fontSize: 15,
  },

  descInput: {
    height: hp(12),
    borderWidth: 1,
    borderColor: "#2B332B",
    backgroundColor: "#1F241F",
    color: "#E3FFE8",
    borderRadius: 10,
    paddingHorizontal: wp(3),
    paddingTop: hp(1),
    marginTop: 8,
  },

  addButton: {
    marginTop: hp(3),
    backgroundColor: "#2E4333",
    paddingVertical: hp(1.6),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.5,
  },
});

export default NewTransaction;

