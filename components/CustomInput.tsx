import { TextInput, StyleSheet, TextInputProps, Text, View } from "react-native"
import {Control, Controller,FieldValues, Path} from 'react-hook-form';

// to dynamically get the input props for different inputs
type CustomeInputProps = {

}& TextInputProps;

export default function CustomeInput(props: CustomeInputProps){
    return (
        <TextInput
            {...props}
            style={styles.input}
        />
    )

};

const styles = StyleSheet.create({
    input:{
      width: 300,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: '#ccc',
    },
});