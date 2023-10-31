import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { Theme } from '../constants/Theme';
import MyCard from '../components/MyCard';
import MyInput from '../components/MyInput';
import MyButton from '../components/Mybutton';
import Title from '../components/Title';

const theme = Theme();
export default function Auth() {
  const [isLogin, setLogin] = useState(true);
  const navigation = useNavigation();
  function toggleSwitch() {
    setLogin((pr) => !pr);
  }
  return (
    <LinearGradient
      colors={[theme.palette.primary, theme.palette.secondary]}
      style={styles.container}
    >
      <MyCard style={styles.card}>
        {isLogin ? (
          <>
            <MyInput text="Email" icon="person" />
            <MyInput text="Password" password icon="person" />
            <MyButton text="Login" />
            <TouchableOpacity onPress={toggleSwitch}>
              <Title text="Don't have an account? Signup" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <MyInput text="Full Name" icon="person" />
            <MyInput text="Email" icon="person" />
            <MyInput text="Password" password icon="person" />
            <MyButton text="Login" />
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
