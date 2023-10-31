import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { Theme } from '../constants/Theme';
import cropsArray from '../constants/Crop';
import HomeButton from '../components/HomeButton';

const theme = Theme();
const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCrops = cropsArray.filter((crop) =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <LinearGradient
        colors={[theme.palette.primary, theme.palette.secondary]}
        style={styles.container}
      >
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery ? (
          <FlatList
            data={filteredCrops}
            numColumns={2}
            renderItem={({ item }) => <HomeButton crop={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : null}
      </LinearGradient>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    minHeight: theme.window.windowHeight,
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
});
