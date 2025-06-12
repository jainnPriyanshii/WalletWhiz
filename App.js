import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoardScreen from "../WalletWhiz/Components/Screens/OnBoardScreen"
import LoginScreen from "../WalletWhiz/Components/Screens/LoginScreen"
import RegisterScreen from "../WalletWhiz/Components/Screens/RegisterScreen"
import MyTabs from "../WalletWhiz/BottomTabs/BottomTabs"
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App()  {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Onboard" component={OnBoardScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="WalletWhizHome" component={MyTabs} />


    </Stack.Navigator>
    </NavigationContainer>
  );
}



