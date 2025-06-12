import { View, Text ,Button} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const RegisterScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>RegisterScreen</Text>
       <Button title='clickme' onPress={()=> navigation.navigate('WalletWhizHome')}> </Button>
    </View>
  )
}

export default RegisterScreen