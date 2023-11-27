import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MarketPrice({ market }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{market.name}</Text>
      <Text style={styles.price}>{market.price}</Text>
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});
