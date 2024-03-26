/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BodyProject from '../components/BodyProject';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import {paletteColor} from '../themes/Utility';
import {useInscription} from '../hooks/InscriptionProvider';
import {accountType, initialDataInscription} from '../utils/data';
import ChooseProfilInscription from './ChooseProfilInscription';
import FormulaireProfilInscription from './FormulaireProfilInscription';
import ChoosePeridInscription from './ChoosePeridInscription';
import StepperComponent from '../components/StepperComponent';
import {notifyMessage} from '../common/notifyMessage';

const InscriptionStepper = () => {
  const [active, setActive] = useState(0);
  const {inscriptionData, setInscriptionData} = useInscription();

  const handleStepper = () => {
    if (active === 0) {
      setActive(p => p + 1);
    }

    if (active === 1) {
      if (inscriptionData.accountType === accountType.PROFESSIONAL) {
        if (
          inscriptionData.businessName &&
          inscriptionData.email.length > 0 &&
          inscriptionData.firstName &&
          inscriptionData.lastName &&
          inscriptionData.password &&
          inscriptionData.phone
        ) {
          setActive(p => p + 1);
        } else {
          notifyMessage('Renseignez tous les champs svp !');
        }
      }

      if (inscriptionData.accountType === accountType.PERSONAL) {
        if (
          inscriptionData.email.length > 0 &&
          inscriptionData.firstName &&
          inscriptionData.lastName &&
          inscriptionData.password &&
          inscriptionData.phone
        ) {
          setActive(p => p + 1);
        } else {
          notifyMessage('Renseignez tous les champs svp !');
        }
      }
    }
  };

  return (
    <BodyProject
      title={active === 0 ? 'Inscription' : 'Retour'}
      onPress={() => {
        setActive(p => p - 1);
        setInscriptionData(initialDataInscription);
      }}
      verifPress={active !== 0 ? true : false}
      backgroundColor={paletteColor.WHITE}>
      <View>
        <CustomText
          textAlign="center"
          fontSize={18}
          fontWeight="500"
          marginTop={10}>
          Etape 0{active + 1}
        </CustomText>
        <CustomText textAlign="center" marginBottom={20}>
          Selectionnez votre type de profil
        </CustomText>
        <StepperComponent active={active} />
      </View>
      <ScrollView
        style={{marginHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        {active === 0 ? (
          <ChooseProfilInscription />
        ) : active === 1 ? (
          <FormulaireProfilInscription />
        ) : (
          <ChoosePeridInscription />
        )}

        {active !== 2 && (
          <View style={{marginVertical: 20}}>
            <CustomButton
              label="Suivant"
              backgroundColor={paletteColor.ORANGE}
              onPress={handleStepper}
            />
          </View>
        )}
      </ScrollView>
    </BodyProject>
  );
};

export default InscriptionStepper;
