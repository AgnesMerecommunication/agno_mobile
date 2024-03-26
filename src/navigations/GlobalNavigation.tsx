/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import StackLogin from './StackLogin';
import StackHome from './StackHome';
import {useAuth} from '../hooks/AuthProvider';
import AppLoading from '../screens/Loading';
import {
  actionReducer,
  actionTypeReducer,
} from '../contexts/reducers/actionReducer';
import {asyncGetToken} from '../services/asyncStorage';
import Profil from '../screens/Profil';
import HomeScreen from "../screens/init/HomeScreen";
import CartScreen from "../screens/init/CarteScreen";
import SelectScreen from "../screens/init/SelectScreen";


const Stack = createStackNavigator();

const GlobalNavigation = () => {
  const {auhtContext, dispatchAuhtContext} = useAuth();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await asyncGetToken();
      } catch (e) {}
      dispatchAuhtContext(
        actionReducer(actionTypeReducer.RESTORE_TOKEN, userToken),
      );
    };
    bootstrapAsync();
  }, []);

  if (auhtContext.isLoading) {
    return <AppLoading />;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {auhtContext.userToken == null ? (
        <Stack.Screen
          name="StackLogin"
          component={StackLogin}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      ) : (
        <>
           <Stack.Screen
          name="StackHome"
          component={StackHome}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
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
        </>
       
      )}
       
    </Stack.Navigator>
  );
 
};

export default GlobalNavigation;
