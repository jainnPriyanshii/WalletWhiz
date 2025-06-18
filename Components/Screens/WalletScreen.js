import { View, Text, StyleSheet,TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { wp, hp } from "../../utils/Common";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";


const WalletScreen = () => { 
  const navigation = useNavigation();
  const handleClick = () => {
      navigation.navigate('AddWallet')
    }
  return (
    <View style={styles.container}>
      <View style={styles.balance}>
        <Text style={styles.balanceText}>₹4664.00</Text>
        <Text style={styles.TotalBalancetext}>Total Balance</Text>
      </View>

      <View style={styles.Walletcontainer}>
        <Text style={styles.walletText}>My Wallets</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleClick}>
        <Icon name="plus" size={18} color="#000" />
      </TouchableOpacity>
      </View>
      <FlatList/>   
      {/* {WRITEEEE FLATLIST WHEN MAKING THE MODAL FOR THE NEW WALLET SO THAT TO DISPLAY THE LIST OF THE WALLETS} */}
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

  walletText:{
    fontSize: 20,
    color: "#e5e5e5",
    
    fontWeight:'bold'
  },
  addButton: {
    backgroundColor: "#A5FF3F",
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width:wp(10),
    height:hp(5),
    
  },
  
});

export default WalletScreen;
