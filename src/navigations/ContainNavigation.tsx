import React, { useEffect } from 'react';
import {DefaultTheme, NavigationContainer } from '@react-navigation/native';
import GlobalNavigation from './GlobalNavigation';
import { paletteColor } from '../themes/Utility';

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
  return (<NavigationContainer   theme={MyTheme} >
      <GlobalNavigation />
    </NavigationContainer>
  );
};

export default ContainNavigation;
