import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MyButton from '../components/Mybutton';
import { CropsList } from '../constants/CropInfo';
import { Theme } from '../constants/Theme';
import { UpdateCrop } from '../store/api';

const theme = Theme();
export default function EditPage({ route }) {
  const { crop } = route.params;
  const [editedCrop, setEditedCrop] = useState({ ...crop });
  const navigation = useNavigation();
  const itemNumber = parseInt(crop.id) - 1;

  navigation.setOptions({
    title: crop.name,
  });

  const saveChanges = async () => {
    await UpdateCrop({ data: editedCrop, id: crop._id });

    // Navigate back to the CropInfoScreen with the edited crop data
    navigation.navigate('Crop Info', { crop: editedCrop });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <MyInput
          label="Description"
          value={crop?.description}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, description: text })
          }
        />
        <MyInput
          label="Planting and Sowing Guidelines"
          value={crop.plantingAndSowingGuidelines}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, plantingAndSowingGuidelines: text })
          }
        />
        <MyInput
          label="Soil Preparation"
          value={crop.soilPreparation}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, soilPreparation: text })
          }
        />
        <MyInput
          label="Growing Conditions"
          value={crop.growingConditions}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, growingConditions: text })
          }
        />
        <MyInput
          label="Watering and Irrigation"
          value={crop.wateringAndIrrigation}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, wateringAndIrrigation: text })
          }
        />
        <MyInput
          label="Fertilization"
          value={crop.fertilization}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, fertilization: text })
          }
        />
        <MyInput
          label="Pest and Disease Management"
          value={crop.pestAndDiseaseManagement}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, pestAndDiseaseManagement: text })
          }
        />
        <MyInput
          label="Harvesting"
          value={crop.harvesting}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, harvesting: text })
          }
        />
        <MyInput
          label="Marketing"
          value={crop.marketing}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, marketing: text })
          }
        />
        <MyInput
          label="Best Practices"
          value={crop.bestPractices}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, bestPractices: text })
          }
        />
        <MyButton text="Save Changes" onPress={saveChanges} />
        <MyButton
          text="Cancel"
          onPress={() => navigation.navigate('CropInfoScreen', { crop })}
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
    borderColor: theme.palette.gray,
    borderWidth: 3,
    borderRadius: 10,
  },
});

const MyInput = ({ label, value, onChangeText }) => {
  return (
    <View style={{ marginBottom: 16 }}>
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
