/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ButtonActionCircular from '../components/ButtonActionCircular';
import * as Icons from "react-native-heroicons/outline";

import Accueil from '../screens/Accueil';
import Agenda from '../screens/Agenda';
import TabCarte from '../screens/TabCarte';
import TabProducts from '../screens/TabProducts';
import Avatar from '../components/Avatar';

const Tab = createBottomTabNavigator();

export default function CreateBottom() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false,
         tabBarStyle : {
            borderTopRightRadius : 20,
            borderTopLeftRadius : 20,
            elevation: 5
         }}}
    > 
      <Tab.Screen
        name="Accueil"
        component={Accueil}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({color}) => (
            <Icons.HomeIcon  color={color} size={26} />
          ),
          headerRight :() => (
            <Avatar/>
          )
        }}
      />
      <Tab.Screen
        name="StackCarte"
        component={TabCarte}
        options={{
          tabBarLabel: 'Cartes',
          tabBarIcon: ({color}) => (
            <Icons.CreditCardIcon
              color={color}
              size={26}
            />
          ),
          headerTitle : "Cartes"
        }}
      />
      <Tab.Screen
        name="Add"
        component={TabCarte}
        options={{
          tabBarButton: () => <ButtonActionCircular />,
        }}
      />

      <Tab.Screen
        name="Agenda"
        component={Agenda}
        options={{
          tabBarLabel: 'Agenda',
          tabBarIcon: ({color}) => (
            <Icons.CalendarDaysIcon
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Products"
        component={TabProducts}
        options={{
          tabBarLabel: 'Produits',
          tabBarIcon: ({color}) => (
            <Icons.BuildingStorefrontIcon
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
