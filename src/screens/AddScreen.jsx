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
import { CreateCrop } from '../store/api';

const theme = Theme();
export default function AddScreen({ route }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [cropData, setCropData] = useState({
    name: '',
    url: '',
    description: '',
    plantingAndSowingGuidelines: '',
    soilPreparation: '',
    growingConditions: '',
    wateringAndIrrigation: '',
    fertilization: '',
    pestAndDiseaseManagement: '',
    harvesting: '',
    marketing: '',
    bestPractices: '',
  });

  const saveChanges = async () => {
    setLoading(true);
    await CreateCrop({ data: cropData });
    setLoading(false);
    navigation.navigate('Tabs', { screen: 'Home' });
    Alert.alert('Crop Added Successfully');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyInput
          label="Name"
          normal
          value={cropData.name}
          onChangeText={(text) => setCropData({ ...cropData, name: text })}
        />
        <MyInput
          label="Image URL"
          normal
          value={cropData.url}
          onChangeText={(text) => setCropData({ ...cropData, url: text })}
        />
        <MyInput
          label="Description"
          value={cropData.description}
          onChangeText={(text) =>
            setCropData({ ...cropData, description: text })
          }
        />
        <MyInput
          label="Planting and Sowing Guidelines"
          value={cropData.plantingAndSowingGuidelines}
          onChangeText={(text) =>
            setCropData({ ...cropData, plantingAndSowingGuidelines: text })
          }
        />
        <MyInput
          label="Soil Preparation"
          value={cropData.soilPreparation}
          onChangeText={(text) =>
            setCropData({ ...cropData, soilPreparation: text })
          }
        />
        <MyInput
          label="Growing Conditions"
          value={cropData.growingConditions}
          onChangeText={(text) =>
            setCropData({ ...cropData, growingConditions: text })
          }
        />
        <MyInput
          label="Watering and Irrigation"
          value={cropData.wateringAndIrrigation}
          onChangeText={(text) =>
            setCropData({ ...cropData, wateringAndIrrigation: text })
          }
        />
        <MyInput
          label="Fertilization"
          value={cropData.fertilization}
          onChangeText={(text) =>
            setCropData({ ...cropData, fertilization: text })
          }
        />
        <MyInput
          label="Pest and Disease Management"
          value={cropData.pestAndDiseaseManagement}
          onChangeText={(text) =>
            setCropData({ ...cropData, pestAndDiseaseManagement: text })
          }
        />
        <MyInput
          label="Harvesting"
          value={cropData.harvesting}
          onChangeText={(text) =>
            setCropData({ ...cropData, harvesting: text })
          }
        />
        <MyInput
          label="Marketing"
          value={cropData.marketing}
          onChangeText={(text) => setCropData({ ...cropData, marketing: text })}
        />
        <MyInput
          label="Best Practices"
          value={cropData.bestPractices}
          onChangeText={(text) =>
            setCropData({ ...cropData, bestPractices: text })
          }
        />
        <MyButton
          text={loading ? 'Loading...' : 'Create Crop'}
          onPress={saveChanges}
        />
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
    marginBottom: 3,
    marginTop: 10,
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

const MyInput = ({ label, value, onChangeText, normal }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, normal && { height: 50 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={`Enter ${label}`}
        multiline={normal ? false : true}
        numberOfLines={normal ? 1 : 3}
      />
    </View>
  );
};
