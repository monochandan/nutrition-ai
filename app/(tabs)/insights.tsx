import { View, Text, ActivityIndicator, Alert, StyleSheet, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";
import axios from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';
import { useUser } from '@clerk/expo';
import { BlurView } from 'expo-blur';


const SafeAreaView = styled(RNSafeAreaView);

 

const Insights = () => {
   const{user} = useUser()
   const router = useRouter()

  // const [clerkId, setClerkId] = useState('');
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)



  // const fetchClerkId = () =>{
  //     const clerk_id = user?.id
  //     if(clerk_id !== undefined)
  //     {
        
  //       setClerkId(clerk_id)
        
  //       //setLoading(false)
  //     }

  // }
  // console.log("Clerk id insights.tsx: ", clerkId)
  const checkAccess = async () => {
      const response = await axios.post("https://sustainer-sufferer-dormitory.ngrok-free.dev/api/auth/userPlan_checker",
            {
              clerk_id: user?.id
            }
      )
      console.log("Response: insights.tsx", response)
      // if(response){
      //   return response.data
      // }
      return response.data


    }

    useFocusEffect(
      useCallback(() => {

          const run = async () => {
          const response = await checkAccess()
          console.log("response in use effect insight.tsx: ", response)
          if (!response.accessGranted) {
            setAccessDenied(true)
            Alert.alert(
              "Subscription required",
              "You need a plan to access this feature",
              [
                {
                  text: "Cancel",
                  onPress: () => router.replace("/(tabs)") // 👈 go back
                },
                {
                  text: "Go to Billing",
                  onPress: () => router.replace("/billing")
                }
              ]
            );
          }
          setLoading(false)
      }

      run()

      },[])
    )



   

  if(loading){
      return(
        <SafeAreaView style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#4CAF50" />
                        <Text style={styles.loadingText}>Loading data...</Text>
                    </SafeAreaView>
      )
    }
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      {!accessDenied && (
        <Text>Access Accepted!</Text>
      )}

      {accessDenied && 
      (
        Platform.OS === 'ios' ? (
           <BlurView intensity={80} tint="dark" style={styles.blurOverlay} />
        ):
        (
          <View style={[styles.blurOverlay, { backgroundColor: 'rgba(0,0,0,0.7)' }]} />
        )
      )
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff9e3',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#555',
    },
   blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
}

})

export default Insights