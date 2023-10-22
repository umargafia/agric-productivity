import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function WeatherForecastScreen() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Replace with your actual API
    const api = 'https://api.example.com/weather';

    axios
      .get(api)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weather Forecast</Text>
      {weatherData ? (
        weatherData.map((weather, index) => (
          <View key={index} style={styles.weatherContainer}>
            <Text style={styles.weatherDate}>{weather.date}</Text>
            <Text style={styles.weatherInfo}>{weather.info}</Text>
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  weatherContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  weatherDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weatherInfo: {
    fontSize: 16,
    marginTop: 10,
  },
});
