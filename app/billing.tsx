import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Billing = () => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>Billing</Text>
    </KeyboardAvoidingView>
  )
}

export default Billing

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff9e3',
    }
})