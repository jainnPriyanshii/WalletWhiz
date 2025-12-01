import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Octicons } from "@expo/vector-icons";
import HomeScreen from "../../WalletWhiz/Components/Screens/HomeScreen";
import StatisticsScreen from "../../WalletWhiz/Components/Screens/StatisticsScreen";
import WalletScreen from "../../WalletWhiz/Components/Screens/WalletScreen";
import ProfileScreen from "../../WalletWhiz/Components/Screens/ProfileScreen";
import NewTransaction from "../../WalletWhiz/Components/Screens/SubScreens/NewTransaction";
import AddWallet from "../../WalletWhiz/Components/Screens/SubScreens/AddWallet";
import EditProfile from "../../WalletWhiz/Components/Screens/SubScreens/EditProfile";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SelectedWalletContext} from "../Context/SelectedWalletContext";




const Stack = createNativeStackNavigator();

function WalletStackScreen () {
  return(
     <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="AddWallet" component={AddWallet} />
      
      </Stack.Navigator>
  )

}

function ProfileStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}



function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="NewTransaction" component={NewTransaction} />
    </Stack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

// const MyTabs = () => {
  function MyTabs () {
    
    const { walletname } = React.useContext(SelectedWalletContext);

  return (
    
    <Tab.Navigator screenOptions={{tabBarActiveTintColor:'#87C184',tabBarStyle:{
      backgroundColor:'#192019'
    }
      }}>
      <Tab.Screen
       name="home" 
       component={HomeStackScreen} 
       options={{
        title: "Home",
          tabBarIcon: ({ color }) => (
            <Octicons name="home" size={28} color={color} />
          ),
          headerShown: false,
       }}
       />
      <Tab.Screen name="stats" component={StatisticsScreen} 
      options={{
        title: "Stats",
          tabBarIcon: ({ color }) => (
            <Octicons name="graph" size={28} color={color} />
          ),
          headerShown: false,
       }}
       />
    
      <Tab.Screen name="wallet" component={WalletStackScreen} 
      options={{
        title: "Wallet",
          tabBarIcon: ({ color }) => (
            <Octicons name="credit-card" size={28} color={color} />
          ),
          headerShown: false,
       }}
       />
      
      
      <Tab.Screen name="profile" component={ProfileStackScreen} 
       options={{
        title: "Profile",
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerShown: false,
       }}
       />
    </Tab.Navigator>
  );
};

export default MyTabs;
