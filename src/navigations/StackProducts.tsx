import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Products from '../screens/Products';
import ServiceProduct from '../screens/ServiceProduct';
import CatalogProduct from '../screens/CatalogProduct';
import Catalog from '../screens/Catalogue';

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
        options={{tabBarLabel: 'Produits'}}
      />
      <Tab.Screen
        name="Services"
        component={ServiceProduct}
        options={{tabBarLabel: 'Services'}}
      />
      <Tab.Screen
        name="portfolios"
        component={CatalogProduct}
        options={{tabBarLabel: 'Portfolio'}}
      />
       <Tab.Screen
        name="catalogues"
        component={Catalog}
        options={{tabBarLabel: 'Catalogue'}}
      />
    </Tab.Navigator>
  );
};

export default StackProducts;
