import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import CropInfoScreen from './src/screens/CropInfoScreen';
import WeatherForecastScreen from './src/screens/WeatherForecastScreen';
import MarketPriceScreen from './src/screens/MarketPriceScreen';
import { Theme } from './src/constants/Theme';

const Stack = createStackNavigator();
const theme = Theme();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Popular Crops in Nigeria',
            headerTintColor: theme.palette.primary,
          }}
        />
        <Stack.Screen
          name="Crop Info"
          component={CropInfoScreen}
          options={{ title: 'Crop Information' }}
        />
        <Stack.Screen
          name="Weather Forecast"
          component={WeatherForecastScreen}
          options={{ title: 'Weather Forecast' }}
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
