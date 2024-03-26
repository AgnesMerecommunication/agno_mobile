import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BottomSheetComponent from './BottomSheetComponent';
import {paletteColor} from '../themes/Utility';
import CustomText from './CustomText';
import RowJustifyContent from './RowJustifyContent';

interface ModalCreateTemplateProps {
  isVisible: boolean | undefined;
  onBackdropPress?(): void;
  onPressTemplate:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
  onPressScan:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
  onPressPhoto:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
}

const ModalCreateTemplate = ({
  isVisible,
  onBackdropPress,
  onPressTemplate,
  onPressScan,
  onPressPhoto,
}: ModalCreateTemplateProps) => {
  return (
    <BottomSheetComponent
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}>
      <CustomText fontWeight="bold" fontSize={15} textAlign="center">
        Créer une carte à partir de :
      </CustomText>

      <TouchableOpacity onPress={onPressTemplate}>
        <RowJustifyContent justifyContent="flex-start" marginTop={25}>
          <View style={styles.viewCarte} />
          <View style={{width: '80%', marginLeft: 10}}>
            <CustomText color={paletteColor.ORANGE} fontSize={12}>
              Créer une carte
            </CustomText>
            <CustomText>
              Créer votre carte à travers plusieurs Templates et modèles à votre
              disposition
            </CustomText>
            <View style={styles.separator} />
          </View>
        </RowJustifyContent>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressScan}>
        <RowJustifyContent justifyContent="flex-start" marginTop={25}>
          <View style={styles.viewCarte} />

          <View style={{width: '80%', marginLeft: 10}}>
            <CustomText color={paletteColor.ORANGE} fontSize={12}>
              Scanner une carte
            </CustomText>
            <CustomText>
              Scanner le code Qr d’une carte Prise (carte d’un partenaire ou
              collaborateur) pour le garder dans vos différentes cartes ou
              historiques{' '}
            </CustomText>
            <View style={styles.separator} />
          </View>
        </RowJustifyContent>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressPhoto}>
        <RowJustifyContent
          justifyContent="flex-start"
          marginTop={35}
          marginBottom={'25%'}>
          <View style={styles.viewCarte} />

          <View style={{width: '80%', marginLeft: 10}}>
            <CustomText color={paletteColor.ORANGE} fontSize={12}>
              Prendre la photo d’une carte
            </CustomText>
            <CustomText>
              Prenez la photo d’une carte physique (carte d’un partenaire ou
              collaborateur) pour le garder dans vos différentes cartes prises
              ou historiques{' '}
            </CustomText>
          </View>
        </RowJustifyContent>
      </TouchableOpacity>
    </BottomSheetComponent>
  );
};

export default ModalCreateTemplate;

const styles = StyleSheet.create({
  separator: {
    marginTop: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: paletteColor.GRAY,
  },
  viewCarte: {
    width: 50,
    height: 50,
    backgroundColor: paletteColor.ORANGE_OPACITY,
    borderRadius: 50,
  },
});
