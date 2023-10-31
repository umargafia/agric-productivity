import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CropInfoScreen from './src/screens/CropInfoScreen';
import WeatherForecastScreen from './src/screens/WeatherForecastScreen';
import MarketPriceScreen from './src/screens/MarketPriceScreen';
import { Theme } from './src/constants/Theme';
import MyIcon from './src/components/MyIcon';
import Search from './src/screens/Search';
import Profile from './src/screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const theme = Theme();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MyIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MyIcon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MyIcon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: theme.palette.primary,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{
            title: 'Agric Productivity App',
          }}
        />

        <Stack.Screen
          name="Crop Info"
          component={CropInfoScreen}
          options={{ title: 'Crop Information', headerShown: false }}
        />

        <Stack.Screen
          name="Market Price"
          component={MarketPriceScreen}
          options={{ title: 'Market Price' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
