import {ColorValue, DimensionValue, Text} from 'react-native';
import React from 'react';
import {paletteColor} from '../themes/Utility';

interface PropsText {
  color?: ColorValue;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  fontSize?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  children: any;
  marginTop?: DimensionValue | undefined;
  marginBottom?: DimensionValue | undefined;
  onPress?: (params: any) => any;
  backgroundColor?: ColorValue;
  padding?: DimensionValue | undefined;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | undefined;
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
  marginLeft?: DimensionValue | undefined;
  numberOfLines?: number | undefined;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
}

const CustomText = ({
  ellipsizeMode,
  numberOfLines,
  marginLeft,
  textDecorationLine,
  textTransform,
  color = paletteColor.BLACK,
  fontWeight,
  fontSize,
  textAlign,
  children,
  marginTop,
  marginBottom,
  onPress,
  backgroundColor,
  padding,
}: PropsText) => {
  return (
    <Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={{
        marginLeft,
        textDecorationLine,
        textTransform,
        color,
        fontWeight,
        fontSize,
        textAlign,
        marginTop,
        marginBottom,
        backgroundColor,
        padding,
      }}
      onPress={onPress}>
      {children}
    </Text>
  );
};

export default CustomText;
