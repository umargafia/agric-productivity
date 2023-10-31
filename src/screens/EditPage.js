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

const theme = Theme();
export default function EditPage({ route }) {
  const { crop } = route.params;
  const [editedCrop, setEditedCrop] = useState({ ...crop });
  const navigation = useNavigation();
  const itemNumber = parseInt(crop.id) - 1;

  navigation.setOptions({
    title: crop.name,
  });

  const saveChanges = () => {
    // Find the index of the edited crop in the CropsList array
    const editedIndex = itemNumber;

    // Create a copy of the CropsList array
    const updatedCropsList = [...CropsList];

    // Update the item at the editedIndex with the new values
    updatedCropsList[editedIndex] = editedCrop;

    // Update the state with the modified array (assuming you have a state variable and setter for CropsList)
    // setCropsList(updatedCropsList); // Uncomment this line if you have a state variable and setter for CropsList

    // Navigate back to the CropInfoScreen with the edited crop data
    navigation.navigate('Crop Info', { crop: editedCrop });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <MyInput
          label="Description"
          value={CropsList[itemNumber]?.description}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, description: text })
          }
        />
        <MyInput
          label="Planting and Sowing Guidelines"
          value={CropsList[itemNumber].plantingAndSowingGuidelines}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, plantingAndSowingGuidelines: text })
          }
        />
        <MyInput
          label="Soil Preparation"
          value={CropsList[itemNumber].soilPreparation}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, soilPreparation: text })
          }
        />
        <MyInput
          label="Growing Conditions"
          value={CropsList[itemNumber].growingConditions}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, growingConditions: text })
          }
        />
        <MyInput
          label="Watering and Irrigation"
          value={CropsList[itemNumber].wateringAndIrrigation}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, wateringAndIrrigation: text })
          }
        />
        <MyInput
          label="Fertilization"
          value={CropsList[itemNumber].fertilization}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, fertilization: text })
          }
        />
        <MyInput
          label="Pest and Disease Management"
          value={CropsList[itemNumber].pestAndDiseaseManagement}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, pestAndDiseaseManagement: text })
          }
        />
        <MyInput
          label="Harvesting"
          value={CropsList[itemNumber].harvesting}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, harvesting: text })
          }
        />
        <MyInput
          label="Marketing"
          value={CropsList[itemNumber].marketing}
          onChangeText={(text) =>
            setEditedCrop({ ...editedCrop, marketing: text })
          }
        />
        <MyInput
          label="Best Practices"
          value={CropsList[itemNumber].bestPractices}
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
