import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import {hp,wp} from '../../utils/Common'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nameContainer}>
      <Text style={styles.helloText}>Hello,</Text>
      <Text style={styles.nameText}>Priyanshi Jain</Text>
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceHeader}>
    <Text style={styles.balanceLabel}>Total Balance</Text>
    
  </View>

  <Text style={styles.balanceAmount}> ₹504.00</Text>
       <View style={styles.incomeExpenseRow}>
    <View style={styles.incomeBox}>
      <Text style={styles.incomeArrow}>↓</Text>
      <Text style={styles.incomeLabel}>Income</Text>
      <Text style={styles.incomeAmount}>₹2429.00</Text>
    </View>

    <View style={styles.expenseBox}>
      <Text style={styles.expenseArrow}>↑</Text>
      <Text style={styles.expenseLabel}>Expense</Text>
      <Text style={styles.expenseAmount}>₹1925.00</Text>
    </View>
  </View>
      </View>
      <View>
        <Text style={styles.transactionText}>Recent Transactions</Text>
        <FlatList></FlatList>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#192019",
    alignItems: "center",
    // justifyContent:'center'
  },
  nameContainer:{
    marginTop:hp(5),
    marginLeft:wp(-50)
    // alignItems:'flex-start',

  },
  helloText:{
    color:'#e5e5e5',
    fontSize:16,
    textAlign:'left'
  },

  nameText:{
    color:'#fff',
    fontSize:24,
    textAlign:'left'
  },

  balanceContainer:{
    backgroundColor:'#e5e5e5',
    height:hp(25),
    width:wp(90),
    borderRadius:25,
    marginTop:hp(2)
  },
  
  balanceHeader: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
 
},

balanceLabel: {
  fontSize: 20,
  fontWeight: '600',
  color: '#333',
  //  marginLeft:wp(5),
  marginTop:hp(1)

},



balanceAmount: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#000',
  // marginVertical: 10,
  marginLeft:wp(30),
  
},

incomeExpenseRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
  // marginLeft:wp(-10)
},

incomeBox: {
  alignItems: 'center',
  flex: 1,
},

expenseBox: {
  alignItems: 'center',
  flex: 1,
},

incomeArrow: {
  color: 'green',
  fontSize: 16,
},

expenseArrow: {
  color: 'red',
  fontSize: 16,
},

incomeLabel: {
  color: '#333',
  fontSize: 14,
  marginTop: 4,
},

expenseLabel: {
  color: '#333',
  fontSize: 14,
  marginTop: 4,
},

incomeAmount: {
  color: 'green',
  fontWeight: 'bold',
  fontSize: 16,
  marginTop: 2,
  
},

expenseAmount: {
  color: 'red',
  fontWeight: 'bold',
  fontSize: 16,
  marginTop: 2,
},
 transactionText:{
    fontSize: 20,
    color: "#edede9",
    marginTop:hp(2),
    letterSpacing: wp(0.3),
    fontWeight: "bold",
    marginLeft:wp(-35)

  }
})

export default HomeScreen