import {
  ColorValue,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

interface PropsCircle {
  size: string | number | undefined;
  backgroundColor: ColorValue;
  borderRadius: number | undefined;
  children: any;
  borderColor?: ColorValue;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  verifPress?: boolean;
  disabled?: boolean;
  borderWidth?: number | undefined;
}
const CustomCircle = ({
  borderColor,
  borderWidth,
  size,
  backgroundColor,
  borderRadius,
  children,
  onPress,
  verifPress = false,
  disabled,
}: PropsCircle) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View
        style={{
          borderColor,
          borderWidth,
          height: size,
          width: size,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default CustomCircle;

const styles = StyleSheet.create({});
