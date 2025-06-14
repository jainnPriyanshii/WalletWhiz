import { View, Text,Button,StyleSheet,SafeAreaView,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {hp,wp} from "../../utils/Common"
const OnBoardScreen = () => {
    const navigation = useNavigation();
    const onPress= ()=> navigation.navigate('Login')
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Headtext}>Welcome To WalletWhiz</Text>
      <Image style = {styles.onboardimage} source={require('../../assets/Onboardimage.jpg')}/>
      <Text style={styles.DownText}>“Know Where Your Money Goes.”</Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttontext}>Get Started</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: '#192019',
    justifyContent:'center',
    alignItems:'center',
  },

  onboardimage:{
    height:hp(40),
    width:wp(95),
    marginTop:hp(8),
    marginBottom:hp(8),
  },

  Headtext:{
    fontSize:30,
    color:'#87C184',
    fontWeight:'bold',
    marginTop:hp()
   
  },

  DownText:{
    fontSize:22,
    color:'#87C184',
    marginTop:hp(8)
  },
  button:{
    height:hp(5),
    width:wp(60),
    backgroundColor:'#415B48',
    borderRadius:10,
    marginTop:hp(0.5)
  },

  buttontext:{
 color:'#fff',
  textAlign:'center',
  paddingTop:hp(0.6),
  fontWeight:'bold',
  fontSize:18,
  }

})



export default OnBoardScreen;