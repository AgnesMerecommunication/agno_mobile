import {StyleSheet, View} from 'react-native';
import React from 'react';
import RowJustifyContent from './RowJustifyContent';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import {paletteColor} from '../themes/Utility';

const CardAbonnement = ({
  title,
  subTitle,
  onPress,
  isValidate,
  children,
}: {
  isValidate: boolean;
  title: String;
  subTitle: String;
  onPress: (params: any) => any;
  children: any;
}) => {
  return (
    <View style={[styles.cardNotif, {padding: '3%', paddingBottom: '5%'}]}>
      <RowJustifyContent>
        <CustomText fontWeight="bold">{title}</CustomText>
        <CustomText color="#A2261C" fontWeight="bold">
          {subTitle} Fcfa
        </CustomText>
      </RowJustifyContent>
      {children}
      <View style={{paddingVertical: '5%'}}>
        <CustomButton
          label="Choisir"
          onPress={onPress}
          disabled={isValidate}
          backgroundColor={
            isValidate ? paletteColor.ORANGE_OPACITY : paletteColor.ORANGE
          }
        />
      </View>
    </View>
  );
};

export default CardAbonnement;

const styles = StyleSheet.create({
  cardNotif: {
    marginVertical: '3%',
    backgroundColor: '#FAEFE9',
    borderRadius: 8,
    elevation: 1.1,
  },
});
