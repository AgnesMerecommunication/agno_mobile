import {
  ColorValue,
  FlexAlignType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {paletteColor} from '../themes/Utility';

interface PropsButton {
  onPress?: (params: any) => any;
  backgroundColor?: ColorValue;
  alignItems?: FlexAlignType | undefined;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  flexDirection?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | undefined;
  height?: string | number | undefined;
  borderRadius?: number | undefined;
  verifLogo?: boolean;
  logo?: any;
  colorText?: ColorValue;
  label: string;
  borderWidth?: number | undefined;
  borderColor?: ColorValue | undefined;
  disabled?: boolean | undefined;
}

const CustomButton = ({
  onPress,
  backgroundColor = paletteColor.ORANGE,
  alignItems = 'center',
  justifyContent = 'center',
  flexDirection = 'row',
  height = 55,
  borderRadius = 25,
  verifLogo = false,
  logo,
  borderWidth,
  colorText = paletteColor.WHITE,
  borderColor,
  label,
  disabled,
}: PropsButton) => {
  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{
          backgroundColor,
          alignItems,
          justifyContent,
          flexDirection,
          height,
          borderRadius,
          borderWidth,
          borderColor,
        }}>
        {verifLogo && <View style={{marginHorizontal: 5}}>{logo}</View>}
        <Text style={{color: colorText, fontWeight: '800'}}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
