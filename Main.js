import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';

import HomeScreen from './src/screens/HomeScreen';
import CropInfoScreen from './src/screens/CropInfoScreen';
import MarketPriceScreen from './src/screens/MarketPriceScreen';
import { Theme } from './src/constants/Theme';
import MyIcon from './src/components/MyIcon';
import Search from './src/screens/Search';
import Profile from './src/screens/Profile';
import Auth from './src/screens/Auth';
import EditPage from './src/screens/EditPage';
import AddScreen from './src/screens/AddScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const theme = Theme();

function MyTabs() {
  const { user } = useSelector((state) => state.globalState);

  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: theme.palette.primary,
        tabBarActiveTintColor: theme.palette.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Agric Productivity App',
          tabBarIcon: ({ color, size }) => (
            <MyIcon name="home" color={color} size={size} />
          ),
        }}
      />
      {user?.role === 'admin' && (
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            title: 'Add Crop',
            tabBarIcon: ({ color, size }) => (
              <MyIcon name="add" color={color} size={size} />
            ),
          }}
        />
      )}
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

export default function Main() {
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
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Crop Info"
          component={CropInfoScreen}
          options={{ title: 'Crop Information' }}
        />

        <Stack.Screen
          name="Market Price"
          component={MarketPriceScreen}
          options={{ title: 'Market Price' }}
        />
        <Stack.Screen name="Edit Page" component={EditPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
