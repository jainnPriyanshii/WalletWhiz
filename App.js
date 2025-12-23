import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardScreen from "./Components/Screens/OnBoardScreen";
import LoginScreen from "./Components/Screens/LoginScreen";
import RegisterScreen from "./Components/Screens/RegisterScreen";
import MyTabs from "../WalletWhiz/BottomTabs/BottomTabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../WalletWhiz/WalletWhiz/firebaseConfig";
import { AuthProvider } from "./Context/AuthContext";
import { getWallets } from "./utils/WalletUtils";
import SelectWalletScreen from "./Components/Screens/SelectWalletScreen";
import WalletScreen from "./Components/Screens/WalletScreen";
import AddWallet from "./Components/Screens/SubScreens/AddWallet";
import {SelectedWalletContext, SelectedWalletProvider} from "./Context/SelectedWalletContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (authUser) => {
  //     setUser(authUser);

  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  const Checkauthstate = () => {
    const Unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setInitialRoute("Onboard");
        setLoading(false);
      } else {
        // CheckWallets(currentUser?.uid);
        (async () => {
    await CheckWallets(currentUser?.uid);
  })();
      }
    });

    return Unsubscribe;
  };

  const CheckWallets = async (uid) => {
    
    try {
      const wallets = await getWallets(uid);
      console.log("Wallets fetched:", wallets);
      if (wallets == null || wallets.length === 0) {
        setInitialRoute("Wallet");
      } else {
        setInitialRoute("SelectWallet");
      }
    } catch {
      console.error("Error fetching wallets", error);
      setInitialRoute("Wallet");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const Unsubscribe = Checkauthstate();
    return Unsubscribe;
  }, []);

  if (loading) {
    return null;
  }

  // return (
  //   <AuthProvider>
  //     <NavigationContainer>
  //       {/* <Stack.Navigator screenOptions={{ headerShown: false }}> */}
  //       {/* {user ? (
  //         <Stack.Screen name="WalletWhizHome" component={MyTabs} />
  //       ) : (
  //         <>
  //           <Stack.Screen name="Onboard" component={OnBoardScreen} />
  //           <Stack.Screen name="Login" component={LoginScreen} />
  //           <Stack.Screen name="Register" component={RegisterScreen} />
  //         </>
  //       )}
  //     </Stack.Navigator> */}
  //       {initialRoute ? (
  //         <Stack.Navigator
  //           initialRouteName={initialRoute}
  //           screenOptions={{ headerShown: false }}
  //         >
  //           <Stack.Screen name="Onboard" component={OnBoardScreen} />
  //           <Stack.Screen name="Login" component={LoginScreen} />
  //           <Stack.Screen name="Register" component={RegisterScreen} />
  //           <Stack.Screen name="SelectWallet" component={SelectWalletScreen} />
  //           <Stack.Screen name="Wallet" component={WalletScreen} />
  //           <Stack.Screen name="AddWallet" component={AddWallet}/>
  //           <Stack.Screen name="WalletWhizHome" component={MyTabs} />
  //         </Stack.Navigator>
  //       ) : (
  //         <Stack.Navigator screenOptions={{ headerShown: false }}>
  //           <Stack.Screen name="Onboard" component={OnBoardScreen} />
  //         </Stack.Navigator>
  //       )}
  //     </NavigationContainer>
  //   </AuthProvider>
  // );
  return (
  <AuthProvider>
    <SelectedWalletProvider>
    <NavigationContainer>
      {initialRoute === "Onboard" && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboard" component={OnBoardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}

      {initialRoute === "Wallet" && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="AddWallet" component={AddWallet} />
        </Stack.Navigator>
      )}

      {initialRoute === "SelectWallet" && (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SelectWallet" component={SelectWalletScreen} />
          <Stack.Screen name="WalletWhizHome" component={MyTabs} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
   </SelectedWalletProvider>
  </AuthProvider>
);
}
