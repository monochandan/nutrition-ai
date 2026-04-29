import { Pressable, Text, StyleSheet, PressableProps } from "react-native"

type CustomButtonProps = {

    text: string;

} & PressableProps 

export default function CustomeButton({text, ...pressableProps}: CustomButtonProps){

    return (
        <Pressable {...pressableProps} style={[styles.button]}>
                <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
  button:{
    borderRadius: 10,
    backgroundColor:'#4353FD',
    padding: 15,
    alignItems:'center',
  }
  ,
  buttonText:{
    color:'white',
    fontSize:16,
    fontWeight:'600',
  }
})