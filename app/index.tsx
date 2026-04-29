import { View, Text,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Redirect} from 'expo-router'
import { StyleSheet } from 'react-native'
// import { supabase } from '@/utils/supabase';
// import Auth from './(auth)/auth';
// import Account from './(auth)/Account';
import {useAuth} from "@clerk/expo";
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants/icons';
const App = () => {
   // const [session, setSession] = useState(null);

   // useEffect(() => {
   //    const check = async () => {
   //       const {data} = await supabase.auth.getSession();
   //       console.log("session data: ", data.session)
   //       setSession(data.session)
   //    }
   //    check();
   // },[])

   // // if (session === null) return null;

   // return session ? <Redirect href="/(tabs)"/> : <Redirect href="/(auth)/auth"/>
   // check here if the user
      // const checkUser = async () => {
   // const { data } = await supabase.auth.getSession();

      //   if (data.session) {
      //     router.replace("/home");   // already logged in
      //   } else {
      //     router.replace("/sign-in"); // not logged in
      //   }
      // };
   // if (data.session){
   //    return <Redirect href="/(tabs)"/>
   // }
   // else{
   //    return <Redirect href="/(auth)/auth"/>
   // }
   // return <Redirect href="/(tabs)"/>
   const{isSignedIn, signOut} = useAuth();
   console.log("From root index:", isSignedIn, signOut);
   return (
      <SafeAreaView style={styles.container}>
            <Image source={icons.logo} className='size-16 mt-0.5 mb-3'/>
            <Text>Root Screen</Text>
      </SafeAreaView>
   )
}


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

});

export default App;