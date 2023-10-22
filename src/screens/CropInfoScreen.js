import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'react-native';

export default function CropInfoScreen({ route, navigation }) {
  const { crop } = route.params;

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <Image source={{ uri: crop.url }} style={styles.image} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});
