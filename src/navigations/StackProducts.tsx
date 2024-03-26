import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Products from '../screens/Products';
import ServiceProduct from '../screens/ServiceProduct';
import CatalogProduct from '../screens/CatalogProduct';

const Tab = createMaterialTopTabNavigator();

const StackProducts = () => {
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
        name="Produits"
        component={Products}
        options={{tabBarLabel: 'Mes Produits'}}
      />
      <Tab.Screen
        name="Services"
        component={ServiceProduct}
        options={{tabBarLabel: 'Mes Services'}}
      />
      <Tab.Screen
        name="portfolios"
        component={CatalogProduct}
        options={{tabBarLabel: 'Mon portfolio'}}
      />
    </Tab.Navigator>
  );
};

export default StackProducts;
