import React, {useState} from 'react';
import {paletteColor} from '../themes/Utility';
import CustomTextInput from '../components/CustomTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectPictue from '../components/SelectPictue';
import {accountType} from '../utils/data';
import {useInscription} from '../hooks/InscriptionProvider';

const FormulaireProfilInscription = () => {
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

      {inscriptionData.accountType === accountType.PROFESSIONAL && (
        <CustomTextInput
          title="Raison sociale"
          placeholder="Entreprise SA"
          onChangeText={e =>
            setInscriptionData({...inscriptionData, businessName: e})
          }
        />
      )}
      <CustomTextInput
        onChangeText={e =>
          setInscriptionData({...inscriptionData, firstName: e})
        }
        title="Nom"
        placeholder="nom"
      />
      <CustomTextInput
        onChangeText={e =>
          setInscriptionData({...inscriptionData, lastName: e})
        }
        title="Prenom"
        placeholder="prenom"
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
      />
      {/* <CustomTextInput
          title="Confirme mot de passe"
          placeholder="*******************"
          verifIcon={true}
          secureTextEntry={secureTextEntry}
          colorIcon={paletteColor.ORANGE}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        /> */}

      <CustomTextInput
        onChangeText={e => setInscriptionData({...inscriptionData, email: e})}
        title="Email"
        placeholder="email@email.com"
      />
      <CustomTextInput
        onChangeText={e => setInscriptionData({...inscriptionData, phone: e})}
        title="Telephone"
        placeholder="+22501000001"
        keyboardType="numeric"
      />
    </KeyboardAwareScrollView>
  );
};
export default FormulaireProfilInscription;
