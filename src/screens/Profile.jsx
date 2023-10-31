import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Theme } from '../constants/Theme';
import MyCard from '../components/MyCard';
import Title from '../components/Title';
import MyButton from '../components/Mybutton';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../store/globalState';

const theme = Theme();
const ProfileScreen = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.globalState);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(loginUser());
    navigation.replace('Auth');
  }
  return (
    <View>
      <LinearGradient
        colors={[theme.palette.primary, theme.palette.secondary]}
        style={styles.container}
      >
        {user.name ? (
          <>
            <Text style={styles.title}>My Profile</Text>
            <MyCard style={styles.card}>
              <Title text={user.name} position={'start'} />
            </MyCard>
            <MyCard style={styles.card}>
              <Title text={user.email} position={'start'} />
            </MyCard>
            <MyButton
              text="Logout"
              background={theme.palette.red}
              onPress={handleLogout}
            />
          </>
        ) : (
          <View style={{ marginTop: 50 }}>
            <Title
              text="Login to see ur profile"
              bold
              header
              color={theme.palette.black}
            />
            <MyButton
              text="Login"
              background={theme.palette.white}
              onPress={handleLogout}
              color={theme.palette.primary}
            />
          </View>
        )}
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
