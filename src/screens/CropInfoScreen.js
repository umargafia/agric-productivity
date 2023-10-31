import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import { Theme } from '../constants/Theme';
import Title from '../components/Title';
import MyCard from '../components/MyCard';
import { CropsList } from '../constants/CropInfo';

const theme = Theme();
export default function CropInfoScreen({ route }) {
  const { user } = useSelector((state) => state.globalState);
  //  {"email": "admin@gmail.com", "id": 2, "name": "Admin User", "password": "123456", "role": "admin"}
  const { crop } = route.params;
  const navigation = useNavigation();
  const itemNumber = parseInt(crop.id) - 1;

  navigation.setOptions({
    title: crop.name,
    headerRight: () => (
      <HeaderButtons>
        {user?.role === 'admin' && (
          <>
            <Item
              title="Edit"
              iconName="pencil"
              onPress={() => {
                navigation.navigate('Edit Page', { crop });
              }}
            />
          </>
        )}
      </HeaderButtons>
    ),
  });

  return (
    <LinearGradient
      colors={[theme.palette.primary, theme.palette.secondary]}
      style={styles.gradient}
    >
      <ScrollView style={styles.container}>
        <StatusBar style="dark" />
        <Image source={{ uri: crop.url }} style={styles.image} />

        {/* <Title text={crop?.name} header color={theme.palette.white} /> */}
        <ListItem
          CropsList={CropsList}
          header="Description"
          text={CropsList[itemNumber]?.description}
        />
        <ListItem
          CropsList={CropsList}
          header="Planting and Sowing Guidelines"
          text={CropsList[itemNumber].plantingAndSowingGuidelines}
        />
        <ListItem
          CropsList={CropsList}
          header="Soil Preparation"
          text={CropsList[itemNumber].soilPreparation}
        />
        <ListItem
          CropsList={CropsList}
          header="Growing Conditions"
          text={CropsList[itemNumber].growingConditions}
        />
        <ListItem
          CropsList={CropsList}
          header="Watering and Irrigation:"
          text={CropsList[itemNumber].wateringAndIrrigation}
        />
        <ListItem
          CropsList={CropsList}
          header="Fertilization"
          text={CropsList[itemNumber].fertilization}
        />
        <ListItem
          CropsList={CropsList}
          header="Pest and Disease Management"
          text={CropsList[itemNumber].pestAndDiseaseManagement}
        />
        <ListItem
          CropsList={CropsList}
          header="Harvesting"
          text={CropsList[itemNumber].harvesting}
        />
        <ListItem
          CropsList={CropsList}
          header="Market Prices"
          text={CropsList[itemNumber].marketing}
        />
        <ListItem
          CropsList={CropsList}
          header="Best Practices"
          text={CropsList[itemNumber].bestPractices}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
  },
});

const ListItem = ({ header, text }) => {
  return (
    <MyCard style={{ margin: 10 }}>
      <Title text={header} header style={{ marginBottom: 3 }} position="left" />
      <Title text={text} position="left" />
    </MyCard>
  );
};
