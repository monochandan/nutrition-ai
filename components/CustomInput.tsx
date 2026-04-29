import { TextInput, StyleSheet, TextInputProps, Text, View } from "react-native"
import {Control, Controller,FieldValues, Path, useForm} from 'react-hook-form';

// to dynamically get the input props for different inputs
type CustomeInputProps = {
    control: any,
    name: string,

} & TextInputProps;

export default function CustomeInput({control, name, ...props}: CustomeInputProps){

     
    return (
        <>
            <Controller
                        name={name}
                        control={control}
                         //rules = {{ required: "This field is required!"}} , zod used....
                        render = {({
                        field: {value, onChange, onBlur} , fieldState:{error}}) => (
                            <View style={styles.container}>
                                <TextInput
                                    {...props}
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    style={styles.input}
                                />
                                <Text style={styles.error}>{error?.message}</Text>
                            </View>
                        )}
                        
            />
        
        </>

       
        
    );

}

const styles = StyleSheet.create({
    container:{
        gap: 4
    },
    error:{
        color:"crimson",
    },
    input:{
      width: 300,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: '#ccc',
    },
});