import {ColorValue, Pressable, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from './CustomText';
import {paletteColor} from '../themes/Utility';

interface PropsTextIcon {
  nameIcon: string;
  title: string;
  color?: ColorValue;
  onPress?: (params: any) => any;
  colorText?: ColorValue;
}
const CustomTextIcon = ({
  onPress,
  nameIcon,
  title,
  color = paletteColor.BLUE,
  colorText,
}: PropsTextIcon) => {
  return (
    <Pressable
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
      <MaterialCommunityIcons name={nameIcon} size={20} color={color} />
      <View style={{marginLeft: 2}}>
        <CustomText fontWeight="600" fontSize={13} color={colorText}>
          {title}
        </CustomText>
      </View>
    </Pressable>
  );
};

export default CustomTextIcon;
