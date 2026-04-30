import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";
// import { useClerk } from '@clerk/expo';
import { useAuth, useUser } from '@clerk/expo';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';


const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {

  // const {isSignedIn, session, user}
   

  const { isSignedIn, sessionId, signOut } = useAuth();
  const { user } = useUser();

  const router = useRouter();

  // useEffect(() => {
  //     console.log("Auth:", isSignedIn);
  //     console.log("Session:",sessionId);
  //     console.log("User:",user);
  //     console.log("User Id:", user?.id);
  //     console.log("User email:", user?.primaryEmailAddress?.emailAddress);
  //     console.log("Image Url", user?.imageUrl);
  //     console.log("Created at: ", user?.createdAt);
  //   }, [isSignedIn, sessionId, user]);

  
  const presSignOut = async () => {

    if(isSignedIn){
      await signOut()
      router.replace("/(auth)/sign-in");
      //console.log("Signed In");
    }


    

  }
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <CustomButton text="Sign Out" onPress={
        presSignOut}/>

      <CustomButton text="onBoarding" onPress={() => {
        router.push("/onboarding")
      }}/>
    </SafeAreaView>
  )
}

export default Settings