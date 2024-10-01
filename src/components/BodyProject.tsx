import {ColorValue, GestureResponderEvent, Platform, Pressable, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {paletteColor} from '../themes/Utility';
import CustomCircle from './CustomCircle';

interface PropsBodyProject {
  title: string;
  children: any;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  verifPress?: Boolean;
  backgroundColor?: ColorValue | undefined;
}

const BodyProject = ({
  title,
  children,
  onPress,
  verifPress = false,
  backgroundColor,
}: PropsBodyProject) => {
  const navigation = useNavigation();
  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, marginTop: Platform.OS =='ios' ? '10%': '10%', backgroundColor}}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          marginTop: 15,
        }}
        onPress={verifPress === true ? onPress : handleReturn}>
        <CustomCircle
          disabled={true}
          borderColor={paletteColor.ORANGE}
          size={30}
          backgroundColor={paletteColor.GRAY_OPACITY}
          borderRadius={10}
          borderWidth={1}>
          <MaterialIcons
            name="chevron-left"
            size={30}
            color={paletteColor.ORANGE}
          />
        </CustomCircle>
        <View style={{marginLeft: 10}}>
          <CustomText
            textTransform="capitalize"
            fontWeight="bold"
            fontSize={14}
            color={paletteColor.ORANGE}>
            {title}
          </CustomText>
        </View>
      </Pressable>
      {children}
    </View>
  );
};

export default BodyProject;
