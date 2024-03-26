import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import BottomSheetComponent from './BottomSheetComponent';
import CustomText from './CustomText';
import RowJustifyContent from './RowJustifyContent';
import {paletteColor} from '../themes/Utility';
import CustomButton from './CustomButton';

interface IPropsBottomProduct {
  item: any;

  isVisible: boolean | undefined;
  onBackdropPress?(): void;
  onPressEdite: ((params: any) => any) | undefined;
  onPressDelete: ((params: any) => any) | undefined;
}

const BottomProduct = ({
  item,
  isVisible,
  onBackdropPress,
  onPressEdite,
  onPressDelete,
}: IPropsBottomProduct) => {
  return (
    <BottomSheetComponent
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}>
      <CustomText
        fontWeight="500"
        marginTop={5}
        marginBottom={15}
        fontSize={18}>
        Capture prise
      </CustomText>
      <Image
        source={{
          uri: `${item?.picture}`,
        }}
        style={{height: 110, resizeMode: 'stretch'}}
      />

      <View
        style={{
          flexDirection: 'column',
          marginTop: 10,
          alignItems: 'flex-start',
        }}>
        <View style={styles.categories}>
          <CustomText textAlign="center" color={paletteColor.RED} fontSize={11}>
            {item?.categories}
          </CustomText>
        </View>
        <CustomText textAlign="center">{item?.title}</CustomText>
        <CustomText textAlign="center" color={paletteColor.RED} fontSize={11}>
          {item?.price} FCFA
        </CustomText>
      </View>
      <RowJustifyContent
        justifyContent="space-around"
        marginBottom={'10%'}
        marginTop={'15%'}>
        <View style={{width: Dimensions.get('screen').width / 2.7}}>
          <CustomButton
            label="Supprimer"
            colorText={paletteColor.RED}
            backgroundColor="transparent"
            borderWidth={1}
            borderColor={paletteColor.RED}
            onPress={onPressDelete}
          />
        </View>
        <View style={{width: Dimensions.get('screen').width / 2.7}}>
          <CustomButton label="Editer" onPress={onPressEdite} />
        </View>
      </RowJustifyContent>
    </BottomSheetComponent>
  );
};

export default BottomProduct;

const styles = StyleSheet.create({
  cardNotif: {
    backgroundColor: paletteColor.WHITE,
    borderRadius: 13,
    elevation: 1,
    width: Dimensions.get('screen').width / 2.5,
    padding: 10,
    marginBottom: 10,
  },
  categories: {
    backgroundColor: paletteColor.GRAY_OPACITY,
    padding: 5,
    borderRadius: 8,
    marginRight: 5,
  },
});
