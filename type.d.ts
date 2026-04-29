import type { ImageSourcePropType } from "react-native";

declare global {
    interface AppTab {
        name: string;
        title: string;
        icon: ImageSourcePropType;
    }

    interface TabIconProps {
        focused: boolean;
        icon: ImageSourcePropType;
    }

    interface Subscription {
        id: string;
        icon: ImageSourcePropType;
        name: string;
        plan?: string;
        category?: string;
        paymentMethod?: string;
        status?: string;
        startDate?: string;
        price: number;
        currency?: string;
        billing: string;
        renewalDate?: string;
        color?: string;
    }

    interface SubscriptionCardProps extends Omit<Subscription, "id"> {
        expanded: boolean;
        onPress: () => void;
        onCancelPress?: () => void;
        isCancelling?: boolean;
    }

    interface UpcomingSubscription {
        id: string;
        icon: ImageSourcePropType;
        name: string;
        price: number;
        currency?: string;
        daysLeft: number;
    }

    interface UpcomingSubscriptionCardProps
        extends Omit<UpcomingSubscription, "id"> {}


    interface Health_Status {
        id: string;
        icon: ImageSourcePropType;
        name: string;
        value: string | number;
        unit: string,
        status: string,
        goal: number,
        lastUpdated: string,
        source: string,
        status_type: string,
        color?: string;
    }

    // interface Meal{
    //     name: string,
    //     calories: number,
    //     protein: number,
    //     carbs: number,
    //     fats: number,
    //     other_nutriants?: string
    // }

    

    interface Meal_Plan {
        date: string,
        day: string,
        id: string,
       type: string,
       time: string,
       name: string,
       calories: number,
       protein: number,
       carbs: number,
       fats: number,
       other_nutrients: string,
       status: string,
       color: string,
       expanded: boolean,
       onPress: () => void,
    }

    interface HealthStatusProps
        extends Omit<Health_Status, "id"> {}

    interface ListHeadingProps {
        title: string;
    }


    
}

export {};