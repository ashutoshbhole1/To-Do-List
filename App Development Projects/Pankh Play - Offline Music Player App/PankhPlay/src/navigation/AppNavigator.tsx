import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useThemeStore } from '@/state/useThemeStore';

import HomeScreen from '@/features/Home/HomeScreen';
import SearchScreen from '@/features/Search/SearchScreen';
import FavoritesScreen from '@/features/Favorites/FavoritesScreen';
import ProfileScreen from '@/features/Profile/ProfileScreen';
import PlayerScreen from '@/features/Player/PlayerScreen';
import MiniPlayer from '@/components/MiniPlayer';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: Colors.background,
        card: Colors.surface,
        text: Colors.textPrimary,
    },
};

function TabNavigator() {
    const accentColor = useThemeStore((state) => state.accentColor);

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: Colors.surface,
                        borderTopWidth: 0,
                        elevation: 0, // for Android
                        shadowOpacity: 0, // for iOS
                        height: 70, // Slightly taller for the modern look
                        paddingBottom: 10,
                    },
                    tabBarActiveTintColor: accentColor,
                    tabBarInactiveTintColor: Colors.inactive,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: any = 'home';

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Search') {
                            iconName = focused ? 'search' : 'search-outline';
                        } else if (route.name === 'Favorites') {
                            iconName = focused ? 'heart' : 'heart-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        // Using vector icons for now, later we can add glow wrappers
                        return <Ionicons name={iconName} size={28} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Favorites" component={FavoritesScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>

            {/* Float the MiniPlayer above all tabs. Add a check here later if there is no current track */}
            <MiniPlayer />
        </>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer theme={MyDarkTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={TabNavigator} />
                <Stack.Screen
                    name="Player"
                    component={PlayerScreen}
                    options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
