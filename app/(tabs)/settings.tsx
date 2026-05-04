import { View, Text, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";
// import { useClerk } from '@clerk/expo';
import { useAuth, useUser } from '@clerk/expo';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import axios from 'axios';


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




  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [questions, setQuestions] = useState([{}]) // data from the database
  const {getToken} = useAuth();

  
  const presSignOut = async () => {

    if(isSignedIn){
      await signOut()
      router.replace("/(auth)/sign-in");
      //console.log("Signed In");
    }
  }

  const goPayWall = () => {
    router.push("/billing")
  }


  const fetchQuestions = async () => {
    
          const token = await getToken()
    
          try{
    
              // call the api to fetch the questions from the database
              const response = await axios.post(
                "https://sustainer-sufferer-dormitory.ngrok-free.dev/api/userQuery/fetchOnboardingQuestions",
                {
                  // data
                  clerk_id : user?.id ?? " ",
                  email: user?.primaryEmailAddress?.emailAddress ?? '',
                  name: user?.firstName ?? '',
                  // plan: "free",
                  // isActive: false,
                  // onboarding_complete: false,
                },
                {
                  headers:{
                    Authorization: `Bearer ${token}`
                  }
                }
              )
        //       if (response.data.data) {
        // setQuestions(response.data)
        //   console.log('Questions:', data.data); // List of QuestionResponse
        // } else if (response.data.message) {
        //   console.log('Message:', data.message); // DefaultMessage
        // }
        console.log("Response from backend fetchQuestion(): ", JSON.stringify(response.data, null, 2));
        // if(response.data.data)
        //   console.log("Response from backend fetchQuestion(): ", response.data.data);
        // else
        //   console.log("Response from backend fetchQuestion(): ", response.data.message);  
    
    
        }catch(error : any){
              console.log("Error from useeffect to fetch the questions from database (catch): ", JSON.stringify(error, null, 2));
              //Alert.alert("From catch useEffect Onboarding",error);
            } finally {
              // set loading false
            }
    
    
        };
    
    // if(user) {
    //   const response = fetchQuestions()
    //   console.log("Response after fetching the data from backend fetchQuestions():", response)
    // }
        
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <CustomButton text="Sign Out" onPress={
        presSignOut}/>

      <CustomButton text="onBoarding" onPress={fetchQuestions}/>

      <CustomButton text="paywall" onPress={goPayWall}/>
    </SafeAreaView>
  )
}

export default Settings