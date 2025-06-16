import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { hp, wp } from "../../utils/Common";
import {BarChart} from "react-native-gifted-charts";

const StatisticsScreen = () => {
  const [selected, setSelected] = useState("Weekly");
  const tabs = ["Weekly", "Monthly", "Yearly"];

  const barData = [
        {
          value: 40,
          label: 'Jan',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 20, frontColor: '#ED6665'},
        {
          value: 50,
          label: 'Feb',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 40, frontColor: '#ED6665'},
        {
          value: 75,
          label: 'Mar',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 25, frontColor: '#ED6665'},
        {
          value: 30,
          label: 'Apr',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 20, frontColor: '#ED6665'},
        {
          value: 60,
          label: 'May',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 40, frontColor: '#ED6665'},
        {
          value: 65,
          label: 'Jun',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {value: 30, frontColor: '#ED6665'},
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
          barWidth={8}
          spacing={24}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{color: 'gray'}}
          noOfSections={3}
          maxValue={75}
  />) : (
    <View style={styles.noChart}></View>
  )}

</View>
<View style={styles.transactionConatiner}>
  <Text style={styles.transactionText}>Transactions</Text>
  <FlatList>

  </FlatList>
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
  transactionConatiner:{

  },
  transactionText:{
    fontSize: 20,
    color: "#edede9",
    marginTop:hp(2),
    letterSpacing: wp(0.3),
    fontWeight: "bold",
    marginLeft:wp(-42)

  }
});

export default StatisticsScreen;
