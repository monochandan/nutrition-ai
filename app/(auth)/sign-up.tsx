import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import CustomeInput from '@/components/CustomInput'
import CustomeButton from '@/components/CustomButton'
import { Link } from 'expo-router'
const SignUp = () => {
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
            <Text style={styles.title}>Create an account</Text>

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

                    <CustomeInput
                        placeholder="Email" 
                        control={control}
                        name='email' // name: Path<T>; from customeInput
                        // onPress={onSignIn}
                        // value={email}
                        // onChangeText={setEmail}
                        autoFocus
                        autoCapitalize={'none'} 
                        keyboardType={'email-address'}
                        autoCorrect={false}
                        style={{borderColor:'red'}}
                />

                <CustomeInput placeholder="Password" 
                            control={control}
                            name="password"
                            // value={password}
                            // onChangeText={setPassword}
                            secureTextEntry={true}
                            style={{borderColor:'green'}}
                />

                {errors.root && (
                <Text style={{color: 'crimson'}}>{errors.root.message}</Text>
            )}

            </View>
            


            <CustomeButton 
                text="Sign Up"
                onPress={handleSubmit(onSignUp)}
            />
            <Link href='/sign-in' style={styles.link}>Sign In to your account</Link>
    
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop:5,
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

export default SignUp