import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Animated, FlatList, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

import HomeButton from './../components/HomeButton';
import { Theme } from '../constants/Theme';
import cropsArray from '../constants/Crop';
import Row from '../components/Row';
import { getTemperature } from '../constants/getTempreature';

const theme = Theme();

export default function HomeScreen() {
  const fadeAnim = React.useRef(new Animated.Value(100)).current;
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState({ state: null, country: null });
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log(`can't find location`);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      let gCode = await Location.reverseGeocodeAsync(currentLocation.coords);
      const temp = await getTemperature({
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
      });
      const geocode = gCode[0];
      setTemperature(temp);

      setLocation({
        state: geocode?.city,
        country: geocode.country,
      });
    })();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const filteredCrops = cropsArray.filter((crop) =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient
      colors={[theme.palette.primary, theme.palette.secondary]}
      style={styles.container}
    >
      {location && (
        <Row style={styles.row}>
          {location.state && location.country && (
            <Text style={styles.title}>
              {location.state} State, {location.country}
            </Text>
          )}
          {temperature && <Text style={styles.title}>{temperature}°</Text>}
        </Row>
      )}
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <Animated.View style={{ transform: [{ translateY: fadeAnim }], flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={filteredCrops}
          numColumns={2}
          renderItem={({ item }) => <HomeButton crop={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF',
    marginTop: 10,
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.palette.white,
    borderRadius: 10,
    ...theme.shadow,
  },
  listContainer: {},
  row: {
    justifyContent: 'space-between',
  },
});
