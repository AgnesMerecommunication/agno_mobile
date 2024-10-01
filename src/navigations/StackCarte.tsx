import React from 'react';
import ListCarteVisite from '../screens/ListCarteVisite';
import ListCartePrise from '../screens/ListCartePrise';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { IContact } from '../types/api';

const Tab = createMaterialTopTabNavigator();

const StackCarte = ({contacts} : {contacts : IContact[]}) => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          top: 0,
          backgroundColor: undefined,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          margin: 0,
          fontWeight: 'bold',
          textTransform: 'none',
        },
      })}>
      <Tab.Screen
        name="Carte"
        component={ListCarteVisite}
        options={{tabBarLabel: 'Mes Cartes'}}
      />
      <Tab.Screen
        name="Prise" initialParams={contacts}
        component={ListCartePrise}
        options={{tabBarLabel: 'Contacts'}}
      />
    </Tab.Navigator>
  );
};

export default StackCarte;
