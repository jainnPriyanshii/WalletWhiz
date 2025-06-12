import { View, Text,Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const OnBoardScreen = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Text>OnBoardScreen</Text>
      <Button title='clickme' onPress={()=> navigation.navigate('Login')}> </Button>
    </View>
  )
}

export default OnBoardScreen