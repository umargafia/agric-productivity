import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function MarketPriceScreen() {
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    // Replace with your actual API
    const api = 'https://api.example.com/market';

    axios
      .get(api)
      .then((response) => {
        setMarketData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Market Price</Text>
      {marketData ? (
        marketData.map((market, index) => (
          <View key={index} style={styles.marketContainer}>
            <Text style={styles.marketName}>{market.name}</Text>
            <Text style={styles.marketPrice}>{market.price}</Text>
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
  marketContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  marketName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  marketPrice: {
    fontSize: 16,
    marginTop: 10,
  },
});
