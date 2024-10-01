import {
  ColorValue,
  DimensionValue,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paletteColor} from '../themes/Utility';
import RowJustifyContent from './RowJustifyContent';

interface PropsTextInput {
  height?: DimensionValue | undefined;
  borderColor?: ColorValue;
  borderWidth?: number | undefined;
  borderRadius?: number | undefined;
  paddingHorizontal?: DimensionValue | undefined;
  placeholder?: string;
  title?: string;
  subTitle?: string;
  verifIcon?: boolean;
  secureTextEntry?: boolean;
  onPress?: (params: any) => any;
  onPressText?: (params: any) => any;
  backgroundColor?: ColorValue;
  elevation?: number | undefined;
  nameIcon?: string;
  marginTop?: DimensionValue | undefined;
  value?: string | undefined;
  editable?: boolean;
  colorIcon?: ColorValue;
  multiline?: boolean | undefined;
  disabled?: boolean | null | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  defaultValue?: string | undefined;
  onFocus?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
}

const CustomTextInput = ({
  height = 55,
  borderColor = paletteColor.GRAY,
  borderWidth = 0.5,
  borderRadius = 25,
  paddingHorizontal = 8,
  placeholder,
  title,
  subTitle,
  verifIcon = false,
  onPress,
  secureTextEntry,
  backgroundColor,
  elevation,
  nameIcon = 'eye',
  marginTop = 0,
  value,
  editable = true,
  colorIcon = paletteColor.BLACK,
  multiline,
  onChangeText,
  defaultValue,
  onFocus,
  onBlur,
  keyboardType,
  onPressText,
}: PropsTextInput) => {
  return (
    <View>
       <TouchableOpacity onPress={onPress}>
      <RowJustifyContent>
        <CustomText marginTop={marginTop} marginBottom={5}>
          {title}
        </CustomText>
        {subTitle && <CustomText
          onPress={onPressText}
          color={paletteColor.ORANGE}
          marginTop={marginTop}
          marginBottom={5}>
          {subTitle}
        </CustomText>}
      </RowJustifyContent>
      <View
        style={{
          height,
          borderColor,
          borderWidth,
          borderRadius,
          paddingHorizontal,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor,
          elevation,
        }}>
        <TextInput
          keyboardType={keyboardType}
          onBlur={onBlur}
          onFocus={onFocus}
          numberOfLines={1}
          style={{color: paletteColor.BLACK, width: verifIcon == true ? '90%' : '100%'}}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor="rgba(000,000,000,0.5)"
          secureTextEntry={secureTextEntry}
          value={value}
          editable={editable}
        />
        {verifIcon == true && (
          <View>
              <MaterialCommunityIcons
                color={colorIcon}
                name={secureTextEntry ? 'eye-off' : nameIcon}
                size={25}
              />
          </View>
        )}
      </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTextInput;
