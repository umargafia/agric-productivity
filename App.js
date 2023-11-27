import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CropInfoScreen from './src/screens/CropInfoScreen';
import { Theme } from './src/constants/Theme';

const Stack = createNativeStackNavigator();

const theme = Theme();
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
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Popular Crops in Nigeria',
          }}
        />
        <Stack.Screen
          name="Crop Info"
          component={CropInfoScreen}
          options={{ title: 'Crop Information', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
