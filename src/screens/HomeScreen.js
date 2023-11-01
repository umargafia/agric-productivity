import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

import HomeButton from './../components/HomeButton';
import { Theme } from '../constants/Theme';
import cropsArray from '../constants/Crop';
import Row from '../components/Row';
import { getTemperature } from '../constants/getTempreature';
import { GetAllCrops } from '../store/api';

const theme = Theme();

export default function HomeScreen() {
  const fadeAnim = React.useRef(new Animated.Value(100)).current;
  const [location, setLocation] = useState({ state: null, country: null });
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  async function getCrops() {
    setLoading(true);
    const response = await GetAllCrops();
    setFilteredCrops(response);
    setLoading(false);
  }

  useEffect(() => {
    getCrops();
  }, [searchQuery]);

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

  return (
    <LinearGradient
      colors={[theme.palette.primary, theme.palette.secondary]}
      style={styles.container}
    >
      {location && (
        <Row style={styles.row}>
          {location.state && (
            <Text style={styles.title}>
              {location.state}, {location.country}
            </Text>
          )}
          {temperature && location.state && (
            <Text style={styles.title}>{temperature}°</Text>
          )}
        </Row>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.palette.white} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            marginTop: 10,
          }}
        >
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={filteredCrops}
            numColumns={2}
            renderItem={({ item }) => <HomeButton crop={item} />}
            keyExtractor={(item) => item._id}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getCrops}
                tintColor="white"
              />
            }
          />
        </View>
      )}
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
    marginBottom: 10,
    color: '#FFFFFF',
    marginTop: 10,
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.palette.white,
    borderRadius: 10,
    marginTop: 10,
    ...theme.shadow,
  },
  listContainer: {},
  row: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
