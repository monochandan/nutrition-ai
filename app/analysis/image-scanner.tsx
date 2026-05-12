import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ImageScanner = () => {

  const {imageUri, imageType, clerk_id} = useLocalSearchParams();
  console.log("Params in ImageScanner.tsx: ", imageUri, imageType, clerk_id);
  return (
    <SafeAreaView style={styles.container}>
      <Text>ImageScanner</Text>
    </SafeAreaView>
  )
}

export default ImageScanner

const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff9e3', 
  }
})