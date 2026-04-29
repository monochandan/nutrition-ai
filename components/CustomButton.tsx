import { Pressable, Text, StyleSheet, PressableProps } from "react-native"

// to dynamically get the button props for different inputs
type CustomButtonProps = {

    text: string;

} & PressableProps 

export default function CustomButton({text, ...pressableProps}: CustomButtonProps){

    return (
        <Pressable {...pressableProps} style={[styles.button]}>
                <Text style={styles.buttontext}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
  button:{
      padding: 10,
      backgroundColor:'#4353FD',
      margin: 20,
      width: 300,
      borderRadius: 10,
      alignItems: 'center',

    },
    buttontext:{
      color:'white',
      fontSize:16,
      fontWeight:'600',
    },
    // buttonText:{

    // }
})