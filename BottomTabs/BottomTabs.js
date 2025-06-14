import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Octicons } from "@expo/vector-icons";
import HomeScreen from "../../WalletWhiz/Components/Screens/HomeScreen";
import StatisticsScreen from "../../WalletWhiz/Components/Screens/StatisticsScreen";
import WalletScreen from "../../WalletWhiz/Components/Screens/WalletScreen";
import ProfileScreen from "../../WalletWhiz/Components/Screens/ProfileScreen";
// import {BlurView }from 'expo-blur'
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor:'#87C184',tabBarStyle:{
      backgroundColor:'#192019'
    }
      }}>
      <Tab.Screen
       name="home" 
       component={HomeScreen} 
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
    
      <Tab.Screen name="wallet" component={WalletScreen} 
      options={{
        title: "Wallet",
          tabBarIcon: ({ color }) => (
            <Octicons name="credit-card" size={28} color={color} />
          ),
          headerShown: false,
       }}
       />
      
      
      <Tab.Screen name="profile" component={ProfileScreen} 
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
