import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const NewTransaction = () => {
  return (
    <View style={styles.container}>
      <Text>NewTransaction</Text>
    </View>
  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#192019",

    alignItems: "center",
  },
  
})

export default NewTransaction