import { View, Text, TextInput, Button, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const SignIn = () => {
  return (
      <View style={styles.container}>

          <Text style={styles.title}>Sign In</Text>

          <TextInput 
              placeholder='Email' 
              style={styles.input}/>

          <TextInput 
              placeholder='Password' 
              style={styles.input} 
              secureTextEntry={true}/>
          
          <Pressable onPress={() => {console.log('pressed')}} style={styles.button}>
            <Text style={styles.buttontext}>Sign In</Text>
          </Pressable>

          <Link href='/sign-up' style={styles.link}>Do not have an account? Sign Up</Link>

      </View>

    )
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: "#fff9e3",
      padding: 20,
      gap: 10,
    },
    title:{
      fontSize: 24, 
      fontWeight: '600',
    },
    input:{
      width: 300,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: '#ccc',
    },
    button:{
      padding: 10,
      backgroundColor:'#4353FD',
      margin: 20,
      width: 300,
      borderRadius: 10,
      alignItems: 'center',

    },
    buttontext:{
      color:'white',
      fontSize:16,
      fontWeight:'600',
    },
    link:{
    color:"#4353FD",
    fontWeight:'600',
    }
  });

export default SignIn