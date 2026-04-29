import { View, Text, Image } from 'react-native'
import React from 'react'
import {icons} from "@/constants/icons";
import * as Progress from 'react-native-progress';
// id: "blood_pressure",
//     icon: icons.bloodpressure,
//     name: "Blood Pressure",
//     value: "120/80",
//     unit: "mmHg",
//     status: "normal", // low | normal | high
//     goal: 0,
//     lastUpdated: "2026-04-21T08:30:00Z",
//     source: "manual", // apple_health | fitbit | samsung_health
//     status_type: "badge",
const UpcomingSubscriptionCard = ({icon, name, value, unit, status,goal,  lastUpdated, source, status_type}: Health_Status) => {
  const idealsleep = 8
  const idealwalk = 8000
  const idealcalorie = 1200

  const todayssleep = 6.5
  const todayswalk = 5000
  const todayscalorie = 700

  const clamp = (value: number) => Math.min(value, 1);
  const sleep_progress = clamp(todayssleep / idealsleep) 
  const walk_progress = clamp(todayswalk/idealwalk)
  const calorie_progress = clamp(todayscalorie / idealcalorie)

  // console.log(sleep_progress)
  // console.log(walk_progress)
  // console.log(calorie_progress)
  return (
    
    <View className="health-status-card">
        <Image source={icon} className="upcoming-icon"/>
        <Text className="upcoming-price">{name}</Text>


        {status_type === "badge" && (
          <View className="flex-row">
            <Text>{value}</Text>
            <Image source={icons.greencircle} className="status-badge-icon"/>
        </View>
        )}

        {
          name === "Sleep" && (
            <View className="flex-row">
              <Text>{value}</Text>
              <Progress.Bar 
                  progress={sleep_progress} 
                  width={80} height={5} 
                  animated={true} className="ml-5" 
                  color="#69e36a"
                  unfilledColor="#edf4f2"/>
          </View>
          )
        }
        

        {name === "Steps" && (
          <View className="flex-row justify-start">
            <Text >{value}</Text>
            <Progress.Bar 
                progress={walk_progress} 
                width={80} height={5} 
                animated={true} 
                className="ml-5"
                color="#c0e71a"
                unfilledColor="#edf4f2"/>
        </View>
        )}

         {name === "Calories" && (
          <View className="flex-row">
            <Text>{value}</Text>
            <Progress.Bar progress={calorie_progress} 
                  width={80} height={5} 
                  animated={true} 
                  className="ml-5"
                  color="#d71e0d"
                  unfilledColor="#edf4f2"/>
        </View>
        )}



        
    </View>
  )
}

export default UpcomingSubscriptionCard