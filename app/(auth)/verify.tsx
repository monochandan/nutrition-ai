import { Text, 
  // TextInput, 
  View, 
  // Button, 
  // Pressable, 
  Platform,
KeyboardAvoidingView, StyleSheet } from "react-native";


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
import { useClerk, useSignUp } from "@clerk/expo";
// import SignUp from "./sign-up";

// import * as Progress from 'react-native-progress';


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

  const {control, handleSubmit, formState: {errors}, } = useForm<VerifyFields>({
    defaultValues:{
      // email: 'abc@gmail.com',
    },  
    resolver:zodResolver(verifySchema),
  });

console.log("errors from verification page:",errors);

// const {signIn} = useAuth();
  // const {signIn} = useSignIn();
//   useEffect(() =>{
//     const timer = setTimeout(async () => {
//         //await signUp?.abandonSession;
//         router.replace('/sign-up');
//     }, 5000);
//     return () => clearTimeout(timer); // cleanup if user verifies in time
// },[])

  const onVerify = async ({code}: VerifyFields) => {

    try{
        await signUp.verifications.verifyEmailCode({
            code
        })

        // if(signUp.status === 'abandoned'){

        // }

        if(signUp.status === 'complete'){
            await signUp.finalize({
                navigate: ({session, decorateUrl}) => {
                        // setActive() → creates session 
                        // useAuth() → reads session
                        // when use first create the account
                        setActive({
                            session: session?.id
                        })
                        router.replace(decorateUrl("/(tabs)") as Href);
                }   
            })
        }
        else{
            console.log('verification failed!');
            console.log("signup attempt: ", signUp);
        }

    }catch(error){
        console.error(JSON.stringify(error, null, 2));
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
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
    margin: 50,
    borderRadius: 10,
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