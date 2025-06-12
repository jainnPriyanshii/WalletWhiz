import { View, Text,Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
     const navigation = useNavigation();
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title='clickme' onPress={()=> navigation.navigate('Register')}> </Button>
    </View>
  )
}

export default LoginScreen