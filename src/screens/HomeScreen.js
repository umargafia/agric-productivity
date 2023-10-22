import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  FlatList,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import HomeButton from './../components/HomeButton';
import { Theme } from '../constants/Theme';
import cropsArray from '../constants/Crop';
import Row from '../components/Row';

const theme = Theme();

export default function HomeScreen({ navigation }) {
  const fadeAnim = React.useRef(new Animated.Value(100)).current;
  const [searchQuery, setSearchQuery] = useState('');

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
      <Row style={styles.row}>
        <Text style={styles.title}>Katsina State, Nigeria</Text>
        <Text style={styles.title}>68°</Text>
      </Row>
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
