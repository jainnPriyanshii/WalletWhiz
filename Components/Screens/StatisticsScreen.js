import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React, { useContext, useState,useEffect } from "react";
import { hp, wp } from "../../utils/Common";
import {BarChart} from "react-native-gifted-charts";
import {SelectedWalletContext} from '../../Context/SelectedWalletContext';
import { getAuth } from "firebase/auth";
import {getTransactions} from '../../utils/TransactionUtils';

const StatisticsScreen = ()=> {
  const uid = getAuth().currentUser?.uid;
const { walletname } = useContext(SelectedWalletContext);
const [selected, setSelected] = useState("Weekly");
const tabs = ["Weekly", "Monthly", "Yearly"];
const [allTxns, setAllTxns] = useState([]);
let weeklyTxns = [];
let monthlyTxns = [];
let yearlyTxns = [];
let filteredTxns = [];



useEffect(() => {
  const fetchAllTxns = async () => {
    if (!uid || !walletname?.id) return;

    const txns = await getTransactions(uid, walletname.id);

    const enhanced = txns.map(tx => ({
      ...tx,
      dateObj: tx.Datetransaction.toDate(),
    }));

    setAllTxns(enhanced);
  };

  fetchAllTxns();
}, [walletname]);




let today   = new Date();
let currentMonth = today.getMonth();
let currentYear  = today.getFullYear();



let dayIndex = today.getDay(); 
let diff     = today.getDate() - dayIndex + (dayIndex === 0 ? -6 : 1);
let weekStart = new Date(today.setDate(diff));

let weekEnd = new Date(
  weekStart.getFullYear(),
  weekStart.getMonth(),
  weekStart.getDate() + 6
);




for (let i = 0; i < allTxns.length; i++) {
  const tx = allTxns[i];
  const txDate = tx?.dateObj;

  if (!txDate) continue;


  
  if (txDate >= weekStart && txDate <= weekEnd) {
    weeklyTxns.push(tx);
  }



  if (
    txDate.getMonth() === currentMonth &&
    txDate.getFullYear() === currentYear
  ) {
    monthlyTxns.push(tx);
  }



  if (txDate.getFullYear() === currentYear) {
    yearlyTxns.push(tx);
  }
}




if (selected === "Weekly") filteredTxns = weeklyTxns;
if (selected === "Monthly") filteredTxns = monthlyTxns;
if (selected === "Yearly") filteredTxns = yearlyTxns;



let incomeTxns  = filteredTxns.filter(tx => tx.typename === "Income");
let expenseTxns = filteredTxns.filter(tx => tx.typename === "Expense");


let incomeTotal = 0;
for (let i = 0; i < incomeTxns.length; i++) {
  incomeTotal += Number(incomeTxns[i].Amount);
}

let expenseTotal = 0;
for (let i = 0; i < expenseTxns.length; i++) {
  expenseTotal += Number(expenseTxns[i].Amount);
}



console.log("WEEKLY TXNS ===>", weeklyTxns);
console.log("MONTHLY TXNS ===>", monthlyTxns);
console.log("YEARLY TXNS ===>", yearlyTxns);

console.log("INCOME TOTAL =", incomeTotal);
console.log("EXPENSE TOTAL =", expenseTotal);


  // const barData = [
  //       {
  //         value: 40,
  //         label: 'Jan',
  //         spacing: 2,
  //         labelWidth: 30,
  //         labelTextStyle: {color: 'gray'},
  //         frontColor: '#177AD5',
  //       },
  //       {value: 20, frontColor: '#ED6665'},
  //       {
  //         value: 50,
  //         label: 'Feb',
  //         spacing: 2,
  //         labelWidth: 30,
  //         labelTextStyle: {color: 'gray'},
  //         frontColor: '#177AD5',
  //       },
  //       {value: 40, frontColor: '#ED6665'},
  //       {
  //         value: 75,
  //         label: 'Mar',
  //         spacing: 2,
  //         labelWidth: 30,
  //         labelTextStyle: {color: 'gray'},
  //         frontColor: '#177AD5',
  //       },
  //       {value: 25, frontColor: '#ED6665'},
  //       {
  //         value: 30,
  //         label: 'Apr',
  //         spacing: 2,
  //         labelWidth: 30,
  //         labelTextStyle: {color: 'gray'},
  //         frontColor: '#177AD5',
  //       },
  //       {value: 20, frontColor: '#ED6665'},
  //       {
  //         value: 60,
  //         label: 'May',
  //         spacing: 2,
  //         labelWidth: 30,
  //         labelTextStyle: {color: 'gray'},
  //         frontColor: '#177AD5',
  //       },
  //       {value: 40, frontColor: '#ED6665'},
  //       {
  //         value: 65,
  //         label: 'Jun',
  //         spacing: 2,
  //         labelWidth: 30,
  //         labelTextStyle: {color: 'gray'},
  //         frontColor: '#177AD5',
  //       },
  //       {value: 30, frontColor: '#ED6665'},
  //     ];
  const barData = [
{ value: incomeTotal, label: "Income", frontColor: "#4CAF50" ,label:'income',labelWidth: 30 , labelTextStyle: {color: 'gray'}},
  { value: expenseTotal, label: "Expense", frontColor: "#FF5252",label:'expense' ,labelWidth: 30 , labelTextStyle: {color: 'gray'}}
  ];



  return (
    <View style={styles.container}>
      <Text style={styles.HeadText}>Statistics</Text>
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelected(tab)}
            style={[
              styles.tabItem,
              selected === tab && styles.activeTabItem,
            ]}
          >
            <Text
              style={[
                styles.tabsText,
                selected === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
<View style={styles.chartContainer}>
  {barData.length > 0 ? (
      <BarChart data={barData}
          barWidth={40}
          spacing={24}
          // roundedTop
          // roundedBottom
          // hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{color: 'gray'}}
          noOfSections={3}
          maxValue={75}
  />) : (
    <View style={styles.noChart}></View>
  )}

</View>
<View style={styles.transactionContainer}>
  <Text style={styles.transactionText}>Transactions</Text>
  <FlatList
    data={filteredTxns}
    keyExtractor={(item, index) => item.id || index.toString()}
    renderItem={({ item }) => (
      <View style={styles.transactionItem}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionCategory}>{item.Category || 'N/A'}</Text>
          <Text style={styles.transactionDate}>
            {item.dateObj?.toLocaleDateString() || 'No date'}
          </Text>
        </View>
        <Text style={[
          styles.transactionAmount,
          { color: item.typename === 'Income' ? '#4CAF50' : '#FF5252' }
        ]}>
          {item.typename === 'Income' ? '+' : '-'}₹{item.Amount}
        </Text>
      </View>
    )}
    ListEmptyComponent={() => (
      <Text style={styles.emptyText}>No transactions found</Text>
    )}
    style={styles.flatList}
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

  HeadText: {
    fontSize: 24,
    color: "#edede9",
    marginTop: hp(5),
    letterSpacing: wp(0.5),
    fontWeight: "bold",
  },

  tabs: {
    backgroundColor: "#353535",
    width: wp(90),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: hp(5),
    borderRadius: 25,
    marginTop: hp(2),
    padding: 4,
  },

  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 20,
  },

  activeTabItem: {
    backgroundColor: "#edede9",
  },

  tabsText: {
    color: "#edede9",
    fontWeight: "bold",
  },

  activeTabText: {
    color: "#000",
  },

  chartContainer:{
position:'relative',
marginTop:hp(3),
// height:wp(25),
justifyContent:'center',
// alignItems:'center'
  },

  noChart:{
  backgroundColor:'black',
  heaight:hp(20)
  },
  
  // transactionText:{
  //   fontSize: 20,
  //   color: "#edede9",
  //   marginTop:hp(2),
  //   letterSpacing: wp(0.3),
  //   fontWeight: "bold",
  //   marginLeft:wp(-42)

  // },
  transactionContainer: {
  width: wp(90),
  marginTop: hp(3),
  flex: 1,
},

transactionText: {
  fontSize: 20,
  color: "#edede9",
  marginBottom: hp(2),
  letterSpacing: wp(0.3),
  fontWeight: "bold",
},

flatList: {
  flex: 1,
},

transactionItem: {
  backgroundColor: '#2a2a2a',
  padding: wp(4),
  borderRadius: 10,
  marginBottom: hp(1.5),
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

transactionInfo: {
  flex: 1,
},

transactionCategory: {
  color: '#edede9',
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 4,
},

transactionDate: {
  color: '#999',
  fontSize: 12,
},

transactionAmount: {
  fontSize: 18,
  fontWeight: 'bold',
},

emptyText: {
  color: '#999',
  textAlign: 'center',
  marginTop: hp(5),
  fontSize: 16,
}
});

export default StatisticsScreen;
