import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";

type AlertScreenProps = {
  textHeader?: string;
  textBody?: string;
  cancleRouteText?: string;
  accessRouteText?: string;
  cancleRoute?: Href;
  accesRoute?: Href;
}

export default function AlertComponent({textHeader, textBody,cancleRouteText, accessRouteText, cancleRoute, accesRoute}: AlertScreenProps){

                useFocusEffect(
                    useCallback(() => {

                         const run = async () => {
                                Alert.alert(
                                textHeader || "Subscription Required",
                                textBody,
                                [
                                    {
                                    text: cancleRouteText || "Go Back",
                                    onPress: () => router.replace(cancleRoute||"/(tabs)") // 👈 go back
                                    },
                                    {
                                    text: accessRouteText || "Go to Billing",
                                    onPress: () => router.replace(accesRoute||"/billing")
                                    }
                                ]
                                );
                      }
                      //setLoading(false)

                      run()

                    }, [])
                )
                  
            
    
return null
}
