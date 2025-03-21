/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {notifyMessage} from '../common/notifyMessage';
import BodyProject from '../components/BodyProject';
import CustomButton from '../components/CustomButton';
import {
  actionReducer,
  actionTypeReducer,
} from '../contexts/reducers/actionReducer';
import {useAuth} from '../hooks/AuthProvider';
import {useInscription} from '../hooks/InscriptionProvider';
import {createAccount} from '../services/apiServices';
import {
  asyncPostPublicKey,
  asyncPostToken,
  asyncPostUserId,
} from '../services/asyncStorage';
import {paletteColor} from '../themes/Utility';
import FormulaireProfilInscription from './FormulaireProfilInscription';

const Register = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {inscriptionData, setInscriptionData} = useInscription();
  const navigation = useNavigation();
  const [isValidate, setIsValidate] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {dispatchAuhtContext} = useAuth();

  useEffect(() => {
    return () => {
      // Cleanup function
      setIsValidate(false);
      setErrors({});
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!inscriptionData.firstName?.trim()) {
      newErrors.firstName = 'Le nom est requis';
    }
    if (!inscriptionData.email?.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(inscriptionData.email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!inscriptionData.phone?.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }
    if (!inscriptionData.password?.trim()) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (inscriptionData.password.length < 6) {
      newErrors.password =
        'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInscription = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsValidate(true);
      const formData = new FormData();

      formData.append('firstName', inscriptionData.firstName.trim());
      formData.append('email', inscriptionData.email.trim());
      formData.append('phone', inscriptionData.phone.trim());
      formData.append('password', inscriptionData.password);
      formData.append('subscriptionType', inscriptionData.subscriptionType);
      formData.append('accountType', inscriptionData.accountType);
      formData.append(
        'underSubscriptionType',
        inscriptionData.underSubscriptionType || 'free',
      );

      if (inscriptionData.file?.uri) {
        formData.append('picture', inscriptionData.file);
      }

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await createAccount(formData, config);

      if (response?.data) {
        const {accessToken, userId, publicKey} = response.data;

        await Promise.all([
          asyncPostToken(accessToken),
          asyncPostUserId(userId),
          asyncPostPublicKey(publicKey),
        ]);

        dispatchAuhtContext(
          actionReducer(actionTypeReducer.SIGN_IN, accessToken),
        );
        navigation.navigate('StackHome' as never);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Une erreur est survenue';
      notifyMessage(errorMessage);
    } finally {
      setIsValidate(false);
    }
  };

  return (
    <BodyProject title={'Inscription'} backgroundColor={paletteColor.WHITE}>
      <ScrollView
        style={{marginHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        <Text style={{textAlign: 'center', marginTop: 15, fontSize: 18}}>
          Créer un compte et bénéficier de plusieurs cartes de visite gratuites
        </Text>

        <FormulaireProfilInscription errors={errors} />

        <View style={{marginVertical: 20}}>
          <CustomButton
            label={isValidate ? 'Patientez...' : "S'inscrire"}
            onPress={handleInscription}
            disabled={isValidate}
          />
        </View>
      </ScrollView>
    </BodyProject>
  );
};

export default Register;
