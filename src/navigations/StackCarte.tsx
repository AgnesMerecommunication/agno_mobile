import React from 'react';
import ListCarteVisite from '../screens/ListCarteVisite';
import ListCartePrise from '../screens/ListCartePrise';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const StackCarte = () => {
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
        name="Prise"
        component={ListCartePrise}
        options={{tabBarLabel: 'Cr scannées'}}
      />
    </Tab.Navigator>
  );
};

export default StackCarte;
