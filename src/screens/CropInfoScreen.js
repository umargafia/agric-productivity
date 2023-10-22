import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function CropInfoScreen() {
  const [cropData, setCropData] = useState(null);

  useEffect(() => {
    // Replace with your actual API
    const api = 'https://api.example.com/crops';

    axios
      .get(api)
      .then((response) => {
        setCropData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crop Information</Text>
      {cropData ? (
        cropData.map((crop, index) => (
          <View key={index} style={styles.cropContainer}>
            <Text style={styles.cropName}>{crop.name}</Text>
            <Text style={styles.cropInfo}>{crop.info}</Text>
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
  cropContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cropInfo: {
    fontSize: 16,
    marginTop: 10,
  },
});
