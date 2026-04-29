import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
// import CustomeInput from '@/components/CustomInput'
// import CustomeButton from '@/components/CustomButton'
import { Link } from 'expo-router'
const SignUp = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Text>Sign Up</Text>
       <Link href='/sign-in' style={styles.link}>Do you want to Sign In?</Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#fff9e3",
  },
  link:{
    color:"#4353FD",
    fontWeight:'600',
    }
})

export default SignUp;