import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnBoardScreen from "../WalletWhiz/Components/Screens/OnBoardScreen";
import LoginScreen from "../WalletWhiz/Components/Screens/LoginScreen";
import RegisterScreen from "../WalletWhiz/Components/Screens/RegisterScreen";
import MyTabs from "../WalletWhiz/BottomTabs/BottomTabs";

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../WalletWhiz/WalletWhiz/firebaseConfig'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null; // or splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="WalletWhizHome" component={MyTabs} />
        ) : (
          <>
            <Stack.Screen name="Onboard" component={OnBoardScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
