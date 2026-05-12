import { Image, View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator, Alert, Button } from 'react-native';
import React from 'react';
import dayjs from "dayjs";
// import {Link} from 'expo-router';
// import {camera} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {useState, useEffect} from "react";
import {icons} from "@/constants/icons";
// import folder from "@/constants/icons";

// import images from "@/constants/images";
// import {HOME_USER, calorie_count, HEALTH_STATS, UPCOMING_SUBSCRIPTIONS, HOME_SUBSCRIPTIONS, MEAL_PLANS} from "@/constants/data";
import {calorie_count, HEALTH_STATS,MEAL_PLANS} from "@/constants/data";
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";

import ListHeading from "@/components/ListHeading"
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard"

import {AnimatedCircularProgress} from 'react-native-circular-progress';
import SubscriptionCard from '@/components/SubscriptionCard';
import { useUser } from '@clerk/expo';

import {useRouter} from "expo-router";
import {CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import axios from 'axios';
import LoadingScreen from '@/components/LoadingScreen';
import AlertComponent from '@/components/AlertComponent';
// import AddPlan from '../analysis/add-plan';

const SafeAreaView = styled(RNSafeAreaView);

const Tabs = () => {

    const { user } = useUser();
    const router = useRouter();

    const [imageurl, setImageUlr] = useState<any>();
    const [emailaddress, setEmailAddress] = useState<any>();
    const [userid, setUserId] = useState<any>();
    const [imageSource, setImageSource] = useState<any>();
    const[loading, setLoading] = useState(true);
    //const [accessDenied, setAccessDenied] = useState(false);
    //const [activeAlert, setActiveAlert] = useState<'inactive_user'| 'no_subscription' | 'subscription_expired' | 'access_granted' | 'access_denied' | null>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const[permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        // every time the page load, user data will be fetchd and showd in the index page
        setImageUlr(user?.imageUrl);
        setEmailAddress(user?.primaryEmailAddress?.emailAddress);
        setUserId(user?.id);

        const params = new URLSearchParams()

        params.set("height", '64');
        params.set("width", '64');

        setImageSource(`${imageurl}?${params.toString()}`);

        setLoading(false)

        // console.log("url from index page", user?.imageUrl);
        // console.log("email address from index page:", user?.primaryEmailAddress?.emailAddress);
        // console.log("User Id from index page:", user?.id);
        // console.log("Image Source from index page:", imageSource);

    },[user?.imageUrl, user?.primaryEmailAddress?.emailAddress,user?.id, imageurl, imageSource]);



    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

    // const completed = 700;
    // const total = 1200;
    const currentDate = new Date();
    //const localDate = currentDate.toLocaleDateString()
    // console.log(localDate)

    const percentage = (calorie_count.completed / calorie_count.total) * 100;
    // useState <any>([]);
    // const [selectedImage, setSelectedImage] = useState<any>([]);

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

     if(loading){
    
        return (
                <LoadingScreen  text="Loading Home Screen..."/>
            )
    
      }

      const AddPlanManually = async () => {

        // check if the user is paid user or not
        const response = await axios.post("https://sustainer-sufferer-dormitory.ngrok-free.dev/api/auth/userPlan_checker",
            {
                clerk_id: userid
            }
        )


        if (response.data.message === "Inactive User" || response.data.message === "No Subscription" || response.data.message === "Subscription Expired") {
            Alert.alert("Subscription Required", "You need a plan", [
            { text: "Go Back", onPress: () => router.replace("/(tabs)") },
            { text: "Go to Billing", onPress: () => router.replace("/billing") },
            ]);
            return;
        }
        if(response.data.message === "Access Granted"){
            // setActiveAlert("access_granted")
            Alert.alert("The meal will automatically generate!", "You can change your preferences at any time.", [
            { text: "Go Back", onPress: () => router.replace("/(tabs)") },
            { text: "Go to settings", onPress: () => router.replace("/settings") },
            ]);
            return;
        }
        if(response.data.message === "Access Denied"){
            // setActiveAlert("access_denied")
             Alert.alert("Access denied", "Access denied", [
            { text: "Go Back", onPress: () => router.replace("/(tabs)") },
            // { text: "Go to Billing", onPress: () => router.replace("/billing") },
            ]);
            return;
        }


      }

     const ScanImage = () => {
        Alert.alert("Image Type", "What are you scanning?", [
            { text: "Grocery Items",  onPress: () => pickSource("grocery") },
            { text: "Shopping List",  onPress: () => pickSource("shopping_list") },
            { text: "Cancel", style: "cancel" },
        ]);
        };

        const pickSource = (imageType: string) => {
        Alert.alert("Select Source", "How do you want to add the image?", [
            { text: "Take Photo",        onPress: () => openCamera(imageType) },
            { text: "Choose from Gallery", onPress: () => openGallery(imageType) },
            { text: "Cancel", style: "cancel" },
        ]);
        };


    const openCamera = async (imageType: string) => {
    const result = await ImagePicker.launchCameraAsync({ quality: 1, allowsEditing: true });
    if (!result.canceled)
        router.push({ pathname: "/analysis/image-scanner", params: { imageUri: result.assets[0].uri, imageType, clerk_id: userid } });
    };

    const openGallery = async (imageType: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1, allowsEditing: true });
    if (!result.canceled)
        router.push({ pathname: "/analysis/image-scanner", params: { imageUri: result.assets[0].uri, imageType, clerk_id: userid } });
    };



    // const clickImageAsync = async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ["images"],
    //         allowMultipleSelection: false,
    //         selectionLimit: 1,
    //         quality: 1,
    //         allowsEditing: true,
    //     });

    //     if (!result.canceled) {
    //         const uris = result.assets.map((assets) => assets.uri);

    //         setSelectedImage(() => [...uris]);
    //     }
    //     else{
    //         alert("You did not select any image.");
    //     }
    // };


    // console.log("Selected Images:", selectedImage);

  return (
    <SafeAreaView className="flex-1 bg-background p-5">

        {/* {activeAlert === "inactive_user" && (
            <AlertComponent
                textHeader="You are not active yet!"
                textBody="Payment initiative required."
                cancleRouteText="Cancle"
                accessRouteText="Upgrade Plan"
                cancleRoute="/(tabs)"
                accesRoute="/billing"
            />
        )} */}

    

                    <FlatList
                        ListHeaderComponent={() =>
                            <>

                                <View className="home-header">
                                        <View className="home-user">
                                                <Image source={{uri: imageSource}} className="size-16 rounded-full"/>
                                                <View style={styles.user_info}>
                                                    {/* ml-4 text-xl font-sans-bold text-primary; */}
                                                        <Text className='font-sans-light ml-1'>{emailaddress?.split('@')[0] || emailaddress}</Text>
                                                        <Text className="font-sans-semibold ml-1">{dayjs(currentDate).format('MM/DD')}</Text>
                                                </View>
                                                
                                        </View>

                                        <View className="flex-row item-center gap-5">
                                            <Pressable onPress={() => AddPlanManually()}>
                                                    <Image source={icons.add} className="home-add-icon"/>
                                            </Pressable>

                                            <Pressable onPress={() => ScanImage()}>
                                                    <Image source={icons.imgscan} className="home-imscanner-icon"/>
                                            </Pressable>
                                            
                                            
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
                                                        onAnimationComplete= {() => console.log(`You have finished ${percentage}% of your fat goal for today!`)}
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
                                                    onAnimationComplete= {() => console.log(`You have finished ${percentage}% of your carb  goal for today!`)}
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
                                                        onAnimationComplete= {() => console.log(`You have finished ${percentage}% of your protein goal for today!`)}
                                                        backgroundColor="#eff3f8"
                                                    >
                                                        {
                                                            () => (
                                                            <Text>protein</Text>
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
                                                    onAnimationComplete= {() => console.log(`You have finished ${percentage}% of your calorie goal for today!`)}
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


const styles = StyleSheet.create({
    user_info:{
        
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff9e3',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#555',
    },
})

export default Tabs;