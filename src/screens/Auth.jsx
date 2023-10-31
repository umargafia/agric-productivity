import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '../constants/Theme';
import MyCard from '../components/MyCard';
import MyInput from '../components/MyInput';
import MyButton from '../components/Mybutton';
import Title from '../components/Title';

const users = [
  {
    name: 'Test User',
    email: 'test@gmail.com',
    password: '123456',
    id: 1,
    role: 'user',
  },
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: '123456',
    id: 2,
    role: 'admin',
  },
];

const theme = Theme();
export default function Auth() {
  const [isLogin, setLogin] = useState(true);
  const navigation = useNavigation();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signData, setSignData] = useState({ email: '', password: '' });

  function toggleSwitch() {
    setLogin((prev) => !prev);
  }

  const handleSubmit = () => {
    if (isLogin) {
      // Login logic
      if (!loginData.email || !loginData.password) {
        Alert.alert('Login Failed', 'Please fill in all fields.');
        return;
      }

      const user = users.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );
      if (user) {
        // Successful login, you can handle user authentication here.
        Alert.alert('Logged In', `Logged in as: ${user.name}`);
      } else {
        // Display an error message for incorrect credentials.
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } else {
      // Signup logic
      if (!signData.name || !signData.email || !signData.password) {
        Alert.alert('Signup Failed', 'Please fill in all fields.');
        return;
      }

      const emailExists = users.some((u) => u.email === signData.email);
      if (emailExists) {
        Alert.alert('Signup Failed', 'Email already in use.');
      } else {
        const newUser = {
          name: signData.name,
          email: signData.email,
          password: signData.password,
          id: users.length + 1, // Generate a unique ID for the new user.
          role: 'user', // Set the default role for new users.
        };
        users.push(newUser);
        // Successful signup, you can handle user registration here.
        Alert.alert(
          'Signup Successful',
          `New user registered: ${newUser.name}`
        );
      }
    }
  };

  return (
    <LinearGradient
      colors={[theme.palette.primary, theme.palette.secondary]}
      style={styles.container}
    >
      <MyCard style={styles.card}>
        {isLogin ? (
          <>
            <MyInput
              text="Email"
              icon="person"
              value={loginData.email}
              onChangeText={(text) =>
                setLoginData({ ...loginData, email: text })
              }
            />
            <MyInput
              text="Password"
              password
              icon="lock-closed"
              value={loginData.password}
              onChangeText={(text) =>
                setLoginData({ ...loginData, password: text })
              }
            />
            <MyButton text="Login" onPress={handleSubmit} />
            <TouchableOpacity onPress={toggleSwitch}>
              <Title text="Don't have an account? Signup" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <MyInput
              text="Full Name"
              icon="person"
              onChangeText={(text) => setSignData({ ...signData, name: text })}
            />
            <MyInput
              text="Email"
              icon="email"
              onChangeText={(text) => setSignData({ ...signData, email: text })}
            />
            <MyInput
              text="Password"
              password
              icon="lock-closed"
              onChangeText={(text) =>
                setSignData({ ...signData, password: text })
              }
            />
            <MyButton text="Signup" onPress={handleSubmit} />
            <TouchableOpacity onPress={toggleSwitch}>
              <Title text="Already have an account? Login" />
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
        >
          <Title text="Skip Login" link />
        </TouchableOpacity>
      </MyCard>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    // flex: 1,
    width: '95%',
  },
});
