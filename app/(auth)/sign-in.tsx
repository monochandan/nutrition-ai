import { Text, KeyboardAvoidingView, View, Alert, StyleSheet, Platform } from 'react-native';
// import React, {useState} from 'react'


import { type Href, Link, router } from 'expo-router';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import { useForm } from 'react-hook-form';

import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import { isClerkAPIResponseError, useAuth, useClerk, useSignIn } from '@clerk/expo';

// schema validation, data should be strictly like this....
const signInSchema = z.object({
  email: z.string({message:"Email is required"}).email("Email is invalid"),
  password: z.string({message: "Password is required"}).min(8, "Password should be at least 8 characters long."),
})

// create a data type from schema, then we can pass the type in handlesubmit
type SignInFields =  z.infer<typeof signInSchema>;


const mapClerkErrorToFormField = (error: any) => {
    switch(error.meta?.paramName){
        case 'identifier':
            return 'email';
        case 'password':
            return 'password';
        default:
            return 'root';
    }
}


const SignIn = () => {

    const {control, handleSubmit, setError, formState: {errors}} = useForm<SignInFields>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
          // email : '',
          // password: '123456'
        }
      }) 

    console.log("Errors: ", JSON.stringify(errors, null, 2));
    
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();

    const {isLoaded} = useAuth();
    const {setActive} = useClerk(); // set teh current session https://clerk.com/docs/expo/reference/objects/clerk
    // const [email, setEmail] = useState();
    const{signIn} = useSignIn();
  
  





    const onSignIn = async (data: SignInFields) => {
      console.log("After submitting data from (Sign In )controller:",data);

      // if clerk is initilized or not
      if(!isLoaded) return;
      try{
        // sign in 
        await signIn.create({
          identifier: data.email,
          password: data.password,
        })

        if(signIn.status === 'complete'){
          await signIn.finalize({
            navigate:({session, decorateUrl}) =>  {
              setActive({
                session: session?.id
              })
              Alert.alert("Sign In Successfull");
              router.replace(decorateUrl("/(tabs)") as Href);
            }
          })
          
        }

        else{
          setError("root", {message: "Invalid credentials!"});
        }

      }catch(error: any){
          console.log("Errors from Sign In:", JSON.stringify(error, null, 2));

          if(isClerkAPIResponseError(error)){
              error.errors.forEach((error) => {
                const fieldName = mapClerkErrorToFormField(error) 
                setError(
                    //clerkErrorToFormField[error.meta?.paramName ?? 'identifier'],
                    fieldName,
                    //error.meta.paramName === 'identifier' ? 'email' : 'password',
                    {
                        message: error.longMessage
                    });
            });
            
        }
        else{
            setError('root', {message: 'Unknown Error!'});
        }
      }



    };

  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

          <Text style={styles.title}>Sign In</Text>

          
          <View style={styles.form}>

            <CustomInput placeholder="Email" 
              // style={styles.input} 
              name='email' // avaoid any name ... used <T extends FieldValues> (send dynamic type from above to below)
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

          <CustomButton text="Sign In" onPress={handleSubmit(onSignIn)}/>

          <Link href='/sign-up' style={styles.link}>Do not have an account? Sign Up</Link>

      </KeyboardAvoidingView>

    )
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: "#fff9e3",
      padding: 5,
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

export default SignIn