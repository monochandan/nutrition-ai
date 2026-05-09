import { ActivityIndicator, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type LoadingScreenProps = {
  text?: string;
  color?: string;
}

export default function LoadingScreen({ text = "Loading...", color = "#4CAF50" }: LoadingScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={color} />
      <Text style={styles.text}>{text}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff9e3",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#555",
  },
})
