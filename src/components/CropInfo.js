import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function CropInfo({ crop }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: crop.image }} style={styles.image} />
      <Text style={styles.name}>{crop.name}</Text>
      <Text style={styles.info}>{crop.info}</Text>
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
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});
