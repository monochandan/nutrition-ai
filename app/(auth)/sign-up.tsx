import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SignUp</Text>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#fff9e3",
  }
});

export default SignUp