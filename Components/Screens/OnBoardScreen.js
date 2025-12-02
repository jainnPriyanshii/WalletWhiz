import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from "../../utils/Common";
import { SafeAreaView } from 'react-native-safe-area-context';

const OnBoardScreen = () => {
  const navigation = useNavigation();
  const onPress = () => navigation.navigate('Login');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Headtext}>Welcome to WalletWhiz</Text>

      <View style={styles.imageCard}>
        <Image 
          style={styles.onboardimage} 
          source={require('../../assets/Onboardimage.jpg')}
        />
      </View>

      <Text style={styles.subText}>Your smart expense companion</Text>

      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttontext}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E0E',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },

  Headtext: {
    fontSize: 32,
    color: '#A8F0B0',
    fontWeight: '700',
    marginBottom: hp(4),
    letterSpacing: 0.5,
    alignItems:'center',
    marginLeft:wp(20)
  },

  imageCard: {
    width: wp(90),
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    padding: 10,
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: hp(5),
  },

  onboardimage: {
    height: hp(40),
    width: '100%',
    borderRadius: 12,
  },

  subText: {
    fontSize: 18,
    color: '#7FAD84',
    marginBottom: hp(4),
    fontWeight: '400',
  },

  button: {
    height: hp(6),
    width: wp(60),
    backgroundColor: '#2E4333',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  buttontext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default OnBoardScreen;
