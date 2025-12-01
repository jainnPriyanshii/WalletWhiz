import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect, useContext } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { hp, wp } from "../../../utils/Common";
import { getWallets } from "../../../utils/WalletUtils";
import { getAuth } from "firebase/auth";
import { addTransaction } from "../../../utils/TransactionUtils";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectedWalletContext from "../../../Context/SelectedWalletContext";
const NewTransaction = () => {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [description, setDescription] = useState("");
  // const [walletData, setWalletData] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  // const [selectedWallet, setSelectedWallet] = useState(null);
 const navigation = useNavigation();
  const uid = getAuth().currentUser?.uid;
  const {walletname} = useContext(SelectedWalletContext);
  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;
      const data = await getWallets(uid);
      setWalletData(data);
    };
    fetchData();
  }, [uid]);

  // CONDITIONAL RENDERING OF THE WALLET NAMES
  // const renderWalletDropdown = () => {
  //   if (!isDropdownVisible) return null;

  //   return (
  //     <View style={styles.dropdown}>
  //       {walletData.map((wallet) => (
  //         <TouchableOpacity
  //           key={wallet.id}
  //           style={styles.walletItem}
  //           onPress={() => {
  //             setSelectedWallet(wallet);
  //             setIsDropdownVisible(false);
  //           }}
  //         >
  //           <Text>{wallet.name}</Text>
  //         </TouchableOpacity>
  //       ))}
  //     </View>
  //   );
  // };

  // ADDING THE NEW TRANSACTION
  const newTransaction = async () => {
      try {
        if (!walletname) {
      console.warn("No wallet selected");
      return;
        }

        const TransactionData = {
          typename: type,
          Amount: amount,
          Category: category,
          // wallet: selectedWallet,
          Datetransaction :date,
          Description:description,
        };
  
        await addTransaction(uid, walletname, TransactionData);
        navigation.navigate("Home");
        console.log("Navigated")
      } catch (err) {
        console.error("Error adding transaction:", err);
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Add Transaction</Text>

      {/* TYPE SECTION */}
      <Text style={styles.label}>Type</Text>
      <View style={styles.picker}>
        <Picker
          style={{ color: "white" }}
          selectedValue={type}
          onValueChange={(value) => setType(value)}
        >
          <Picker.Item label="Expense" value="Expense" />
          <Picker.Item label="Income" value="Income" />
        </Picker>
      </View>


      {/* AMOUNT SECTION */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Category SECTION */}
      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter category"
        value={category}
        onChangeText={setCategory}
      />

      {/* ADDD SECTION FOR THE SELECTING WALLETS */}
      {/* <Text style={styles.label}>Wallet</Text>

      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        <Text style={{ color: "white" }}>
          {selectedWallet?.name || "Select Wallet"}
        </Text>
      </TouchableOpacity>

      {renderWalletDropdown()} */}


  {/* SECTION FOR DATE AND TIME */}
      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text style={{ color: "white" }}>{date.toDateString()}</Text>
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

      {/* DESCRIOTION SECTION */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.descinput}
        placeholder="Enter Description(optional)"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText} onPress={newTransaction}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#192019",
  },
  header: {
    marginTop: 22,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#87C184",
    alignItems: "center",
  },
  label: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#415B46",
    fontSize: 18,
  },
  dropdown: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    backgroundColor: 'rgba(174, 244, 166, 1)"',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  walletItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#87C184",
    // padding:,
    borderRadius: 8,
    marginTop: 5,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#87C184",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    color: "white",
  },
  selector: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#87C184",
    borderRadius: 8,
    marginTop: 5,
    color: "white",
  },
  descinput: {
    height: hp(12),
    borderWidth: 1,
    borderColor: "#87C184",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    color: "white",
  },
  addButton: {
    marginTop: 30,
    backgroundColor: "#415B48",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default NewTransaction;
