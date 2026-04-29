import { View, Text, Image, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Redirect, useRouter} from 'expo-router';
import { StyleSheet, Pressable } from 'react-native'
// import { supabase } from '@/utils/supabase';
// import Auth from './(auth)/auth';
// import Account from './(auth)/Account';
import {useAuth} from "@clerk/expo";
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';

import * as Progress from 'react-native-progress';

const App = () => {
  

   const step = 1
   const interval = 50 // after 50 ms
   const maxProgress = 200

   const [progressPercentage, setProgressPercentage] = useState(1);
   const [isActive, setIsActive] = useState(true);
   const router = useRouter();

   useEffect(() =>{

      // just in case, 
      if(!isActive || progressPercentage >=  maxProgress){
         return;
      }

      console.log(progressPercentage);
      const timer = setTimeout(() => {
            setProgressPercentage(progressPercentage + step);
      }, interval)

      return () => clearTimeout(timer);

   },[progressPercentage, isActive]);


   const{isSignedIn, signOut} = useAuth();
   console.log("From root index:", isSignedIn, signOut);

   if(progressPercentage >= maxProgress){
         return (
            <Redirect href="/(auth)/sign-in"/>
         )
   }
   return (
      <SafeAreaView style={styles.container}>
            <Image source={icons.logo} className='size-16 mt-0.5 mb-5'/>
            <Progress.Bar progress={progressPercentage/maxProgress} animated={true} width={200} className='mb-5'/>
            <Text>Redirecting to sign in .....</Text>
            <Pressable title='Sign up' style={styles.button} onPress={() => {
               setIsActive(false);
               router.push("/(auth)/sign-up");
            }} >
               <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
      </SafeAreaView>
   )

};


const styles = StyleSheet.create({

   container:{
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: "#fff9e3",
   },
   // logo:{
   //    width:,
   //    height: 64,
   //    // size:,
   //    marginTop:10,
   // }
   buttonText:{
    color:'white',
    fontSize:16,
    fontWeight:'600',
   },
   button:{
    position: 'absolute',
    bottom: 100,
    width: 300,
    borderRadius: 25,
    backgroundColor:'#4353FD',
    padding: 15,
    alignItems:'center',


   },

});

export default App;