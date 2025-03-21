import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../components/CustomTextInput';
import SelectPictue from '../components/SelectPictue';
import {useInscription} from '../hooks/InscriptionProvider';
import {paletteColor} from '../themes/Utility';

interface FormulaireProfilInscriptionProps {
  errors?: Record<string, string>;
}

const FormulaireProfilInscription: React.FC<
  FormulaireProfilInscriptionProps
> = ({errors = {}}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const {inscriptionData, setInscriptionData} = useInscription();
  const [verifFile, setVerifFile] = useState<any>({
    camera: false,
    picker: false,
  });

  return (
    <KeyboardAwareScrollView>
      <SelectPictue
        title=""
        onChangeGallery={(image: {uri: any; type: any; name: string}) => {
          const file = image;
          setInscriptionData({...inscriptionData, file});
          setVerifFile({picker: true, camera: false});
        }}
        onChangeCamera={(image: {uri: any; type: any; name: string}) => {
          const file = image;
          setInscriptionData({...inscriptionData, file});
          setVerifFile({picker: false, camera: true});
        }}
        verifFile={verifFile}
      />

      <CustomTextInput
        onChangeText={e =>
          setInscriptionData({...inscriptionData, firstName: e})
        }
        title="Nom et prénoms"
        placeholder="Entrer votre nom et prénoms"
        error={errors.firstName}
      />

      <CustomTextInput
        title="Mot de passe"
        placeholder="*******************"
        verifIcon={true}
        secureTextEntry={secureTextEntry}
        colorIcon={paletteColor.ORANGE}
        onPress={() => setSecureTextEntry(!secureTextEntry)}
        onChangeText={e =>
          setInscriptionData({...inscriptionData, password: e})
        }
        error={errors.password}
      />

      <CustomTextInput
        onChangeText={e => setInscriptionData({...inscriptionData, email: e})}
        title="Email"
        placeholder="email@email.com"
        error={errors.email}
      />

      <CustomTextInput
        onChangeText={e => setInscriptionData({...inscriptionData, phone: e})}
        title="Telephone"
        placeholder="+22501000001"
        keyboardType="numeric"
        error={errors.phone}
      />
    </KeyboardAwareScrollView>
  );
};

export default FormulaireProfilInscription;
