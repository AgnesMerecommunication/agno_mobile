import React, { useEffect } from 'react';
import {DefaultTheme, NavigationContainer } from '@react-navigation/native';
import GlobalNavigation from './GlobalNavigation';
import { paletteColor } from '../themes/Utility';
import {navigationRef} from './naviagationService';

const ContainNavigation = () => {
 
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: paletteColor.ORANGE,
      background: '#FEF8F2',
    },
  };

  //@ts-ignore
  return (<NavigationContainer   theme={MyTheme} ref={navigationRef} >
      <GlobalNavigation />
    </NavigationContainer>
  );
};

export default ContainNavigation;
