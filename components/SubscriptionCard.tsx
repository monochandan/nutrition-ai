import { View, Text, Pressable, TouchableOpacity } from 'react-native';
// import {}
import React from 'react';
import { formatCurrency, formatSubscriptionDateTime } from '@/lib/utils';
import clsx from "clsx";
const SubscriptionCard = ({date, day, id, type, time, name, calories, protein, carbs, fats, other_nutrients, status,
    expanded, onPress, color
 }: Meal_Plan) => {
  return (
    <>
            <Pressable onPress={onPress} className={clsx('sub-card', expanded? 'sub-card-expanded' : 'bg-card')} style={!expanded && color ? {backgroundColor: color}: undefined}>
            <View className="sub-head">
                <View className="sub-main">

                        <View className="sub-copy">
                            <Text numberOfLine={1} className="sub-title">{type}</Text>

                        </View>
                </View>

                <View className="sub-price-box">
                        <Text className="sub-price">{day}</Text>
                        <Text className="sub-billing">{name}</Text>
                </View>
                </View>

                {
                    expanded && 
                    <View className="sub-body">
                        <View className="sub-details">
                            <View className="sub-row">
                                <View className="sub-row-copy">
                                        {/* <Text className="sub-label">payment:</Text> */}
                                        <Text className="sub-value">Calories: {calories}</Text>
                                        <Text className="sub-value">Carbs: {carbs}</Text>
                                        <Text className="sub-value">Fats: {fats}</Text>
                                        <Text className="sub-value">Protiens: {protein}</Text>
                                </View>
                            </View>
                        </View>

                        <View className="flex-row justify-between mt-10">
                            <TouchableOpacity className="list-action" onPress={() => console.log("pressed")}>
                                <Text className="list-action-text">Completed</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="list-action" onPress={() => console.log("pressed")}>
                                <Text className="list-action-text">Not Finished</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </Pressable>


        
    </>


     
  )
}

export default SubscriptionCard