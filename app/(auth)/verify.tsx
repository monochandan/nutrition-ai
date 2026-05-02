import { Text, 
  // TextInput, 
  View, 
  // Button, 
  // Pressable, 
  Platform,
KeyboardAvoidingView, StyleSheet, 
Alert} from "react-native";


import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
// import { useEffect, useState } from "react";
import {useForm, 
        // Controller
        // FieldValues,
      } from 'react-hook-form';

import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
// import { type Href, Link } from "expo-router";

// import {  useSignIn } from '@clerk/expo'
import {type Href, useRouter} from  'expo-router';
// import {useEffect} from 'react';
import { useClerk, useSignUp, useUser } from "@clerk/expo";
// import SignUp from "./sign-up";

// import * as Progress from 'react-native-progress';


import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// post to backend with this data
type userData =  {
  clerk_id: string,
  email: string,
  name: string,
  imageurl: string,
  plan: string,
  isActive: boolean,
  onboarding_complete: boolean,
}
// expected response
// type CreatePostResponse = userData & {id: number}

// verification of input schema, using zod
const verifySchema = z.object({
  code: z.string(
    {message:"code is required."})
    .length(6, 'Invalid Code'),

//   password: z.string(
//       {message:"password is required."})
//       .min(8, 'password should be atleast 8 characters long'),
});

type VerifyFields = z.infer<typeof verifySchema>;


 
export default function VerifyScreen() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const router = useRouter();
  const {signUp} = useSignUp();
  const {setActive} = useClerk();
  const {user} = useUser();

  // const [userId, setUserId] = useState()

  const {control, handleSubmit, formState: {errors}, } = useForm<VerifyFields>({
    defaultValues:{
      // email: 'abc@gmail.com',
    },  
    resolver:zodResolver(verifySchema),
  });

// console.log("errors from verification page:",errors);

// const {signIn} = useAuth();
  // const {signIn} = useSignIn();
//   useEffect(() =>{
//     const timer = setTimeout(async () => {
//         //await signUp?.abandonSession;
//         router.replace('/sign-up');
//     }, 5000);
//     return () => clearTimeout(timer); // cleanup if user verifies in time
// },[])

const userRegistrationSupabase = async (data: userData) => {

  try{

      const response = await axios.post(
      "https://sustainer-sufferer-dormitory.ngrok-free.dev/api/auth/createUser",
      data
    )
    return response.data;

  }catch(error: any){
    console.error("Error from axios response catch: ",error.response?.data || error.message);
    // throw error
    console.log("Error from axios response catch JOSN: ", JSON.stringify(error, null, 2));
  }

  
}

  const onVerify = async ({code}: VerifyFields) => {

    try{
        await signUp.verifications.verifyEmailCode({
            code
        })

        // if(signUp.status === 'abandoned'){

        // }

        if(signUp.status === 'complete'){
            await signUp.finalize({
                navigate: async ({session, decorateUrl}) => {
                        // setActive() → creates session 
                        // useAuth() → reads session
                        // when use first create the account
                        setActive({
                            session: session?.id
                        })
                         //https://sustainer-sufferer-dormitory.ngrok-free.dev
                        // call backend to add the user

                        const currentUser = session?.user
                        const name = currentUser?.primaryEmailAddress?.emailAddress.split('@')[0];
                        const newUser: userData = {
                          clerk_id: currentUser?.id ?? '',
                          email: currentUser?.primaryEmailAddress?.emailAddress ?? '',
                          name: name ?? '',
                          imageurl: currentUser?.imageUrl ?? '',
                          plan: "free",
                          isActive: false,
                          onboarding_complete: false,
                        }
                        console.log("New user:", newUser);
                        const response = await userRegistrationSupabase(newUser);
                        console.log("Response after getting the createUser in frontend: ", response);
                          //axios.
                        // check if the onboarding completed or not if not then router to onboarding page
                        if(response.message === "Success"){
                            Alert.alert('Welcome to healthy Journey!')
                            router.replace(decorateUrl("/(tabs)") as Href);
                        }
                        // else if(response.message === "Error"){
                        //   Alert.alert('Please Try again!')
                        //   router.replace(decorateUrl("/(auth)/sign-up") as Href);
                        // }
                        

                        
                }   
            })
        }
        else{
            // console.log('verification failed!');
            // console.log("signup attempt: ", signUp);
            Alert.alert("Verification Failed", "Try Again!")
            router.replace("/(auth)/sign-up")
        }

    }catch(error){
        console.error("Error from catch block in verify page: ",JSON.stringify(error, null, 2));
    }
  };

  // useEffect(() =>{
  //     setEmail('')
  //     setPassword('')
  // },[])

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
            <Text style={styles.title}>Verify your email</Text>

            {/* <TextInput placeholder="Email" 
                        style={styles.input} 
                        autoCapitalize={'none'} 
                        keyboardType={'email-address'}
                        autoCorrect={false}/> */}

            {/* <Controller name='email' control={control} render={({field: {value, onChange, onBlur}}) =>
                <TextInput placeholder="controller input" 
                        style={{backgroundColor: 'snow'}}
                        value = {value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                />
            }/> */}
            <View style={styles.form}>

                    <CustomInput
                        placeholder="code" 
                        control={control}
                        name='code' // name: Path<T>; from customeInput
                        // onPress={onSignIn}
                        // value={email}
                        // onChangeText={setEmail}
                        autoFocus
                        autoCapitalize={'none'} 
                        keyboardType={'number-pad'}
                        autoCorrect={false}
                        style={{borderColor:'red'}}
                        autoComplete="one-time-code"
                />


            </View>
            


            <CustomButton 
                text="Verify"
                onPress={handleSubmit(onVerify)}
            />


    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: "#fff9e3",
      padding: 20,
      gap: 10,
  }
  ,
  title:{
    fontSize: 24,
    fontWeight: '600',
  },
  form:{
    gap:2,
  },
  link:{
    color:"#4353FD",
    fontWeight:'600',
  }
  
})