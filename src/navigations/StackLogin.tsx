import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Login from '../screens/Login';
import InscriptionStepper from '../screens/InscriptionStepper';
import PasswordForgot from '../screens/passwordForgort';
import HomeScreen from '../screens/init/HomeScreen';
import CartScreen from '../screens/init/CarteScreen';

const Stack = createStackNavigator();

const StackLogin = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="InscriptionStepper"
        component={InscriptionStepper}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />

      <Stack.Screen
        name="PasswordForgot"
        component={PasswordForgot}
        options={{
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid,
        }}
      />
     <Stack.Screen
          name="StackHome"
          component={HomeScreen}
      />
      <Stack.Screen
          name="StackCarte"
          component={CartScreen}
      />
    </Stack.Navigator>
  );
};

export default StackLogin;
