import { icons } from "./icons";

export const tabs: AppTab[] = [
    { name: "index", title: "Home", icon: icons.home },
    { name: "subscriptions", title: "Subscriptions", icon: icons.wallet },
    { name: "insights", title: "Insights", icon: icons.activity },
    { name: "settings", title: "Settings", icon: icons.setting },
];

export const HOME_USER = {
    name: "Mon Chandan",
};

export const calorie_count = {
    total: 1200,
    completed: 700,
};

export const HOME_BALANCE = {
    amount: 2489.48,
    nextRenewalDate: "2026-03-18T09:00:00.000Z",
};

export const UPCOMING_SUBSCRIPTIONS: UpcomingSubscription[] = [
    {
        id: "spotify",
        icon: icons.spotify,
        name: "Spotify",
        price: 5.99,
        currency: "USD",
        daysLeft: 2,
    },
    {
        id: "notion",
        icon: icons.notion,
        name: "Notion",
        price: 12.0,
        currency: "USD",
        daysLeft: 4,
    },
    {
        id: "figma",
        icon: icons.figma,
        name: "Figma",
        price: 15.0,
        currency: "USD",
        daysLeft: 6,
    },
];


export const HEALTH_STATS: Health_Status[] = [
  {
    id: "blood_pressure",
    icon: icons.bloodpressure,
    name: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "normal", // low | normal | high
    goal: 0,
    lastUpdated: "2026-04-21T08:30:00Z",
    source: "manual", // apple_health | fitbit | samsung_health
    status_type: "badge",
  },
  {
    id: "sleep",
    icon: icons.sleep,
    name: "Sleep",
    value: 7.5,
    unit: "hours",
    status: "good", // poor | average | good
    goal: 0,
    lastUpdated: "2026-04-21T07:00:00Z",
    source: "fitbit",
    status_type: "progress",
  },
  {
    id: "heart_rate",
    icon: icons.heartrate,
    name: "Heart Rate",
    value: 72,
    unit: "bpm",
    status: "normal",
    goal: 0,
    lastUpdated: "2026-04-21T09:00:00Z",
    source: "apple_health",
    status_type: "badge",
  },
  {
    id: "steps",
    icon: icons.walks,
    name: "Steps",
    value: 8500,
    unit: "steps",
    status: "active", // low | moderate | active
    goal: 10000,
    lastUpdated: "2026-04-21T07:00:00Z",
    source: "samsung_health",
    status_type: "progress",
  },
  {
    id: "calories",
    icon: icons.calories,
    name: "Calories",
    value: 1800,
    unit: "kcal",
    status: "on_track", // under | on_track | over
    goal: 2000,
    lastUpdated: "2026-04-21T07:00:00Z",
    source: "data",
    status_type: "progress",
  },
];

export const MEAL_PLANS: Meal_Plan[] = [
    {
      date: "2026-04-22",
      day: "Wednesday",
      id: "2026-04-22-breakfast",
      type: "breakfast",
      time: "08:00",

      name: "Scrambled Eggs with Avocado Toast",
      calories: 420,
      protein: 22,
      carbs: 35,
      fats: 22,

      other_nutrients: "Healthy fats, vitamin D",
      status: "pending", // pending | completed
      color: "#f5c542",
    },

    {
      date: "2026-04-22",
      day: "Wednesday",
      id: "2026-04-22-lunch",
      type: "lunch",
      time: "13:00",
      name: "Chicken Wrap with Fresh Vegetables",
      calories: 600,
      protein: 42,
      carbs: 55,
      fats: 20,

      other_nutrients: "Balanced macros",
      status: "pending",
      color: "#b8e8d0",
    },

    {
      date: "2026-04-22",
      day: "Wednesday",
      id: "2026-04-22-dinner",
      type: "dinner",
      time: "19:00",

      name: "Beef Stir Fry with Rice",
      calories: 650,
      protein: 45,
      carbs: 65,
      fats: 25,

      other_nutrients: "Iron rich, muscle recovery",
      status: "pending",
      color: "#e8def8",
    },

];

export const HOME_SUBSCRIPTIONS: Subscription[] = [
    {
        id: "adobe-creative-cloud",
        icon: icons.adobe,
        name: "Adobe Creative Cloud",
        plan: "Teams Plan",
        category: "Design",
        paymentMethod: "Visa ending in 8530",
        status: "active",
        startDate: "2025-03-20T10:00:00.000Z",
        price: 77.49,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-03-20T10:00:00.000Z",
        color: "#f5c542",
    },
    {
        id: "github-pro",
        icon: icons.github,
        name: "GitHub Pro",
        plan: "Developer",
        category: "Developer Tools",
        paymentMethod: "Mastercard ending in 2408",
        status: "active",
        startDate: "2024-11-24T10:00:00.000Z",
        price: 9.99,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-03-24T10:00:00.000Z",
        color: "#e8def8",
    },
    {
        id: "claude-pro",
        icon: icons.claude,
        name: "Claude Pro",
        plan: "Pro Plan",
        category: "AI Tools",
        paymentMethod: "Amex ending in 1010",
        status: "paused",
        startDate: "2025-06-27T10:00:00.000Z",
        price: 20.0,
        currency: "USD",
        billing: "Monthly",
        renewalDate: "2026-03-27T10:00:00.000Z",
        color: "#b8d4e3",
    },
    {
        id: "canva-pro",
        icon: icons.canva,
        name: "Canva Pro",
        plan: "Yearly Access",
        category: "Design",
        paymentMethod: "Visa ending in 7784",
        status: "cancelled",
        startDate: "2024-04-02T10:00:00.000Z",
        price: 119.99,
        currency: "USD",
        billing: "Yearly",
        renewalDate: "2026-04-02T10:00:00.000Z",
        color: "#b8e8d0",
    },
];