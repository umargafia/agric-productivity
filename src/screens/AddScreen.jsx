import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../constants/Theme';
import MyButton from '../components/Mybutton';

const theme = Theme();
export default function AddScreen({ route }) {
  const navigation = useNavigation();
  const saveChanges = () => {
    navigation.navigate('Tabs', { screen: 'Home' });
    Alert.alert('Crop Added Successfully');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyInput label="Description" />
        <MyInput label="Planting and Sowing Guidelines" />
        <MyInput label="Soil Preparation" />
        <MyInput label="Growing Conditions" />
        <MyInput label="Watering and Irrigation" />
        <MyInput label="Fertilization" />
        <MyInput label="Pest and Disease Management" />
        <MyInput label="Harvesting" />
        <MyInput label="Marketing" />
        <MyInput label="Best Practices" />
        <MyButton text="Save Changes" onPress={saveChanges} />
        <MyButton
          text="Cancel"
          onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 90,
    padding: 3,
    paddingLeft: 10,
    borderColor: theme.palette.gray,
    borderWidth: 3,
    borderRadius: 10,
  },
});

const MyInput = ({ label, value, onChangeText }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={`Enter ${label}`}
        multiline
        numberOfLines={3}
      />
    </View>
  );
};
