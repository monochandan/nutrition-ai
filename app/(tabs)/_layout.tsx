import { Stack, Tabs } from "expo-router";
import "@/global.css"
import {tabs} from "@/constants/data"
import clsx from "clsx"
import {View, Image} from "react-native"
import { colors, components } from '@/constants/theme'
import { useSafeAreaInsets } from "react-native-safe-area-context";


const tabBar = components.tabBar;

// component with 2 props
const TabIcon = ({focused, icon}: TabIconProps) => {
        return (
            <View className="tabs-icon">
                <View className={clsx('tabs-pill', focused && 'tabs-active')}>

                    <Image source={icon} resizeMode="contain" className="tab-glyph w-8 h-8"/>

                </View>
            </View>
        )
}

const TabLayout = () => {
    const insets = useSafeAreaInsets();
    

    return (
                <Tabs  screenOptions={{ headerShown: false,
                                        tabBarShowLabel:false,
                                        tabBarStyle: {
                                            backgroundColor:colors.primary,
                                            position:'absolute',
                                            bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                                            height: tabBar.height,
                                            marginHorizontal: tabBar.horizontalInset,
                                            borderRadius: tabBar.radius,
                                            // borderTopColor: '#0061FF1A',
                                            borderTopWidth: 0,
                                            elevation: 0,
                                            // minHeight: 70,
                                        },
                                        tabBarItemStyle:{
                                            paddingVertical: tabBar.height/2 - tabBar.iconFrame/1.6
                                        },
                                        tabBarIconStyle:{
                                                    width: tabBar.iconFrame,
                                                    height: tabBar.iconFrame,
                                                    alignItems: 'center',
                                                }


                        }}
                >
                    {tabs.map((tab) => (

                        <Tabs.Screen 
                            key={tab.name}
                            name={tab.name}
                            options={{ title: tab.title,
                                        tabBarLabel: () => null,
                                        tabBarIcon:({focused}) => (
                                            <TabIcon focused={focused} icon={tab.icon}/>
                                        )

                            }}
                        />
                    ))}
                </Tabs>
    )
    
}

export default TabLayout;