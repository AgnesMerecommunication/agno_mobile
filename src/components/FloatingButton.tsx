import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {paletteColor} from '../themes/Utility';
import CustomText from './CustomText';

interface PropsFloatingButton {
  title: String | any;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  width?: string | number | undefined;
  top?: number;
}

const FloatingButton = ({
  title,
  onPress,
  width,
  top = Dimensions.get('screen').height / 1.6,
}: PropsFloatingButton) => {
  //@ts-ignore
  return (<TouchableOpacity  style={[styles.btnOption1, {width, top}]}
      onPress={onPress}>
      <CustomText color={paletteColor.WHITE}>{title}</CustomText>
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  btnOption1: {
    backgroundColor: paletteColor.ORANGE,
    position: 'absolute',
    right: 10,
    zIndex: 999,
    padding: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
});
