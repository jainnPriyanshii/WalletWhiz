import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { hp, wp } from "../../utils/Common";
import { BarChart } from "react-native-gifted-charts";
import { SelectedWalletContext } from "../../Context/SelectedWalletContext";
import { getAuth } from "firebase/auth";
import { getTransactions } from "../../utils/TransactionUtils";

const StatisticsScreen = () => {
  const uid = getAuth().currentUser?.uid;
  const { walletname } = useContext(SelectedWalletContext);

  const [selected, setSelected] = useState("Weekly");
  const tabs = ["Weekly", "Monthly", "Yearly"];
  const [allTxns, setAllTxns] = useState([]);

  useEffect(() => {
    const fetchAllTxns = async () => {
      if (!uid || !walletname?.id) return;

      const txns = await getTransactions(uid, walletname.id);

      const enhanced = txns.map((tx) => ({
        ...tx,
        dateObj: tx.Datetransaction.toDate(),
      }));

      setAllTxns(enhanced);
    };

    fetchAllTxns();
  }, [walletname]);

  // DATE FILTERING LOGIC
  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  let dayIndex = today.getDay();
  let diff = today.getDate() - dayIndex + (dayIndex === 0 ? -6 : 1);
  let weekStart = new Date(today.setDate(diff));
  let weekEnd = new Date(
    weekStart.getFullYear(),
    weekStart.getMonth(),
    weekStart.getDate() + 6
  );

  let weeklyTxns = [];
  let monthlyTxns = [];
  let yearlyTxns = [];

  allTxns.forEach((tx) => {
    const txDate = tx.dateObj;
    if (!txDate) return;

    if (txDate >= weekStart && txDate <= weekEnd) weeklyTxns.push(tx);
    if (
      txDate.getMonth() === currentMonth &&
      txDate.getFullYear() === currentYear
    )
      monthlyTxns.push(tx);

    if (txDate.getFullYear() === currentYear) yearlyTxns.push(tx);
  });

  let filteredTxns =
    selected === "Weekly"
      ? weeklyTxns
      : selected === "Monthly"
      ? monthlyTxns
      : yearlyTxns;

  let incomeTotal = filteredTxns
    .filter((tx) => tx.typename === "Income")
    .reduce((sum, tx) => sum + Number(tx.Amount), 0);

  let expenseTotal = filteredTxns
    .filter((tx) => tx.typename === "Expense")
    .reduce((sum, tx) => sum + Number(tx.Amount), 0);

  const barData = [
    {
      value: incomeTotal,
      label: "Income",
      frontColor: "#4CAF50",
      labelWidth: 60,
      labelTextStyle: { color: "#bbb" },
    },
    {
      value: expenseTotal,
      label: "Expense",
      frontColor: "#FF5252",
      labelWidth: 60,
      labelTextStyle: { color: "#bbb" },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.HeadText}>Statistics</Text>

      {/* TABS */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelected(tab)}
            style={[styles.tabItem, selected === tab && styles.activeTabItem]}
          >
            <Text
              style={[styles.tabsText, selected === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CHART CARD */}
      <View style={styles.chartCard}>
        {barData.length ? (
          <BarChart
            data={barData}
            barWidth={45}
            spacing={40}
            xAxisThickness={0}
            yAxisThickness={0}
            noOfSections={4}
            maxValue={Math.max(incomeTotal, expenseTotal) + 20}
            yAxisTextStyle={{ color: "#bbb" }}
          />
        ) : (
          <Text style={styles.emptyText}>No data available</Text>
        )}
      </View>

      {/* TRANSACTIONS */}
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionText}>Transactions</Text>

        <FlatList
          data={filteredTxns}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <View>
                <Text style={styles.transactionCategory}>
                  {item.Category || "N/A"}
                </Text>
                <Text style={styles.transactionDate}>
                  {item.dateObj?.toLocaleDateString() || "No date"}
                </Text>
              </View>

              <Text
                style={[
                  styles.transactionAmount,
                  {
                    color:
                      item.typename === "Income" ? "#4CAF50" : "#FF5252",
                  },
                ]}
              >
                {item.typename === "Income" ? "+" : "-"}₹{item.Amount}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No transactions found</Text>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    alignItems: "center",
  },

  HeadText: {
    fontSize: 26,
    color: "#E3FFE8",
    marginTop: hp(4),
    fontWeight: "700",
    letterSpacing: 1,
  },

  tabs: {
    backgroundColor: "#1C1F1C",
    width: wp(90),
    flexDirection: "row",
    height: hp(5.5),
    borderRadius: 30,
    marginTop: hp(2.5),
    padding: 4,
  },

  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  activeTabItem: {
    backgroundColor: "#2E4333",
  },

  tabsText: {
    color: "#bbb",
    fontWeight: "600",
    fontSize: 14,
  },

  activeTabText: {
    color: "#E3FFE8",
    fontWeight: "700",
  },

  chartCard: {
    backgroundColor: "#161A16",
    width: wp(90),
    borderRadius: 18,
    paddingVertical: hp(2),
    marginTop: hp(3),
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1F281F",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  transactionContainer: {
    width: wp(90),
    marginTop: hp(3),
    flex: 1,
  },

  transactionText: {
    fontSize: 20,
    color: "#E3FFE8",
    fontWeight: "700",
    marginBottom: hp(2),
  },

  transactionCard: {
    backgroundColor: "#1A1F1A",
    padding: wp(4),
    borderRadius: 12,
    marginBottom: hp(1.5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#232A23",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  transactionCategory: {
    color: "#E3FFE8",
    fontSize: 16,
    fontWeight: "600",
  },

  transactionDate: {
    color: "#999",
    fontSize: 12,
    marginTop: 2,
  },

  transactionAmount: {
    fontSize: 18,
    fontWeight: "700",
  },

  emptyText: {
    color: "#777",
    fontSize: 16,
    textAlign: "center",
    marginVertical: hp(2),
  },
});

export default StatisticsScreen;
