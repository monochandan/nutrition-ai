import { Stack, Redirect } from "expo-router";
import "@/global.css";
import {useAuth, useUser} from '@clerk/expo';

export default function AuthLayout() {
  const {isSignedIn, isLoaded} = useAuth();
  const {user} = useUser()

  if(!isLoaded){
    return null;
  }
  if(isSignedIn){
    // updated clerk metadata for this user in backend query.py (userAnswersStore), user.py (createUser()) 
    if(!user?.publicMetadata.onboarding_complete){
        return <Redirect href={'/onboarding'}/>
    }

    return (
      <Redirect href={'/(tabs)'}/>
    )
    
  }
  
  return <Stack screenOptions={{ headerShown: false }}/>;
}