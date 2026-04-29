import { Text, KeyboardAvoidingView, View } from 'react-native'
import React, {useState} from 'react'


import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import CustomeInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { useForm } from 'react-hook-form';

import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod';

// schema validation, data should be strictly like this....
const signUpSchema = z.object({
  email: z.string({message:"Email is required"}).email("Email is invalid"),
  password: z.string({message: "Password is required"}).min(8, "Password should be at least 8 characters long."),
})

type SignUpFields = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const [email, setEmail] = useState();
  
    const {control, handleSubmit, formState: {errors}} = useForm({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        // email : '',
        // password: '123456'
      }
    }) 
    const onSubmit = (data: SignUpFields) => console.log("After submitting data from controller in sign up:",data);

  return (
      <KeyboardAvoidingView style={styles.container}>

          <Text style={styles.title}>Create Account</Text>

          
          <View style={styles.form}>

            <CustomeInput placeholder="Email" 
              // style={styles.input} 
              name='email'
              control={control}
              autoFocus
              autoCapitalize={'none'} 
              keyboardType={'email-address'}
              autoCorrect={false}
            
            />
            

            <CustomeInput
                        name='password'
                        control={control}
                        placeholder="Password" 
                        secureTextEntry={true}
            />
          
            
          </View>

          <CustomButton text="Sign Up" onPress={handleSubmit(onSubmit)}/>

          <Link href='/sign-in' style={styles.link}>Do you want to Sign In?</Link>

      </KeyboardAvoidingView>

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
    form:{
      gap: 5
    },
    title:{
      fontSize: 24, 
      fontWeight: '600',
    },
    link:{
    color:"#4353FD",
    fontWeight:'600',
    }
  });

export default SignUp