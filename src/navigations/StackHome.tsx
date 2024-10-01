import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Accueil from '../screens/Accueil';
import Profil from '../screens/Profil';
import UpdateProfil from '../screens/UpdateProfil';
import DetailCarteVisite from '../screens/DetailCarteVisite';
import CreateBottom from './CreateBottom';
import CreateEvenement from '../screens/CreateEvenement';
import CreateProduit from '../screens/CreateProduit';
import Scan from '../screens/Scan';
import FormulaireCarte from '../screens/FormulaireCarte';
import Photo from '../screens/Photo';
import ValiderCarte from '../screens/ValiderCarte';
import TabCarte from '../screens/TabCarte';
import PaymentScreen from '../screens/PaymentScreen';
import TemplateTab from './TemplateTab';
import ProfilDetail from '../screens/ProfilDetail';

const Stack = createStackNavigator();

const StackHome = () => {

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="CreateBottom"
        component={CreateBottom}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        
        }}
      />

      <Stack.Screen
        name="Accueil"
        component={Accueil}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid
        }}
      />
      <Stack.Screen
        name="Profil"
        component={Profil}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="UpdateProfil"
        component={UpdateProfil}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="DetailCarteVisite"
        component={DetailCarteVisite}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="StackCarte"
        component={TabCarte}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="CreateEvenement"
        component={CreateEvenement}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="CreateProduit"
        component={CreateProduit}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="TemplateCarte"
        component={TemplateTab}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
      <Stack.Screen
        name="Photo"
        component={Photo}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="FormulaireCarte"
        component={FormulaireCarte}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
        }}
      />

      <Stack.Screen
        name="ValiderCarte"
        component={ValiderCarte}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="ProfilDetail"
        component={ProfilDetail}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackHome;
