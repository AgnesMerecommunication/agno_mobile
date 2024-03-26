import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TemplateCarteHorizontal from '../screens/TemplateCarteHorizontal';
import TemplateCarteVertical from '../screens/TemplateCarteVertical';
import { Dimensions, SafeAreaView, View } from 'react-native';
import BodyProject from '../components/BodyProject';

const Tab = createMaterialTopTabNavigator();

const TemplateTab = () => {
  return (
    <SafeAreaView>
        <View style={{marginTop: 5, height: Dimensions.get('screen').height}}>
            <BodyProject title="Annuler">
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
                    name="CartesHorizontals"
                    component={TemplateCarteHorizontal}
                    options={{tabBarLabel: 'Cartes Horizontals'}}
                />
                <Tab.Screen
                    name="CartesVerticals"
                    component={TemplateCarteVertical}
                    options={{tabBarLabel: 'Cartes Verticals'}}
                />
                </Tab.Navigator>
            </BodyProject>
        </View>
  </SafeAreaView>
   
  );
};

export default TemplateTab;
