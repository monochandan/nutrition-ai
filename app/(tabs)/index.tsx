import { Image, View, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import dayjs from "dayjs";
import {Link} from 'expo-router';
import {camera} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {useState} from "react";
import {icons} from "@/constants/icons";
// import folder from "@/constants/icons";

import images from "@/constants/images";
import {HOME_USER, calorie_count, HEALTH_STATS, UPCOMING_SUBSCRIPTIONS, HOME_SUBSCRIPTIONS, MEAL_PLANS} from "@/constants/data";
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";

import ListHeading from "@/components/ListHeading"
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard"

import {AnimatedCircularProgress} from 'react-native-circular-progress';
import SubscriptionCard from '@/components/SubscriptionCard';


const SafeAreaView = styled(RNSafeAreaView);

const index = () => {

    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

    // const completed = 700;
    // const total = 1200;
    const currentDate = new Date();
    //const localDate = currentDate.toLocaleDateString()
    // console.log(localDate)

    const percentage = (calorie_count.completed / calorie_count.total) * 100;
    // useState <any>([]);
    const [selectedImage, setSelectedImage] = useState<any>([]);

    // const pickImageAsync = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ["images"],
    //         allowMultipleSelection: false,
    //         selectionLimit: 1,
    //         quality: 1,
    //         allowsEditing: true,
    //     });

    //     if (!result.canceled) {
    //         const uris = result.assets.map((assets) => assets.uri);

    //         setSelectedImage((prev: any) => [...prev, ...uris]);
    //     }
    //     else{
    //         alert("You did not select any image.");
    //     }
    // };




    const clickImageAsync = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            allowMultipleSelection: false,
            selectionLimit: 1,
            quality: 1,
            allowsEditing: true,
        });

        if (!result.canceled) {
            const uris = result.assets.map((assets) => assets.uri);

            setSelectedImage(() => [...uris]);
        }
        else{
            alert("You did not select any image.");
        }
    };


    console.log("Selected Images:", selectedImage);

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
                    <FlatList
                        ListHeaderComponent={() =>
                            <>

                                <View className="home-header">
                                        <View className="home-user">
                                                <Image source={images.my_avatar} className="home-avatar"/>
                                                <Text className="home-user-name">{dayjs(currentDate).format('MM/DD')}</Text>
                                        </View>

                                        <View className="flex-row item-center gap-5">
                                            <Image source={icons.add} className="home-add-icon"/>
                                            <Image source={icons.imgscan} className="home-imscanner-icon"/>
                                        </View>  
                                        
                                 </View>


                                <View className="home-daily-intake-card flex-row">
                                    <View className="flex-1 gap-5 mr-2 justify-between">
                                        <Text className="home-date-label">Calories today: {calorie_count.total}</Text>                                        

                                            <View className="flex-row justify-center gap-1">
        
                                                <AnimatedCircularProgress 
                                                        size={70} 
                                                        width={7}
                                                        fill={percentage}
                                                        tintColor="#82c5e4"
                                                        onAnimationComplete= {() => console.log('finished today calorie bar')}
                                                        backgroundColor="#edeef0"
                                                    >
                                                        {
                                                            () => (
                                                            <Text>fat</Text>
                                                            )
                                                        }
                                                </AnimatedCircularProgress>

                                                <AnimatedCircularProgress 
                                                    size={70} 
                                                    width={7}
                                                    fill={percentage}
                                                    tintColor="#a4f41a"
                                                    onAnimationComplete= {() => console.log('finished today calorie bar')}
                                                    backgroundColor="#f4f7f9"
                                                >
                                                    {
                                                        () => (
                                                        <Text>carb</Text>
                                                        )
                                                    }
                                                </AnimatedCircularProgress>

                                                <AnimatedCircularProgress 
                                                        size={70} 
                                                        width={7}
                                                        fill={percentage}
                                                        tintColor="#ae23c0"
                                                        onAnimationComplete= {() => console.log('finished today calorie bar')}
                                                        backgroundColor="#eff3f8"
                                                    >
                                                        {
                                                            () => (
                                                            <Text>protien</Text>
                                                            )
                                                        }
                                                </AnimatedCircularProgress>

                                        </View>
                                    </View>
                                    
                                            <AnimatedCircularProgress 
                                                    size={150} 
                                                    width={15}
                                                    fill={percentage}
                                                    tintColor="#00e0ff"
                                                    onAnimationComplete= {() => console.log('finished today calorie bar')}
                                                    backgroundColor="#f5f5f5"
                                                >
                                                    {
                                                        () => (
                                                        <Text>{ calorie_count?.completed } Cal.</Text>
                                                        )
                                                    }
                                            </AnimatedCircularProgress>
                                            
                                </View>  

                                <View className="mb-5">
                                    <ListHeading title="Current Health Status" route="/analysis/healthStatus"/>
                                   

                                    <FlatList
                                        data={HEALTH_STATS}
                                        renderItem={({ item }) => (
                                            <UpcomingSubscriptionCard  {...item }/>
                                            
                                        )}
                                        keyExtractor={(item) => item.id}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        ListEmptyComponent={<Text className="home-empty-state">Not registered.</Text>}

                                    />
                                    
                                </View>

                                <ListHeading title="Today's Meal Plan" route="/analysis/mealPlan"/>

                            
                            </>
                        }

                        data={MEAL_PLANS}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <SubscriptionCard 
                                { ...item}
                                expanded={expandedSubscriptionId === item.id}
                                onPress={() => setExpandedSubscriptionId((currentId) =>(currentId === item.id? null : item.id))}
                            />
                        )}
                        extraData={expandedSubscriptionId}
                        ItemSeparatorComponent={() => <View className="h-4"/>}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<Text className="home-empty-state">No meal plan yet.</Text>}
                        contentContainerClassName="pb-30"
                        contentContainer="pb-30"
                    />
        

    </SafeAreaView>
    
  )
}

export default index