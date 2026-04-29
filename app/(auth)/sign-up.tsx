import { Text, KeyboardAvoidingView, View, Alert, StyleSheet, Platform } from 'react-native'
//import React, {useState} from 'react'

import { useRouter, Link } from 'expo-router';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { useForm } from 'react-hook-form';

import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import { isClerkAPIResponseError, useAuth, useSignUp } from '@clerk/expo';
// import { useRoute } from 'expo-router';

// schema validation, data should be strictly like this....
const signUpSchema = z.object({
  email: z.string({message:"Email is required"}).email("Email is invalid"),
  password: z.string({message: "Password is required"}).min(8, "Password should be at least 8 characters long."),
})

type SignUpFields = z.infer<typeof signUpSchema>;

const mapClerkErrorToFormField = (error: any) => {
  switch (error.meta?.paramName) {
    case 'email_address':
      return 'email';
    case 'password':
      return 'password';
    default:
      return 'root';
  }
};

const SignUp = () => {


  const {control, handleSubmit, setError, formState: {errors}} = useForm<SignUpFields>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        // email : '',
        // password: '123456'
      }
    });
    
    
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();

  // const [email, setEmail] = useState();
  const{isLoaded} = useAuth();
  const{signUp} = useSignUp();
  const route = useRouter();
  
    
  const onSignUp  = async (data: SignUpFields) => {
    console.log("After submitting data from controller in sign up:",data);

    if(!isLoaded) return;

    try{
      const res = await signUp.create({
        emailAddress: data.email,
        password: data.password
      });

      console.log("SignuP status:", signUp.status);
      console.log("Sign Up error: ", res.error);

      if(res.error){
        setError("email", {message: "Email already exist or week password!"});
      }
      else{
        await signUp.verifications.sendEmailCode();
        Alert.alert("check your email and verify with the 6 digit code!");
        route.push("/verify");
      }

    }catch(error: any){
      console.log("Error from Sign In catch: ", JSON.stringify(error, null, 2));

      if(isClerkAPIResponseError(error)){
        error.errors.forEach((error) =>{
          const fieldName = mapClerkErrorToFormField(error);

          setError(fieldName, {message: error.longMessage})
        })
      }
    }


  }

  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

          <Text style={styles.title}>Create Account</Text>

          
          <View style={styles.form}>

            <CustomInput placeholder="Email" 
              // style={styles.input} 
              name='email'
              control={control}
              autoFocus
              autoCapitalize={'none'} 
              keyboardType={'email-address'}
              autoCorrect={false}
            
            />
            

            <CustomInput
                        name='password'
                        control={control}
                        placeholder="Password" 
                        secureTextEntry={true}
            />

            {errors.root && (
                <Text style={{color: 'crimson'}}>{errors.root.message}</Text>
            )}
          
            
          </View>

          <CustomButton text="Sign Up" onPress={handleSubmit(onSignUp)}/>

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