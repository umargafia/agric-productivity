import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import { Theme } from '../constants/Theme';
import MyCard from '../components/MyCard';
import Title from '../components/Title';
import MyButton from '../components/Mybutton';
import { useNavigation } from '@react-navigation/native';

const theme = Theme();
const ProfileScreen = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const navigation = useNavigation();

  function handleLogout() {
    navigation.navigate('Auth');
  }
  return (
    <View>
      <LinearGradient
        colors={[theme.palette.primary, theme.palette.secondary]}
        style={styles.container}
      >
        <Text style={styles.title}>My Profile</Text>
        <MyCard style={styles.card}>
          <Title text={name} position={'start'} />
        </MyCard>
        <MyCard style={styles.card}>
          <Title text={email} position={'start'} />
        </MyCard>
        <MyButton
          text="Logout"
          background={theme.palette.red}
          onPress={handleLogout}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    minHeight: theme.window.windowHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.palette.black,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default ProfileScreen;
