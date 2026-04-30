// import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import {Checkbox} from 'expo-checkbox';

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const questions = [
  {
    id: 1,
    question: "What is your primary health goal?",
    options: ["Lose Weight", "Gain Muscle", "Eat Healthier", "Manage a Condition", "Boost Energy"]
  },
  {
    id: 2,
    question: "How would you describe your current diet?",
    options: ["Omnivore", "Vegetarian", "Vegan", "Keto", "Gluten-Free", "No specific diet"]
  },
  {
    id: 3,
    question: "How active are you daily?",
    options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"]
  },
   
  {
    id: 4,
    question: "How many meals do you eat per day?",
    options: ["1-2 meals", "3 meals", "4-5 meals", "I skip meals often"]
  },
  {
    id: 5,
    question: "Do you have any food allergies?",
    options: ["Nuts", "Dairy", "Gluten", "Eggs", "Shellfish", "None"]
  },
  {
    id: 6,
    question: "How much water do you drink daily?",
    options: ["Less than 1L", "1-2L", "2-3L", "More than 3L"]
  },
  {
    id: 7,
    question: "How would you rate your sleep quality?",
    options: ["Poor", "Fair", "Good", "Excellent"]
  },
  {
    id: 8,
    question: "Do you track your calories?",
    options: ["Never", "Sometimes", "Most of the time", "Always"]
  },
  {
    id: 9,
    question: "What is your biggest challenge with nutrition?",
    options: ["Cravings", "Portion control", "Time to cook", "Budget", "Lack of knowledge"]
  },
  {
    id: 10,
    question: "How soon do you want to see results?",
    options: ["1 month", "3 months", "6 months", "I'm in no rush"]
  },
]

export default function OnBoarding() {
  // store selected answers: { questionId: [selectedOptions] }
  const [answers, setAnswers] = useState<Record<number, string[]>>({})

  const toggleOption = (questionId: number, option: string) => {
    setAnswers(prev => {
      const current = prev[questionId] ?? []
      const already = current.includes(option)
      return {
        ...prev,
        [questionId]: already
          ? current.filter(o => o !== option)  // deselect
          : [...current, option]                // select
      }
    })
  }

  const isSelected = (questionId: number, option: string) =>
    answers[questionId]?.includes(option) ?? false

  const submitOnBoarding = () => {
    console.log("Answers: ", answers)
    // send to backend
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        For better outcome from this system
      </Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {questions.map((q, index) => (
          <View key={q.id} style={styles.questionBlock}>

            {/* Question */}
            <Text style={styles.questionText}>
              {index + 1}. {q.question}
            </Text>

            {/* Options */}
            <View style={styles.optionsContainer}>
              {q.options.map(option => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    isSelected(q.id, option) && styles.optionSelected
                  ]}
                  onPress={() => toggleOption(q.id, option)}
                >
                  <Text style={[
                    styles.optionText,
                    isSelected(q.id, option) && styles.optionTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={submitOnBoarding}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff9e3",
  },
  header: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // each question block
  questionBlock: {
    marginBottom: 28,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },

  // options
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',       // wraps to next line if too many
    gap: 8,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  optionSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9',
  },
  optionText: {
    fontSize: 14,
    color: '#555',
  },
  optionTextSelected: {
    color: '#2e7d32',
    fontWeight: '600',
  },

  // submit
  submitButton: {
    margin: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})


const add = [

  {
    id: 3,
    question: "What is you age group?",
    options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"]
  },

    {
    id: 3,
    question: "What is your gender?",
    options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"]
  },

    {
    id: 3,
    question: "What is your height?",
    options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"]
  },

    {
    id: 3,
    question: "What is your weight?",
    options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"]
  },
 {
    id: 3,
    question: "What best describes your profession??",
    options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"]
  },

]


