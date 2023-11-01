import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Theme } from '../constants/Theme';
import MyCard from '../components/MyCard';
import MyInput from '../components/MyInput';
import MyButton from '../components/Mybutton';
import Title from '../components/Title';
import { loginUser } from '../store/globalState';
import { LoginUser, SignUpUser } from '../store/api';

const theme = Theme();
export default function Auth() {
  const [isLogin, setLogin] = useState(true);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signData, setSignData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const dispatch = useDispatch();

  function toggleSwitch() {
    setLogin((prev) => !prev);
  }

  const handleSubmit = async () => {
    if (isLogin) {
      // Login logic
      if (!loginData.email || !loginData.password) {
        Alert.alert('Login Failed', 'Please fill in all fields.');
        return;
      }

      setLoading(true);
      const response = await LoginUser({
        data: { email: loginData.email, password: loginData.password },
      });
      if (response.status === 'success') {
        setLoginData({ email: '', password: '' });
        dispatch(loginUser(response.data));
        navigation.replace('Tabs', { screen: 'Home' });
      } else {
        // Display an error message for incorrect credentials.
        Alert.alert('Login Failed', response.message);
      }
      setLoading(false);
    } else {
      // Signup logic
      if (!signData.name || !signData.email || !signData.password) {
        Alert.alert('Signup Failed', 'Please fill in all fields.');
        return;
      }

      const data = {
        name: signData.name,
        email: signData.email,
        password: signData.password,
      };
      setLoading(true);
      const response = await SignUpUser({
        data,
      });
      console.log(response);

      if (response.status === 'success') {
        setLoginData({ email: '', password: '' });
        dispatch(loginUser(response.data));
        navigation.replace('Tabs', { screen: 'Home' });
      } else {
        Alert.alert('Login Failed', response.message);
      }
      setLoading(false);
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
            <MyButton
              text={loading ? 'Loading...' : 'Login'}
              onPress={handleSubmit}
            />
            <TouchableOpacity onPress={toggleSwitch}>
              <Title text="Don't have an account? Signup" link />
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
              icon="mail"
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
            <MyButton
              text={loading ? 'Loading...' : 'Signup'}
              onPress={handleSubmit}
            />
            <TouchableOpacity onPress={toggleSwitch}>
              <Title text="Already have an account? Login" link />
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
