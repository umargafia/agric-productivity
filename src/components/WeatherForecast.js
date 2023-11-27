import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function WeatherForecast({ forecast }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: forecast.icon }} style={styles.image} />
      <Text style={styles.date}>{forecast.date}</Text>
      <Text style={styles.info}>{forecast.info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});
