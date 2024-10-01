import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProfilInformation from '../screens/ProfileInformation';
import ProfilEvenement from '../screens/ProfilEvenement';
import { IContact } from '../types/api';
import ProfilCard from '../screens/ProfilCart';

const Tab = createMaterialTopTabNavigator();

const ProfilDetailCarte = ({contact} : {contact : IContact}) => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          top: 0,
          backgroundColor: undefined,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          margin: 0,
          fontWeight: 'bold',
          textTransform: 'none',
        },
      })}>
         <Tab.Screen
        name="Carte"
        component={ProfilCard} initialParams={contact}
        options={{tabBarLabel: 'Carte'}}
      />
      <Tab.Screen
        name="ProfilInformation"
        component={ProfilInformation} initialParams={contact}
        options={{tabBarLabel: 'Reseau social'}}
      />
      
      <Tab.Screen
        name="ProfilEvement"
        component={ProfilEvenement} initialParams={contact}
        options={{tabBarLabel: 'Evenements'}}
      />
    </Tab.Navigator>
  );
};

export default ProfilDetailCarte;
