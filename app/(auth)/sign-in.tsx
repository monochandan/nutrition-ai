import { View, Text, TextInput, Button, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import CustomeInput from '@/components/CustomInput';

const SignIn = () => {
  return (
      <View style={styles.container}>

          <Text style={styles.title}>Sign In</Text>

          <CustomeInput placeholder="Email" 
                        // style={styles.input} 
                        autoFocus
                        autoCapitalize={'none'} 
                        keyboardType={'email-address'}
                        autoCorrect={false}/>

          <CustomeInput  placeholder="Password" 
                         secureTextEntry={true}
                         />
          
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