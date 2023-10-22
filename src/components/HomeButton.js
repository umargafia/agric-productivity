import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../constants/Theme';

const theme = Theme();

export default function HomeButton({ crop, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <ImageBackground source={{ uri: crop.url }} style={styles.image}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <Text style={styles.text}>{crop.name}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    width: '45%',
    height: 150,
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    backgroundColor: theme.palette.white,
    ...theme.shadow,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 15,
    color: '#fff',
  },
});
