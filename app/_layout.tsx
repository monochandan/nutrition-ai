import { Stack, SplashScreen } from "expo-router";
import "@/global.css"
import {useFonts} from 'expo-font';
import React, {useEffect, useState} from "react";

import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import { Slot } from 'expo-router';
import axios from "axios";
import { StripeProvider } from '@stripe/stripe-react-native';



export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  const[stripePublishableKey, setStripePublishableKey] = useState('');

  if (!publishableKey) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

   const [fontLoad] = useFonts({
    // fonts
    "sans-regular": require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    "sans-bold": require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    "sans-extrabold": require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    "sans-light": require('../assets/fonts/PlusJakartaSans-Light.ttf'),
    "sans-medium": require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    "sans-semibold": require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    

   })

  const fetchStripePublishableKey = async () => {
    const response = await axios("https://sustainer-sufferer-dormitory.ngrok-free.dev/api/paywall/fetchPublishableKey")
    if(response){
      setStripePublishableKey(response.data.key)
    }
   }

  useEffect(() => {

    fetchStripePublishableKey()

   },[])

  // console.log("Stripe key: ", stripePublishableKey);

  useEffect(() =>{
    // if font is loaded, hide the splash screen and continue to the app
    if (fontLoad) {
       SplashScreen.hideAsync();
    }
  
  },[fontLoad]);

  // if not loaded
  if(!fontLoad) return null;

  return(
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <StripeProvider publishableKey={stripePublishableKey}>  

          <Stack screenOptions={{ headerShown: false}}/>

        </StripeProvider>
       
    </ClerkProvider>

  )
}
