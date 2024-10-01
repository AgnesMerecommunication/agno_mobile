/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paletteColor} from '../themes/Utility';

const StepperComponent = ({active}: {active: number}) => {
  return (
    <View style={{alignItems: 'center', marginTop: '5%'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialCommunityIcons
          name="checkbox-marked-circle"
          size={25}
          color={paletteColor.ORANGE}
        />
        <View
          style={{
            width: '25%',
            backgroundColor: paletteColor.ORANGE,
            height: 4,
          }}
        />
        <MaterialCommunityIcons
          name={
            active === 1 || active === 2
              ? 'checkbox-marked-circle'
              : 'checkbox-blank-circle-outline'
          }
          size={25}
          color={paletteColor.ORANGE}
        />
        <View
          style={{
            width: '25%',
            backgroundColor: paletteColor.ORANGE,
            height: 4,
          }}
        />
        <MaterialCommunityIcons
          name={
            active === 2
              ? 'checkbox-marked-circle'
              : 'checkbox-blank-circle-outline'
          }
          size={25}
          color={paletteColor.ORANGE}
        />
      </View>
    </View>
  );
};

export default StepperComponent;
