/* eslint-disable react/react-in-jsx-scope */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Icons from "react-native-heroicons/outline";

import Agenda from '../screens/init/Agenda';
import Avatar from '../components/Avatar';
import SelectScreen from '../screens/init/SelectScreen';

const Tab = createBottomTabNavigator();

export default function FreeBottom() {
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
        name="Cartes"
        component={SelectScreen}
        options={{
          tabBarLabel: 'Cartes',
          tabBarIcon: ({color}) => (
            <Icons.CreditCardIcon
            color={color}
            size={26}
          />
          ),
          headerRight :() => (
            <Avatar/>
          )
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
          headerTitle : "Agenda"
        }}
      />
    </Tab.Navigator>
  );
}
