/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Alert, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useInscription} from '../hooks/InscriptionProvider';
import {TYPES_PERIOD} from '../constants/Data';
import {subscriptionType, underSubscriptionType} from '../utils/data';
import {asyncGetToken, asyncPostPublicKey, asyncPostToken, asyncPostUserId} from '../services/asyncStorage';
import {
  authentificationLogin,
  createAccount,
  fetchPaymentSheetParams,
  saveSetupIntentStripe,
  subscriptionsStripe,
} from '../services/apiServices';
import {
  actionReducer,
  actionTypeReducer,
} from '../contexts/reducers/actionReducer';
import {notifyMessage} from '../common/notifyMessage';
import {paletteColor} from '../themes/Utility';
import CustomText from '../components/CustomText';
import CardAbonnement from '../components/CardAbonnement';
import CustomTextIcon from '../components/CustomTextIcon';
import BottomSheetComponent from '../components/BottomSheetComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/CustomButton';
import {renderActivityLoading} from '../common/activityLoading';
import {useStripe} from '@stripe/stripe-react-native';
import { useAuth } from '../hooks/AuthProvider';

const ChoosePeridInscription = () => {
  const navigation = useNavigation();
  const {inscriptionData, setInscriptionData} = useInscription();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const formData = new FormData();
  const [checkPeriod, setCheckPeriod] = useState(
    TYPES_PERIOD.mensuel as String,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [chooseType, setChooseType] = useState('');
  const {dispatchAuhtContext} = useAuth();
  const handleCheckPeriod = (item: String) => {
    setCheckPeriod(item);
    setInscriptionData({
      ...inscriptionData,
      subscriptionType:
        item === TYPES_PERIOD.mensuel
          ? subscriptionType.MONTHLY
          : subscriptionType.YEARLY,
    });
  };
  const handleInscription = async (choose: string) => {
    setChooseType(choose);
    setIsValidate(true);
    const token = await asyncGetToken();
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    setInscriptionData({...inscriptionData, underSubscriptionType: choose});
    formData.append('firstName', inscriptionData.firstName);
    formData.append('email', inscriptionData.email);
    formData.append('phone', inscriptionData.phone);
    formData.append('password', inscriptionData.password);
    formData.append('subscriptionType', inscriptionData.subscriptionType);
    formData.append('businessName', inscriptionData.businessName);
    formData.append('accountType', inscriptionData.accountType);
    formData.append(
      'underSubscriptionType',
      inscriptionData.underSubscriptionType,
    );

    formData.append(
      'picture',
      inscriptionData.file.uri !== null ? inscriptionData.file : null,
    );
    createAccount(formData, config)
      .then(async res => {
        setAccountId(res?.data?.id);
        setIsValidate(false);
        setIsVisible(true);
        const {setupIntent, ephemeralKey, customer, setupIntentId} =
          await fetchPaymentSheetParams(res?.data?.id);
        await saveSetupIntentStripe({
          accountId: res?.data?.id,
          setupIntentId,
        });
        await initPaymentSheet({
          merchantDisplayName: 'Example, Inc.',
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          setupIntentClientSecret: setupIntent,
        });
      })
      .catch((err: any) => {
        notifyMessage(err.response.data.message);

        setIsValidate(false);
      });
  };

  const handleSouscription = async () => {
  
    setIsValidate(true);
    const result = await authentificationLogin({
      "email" : inscriptionData.email,
      "password": inscriptionData.password
    });
        asyncPostToken(result.accessToken);
        asyncPostUserId(result.userId);
        asyncPostPublicKey(result.publicKey);
        dispatchAuhtContext(
          actionReducer(actionTypeReducer.SIGN_IN, result.accessToken),
        );
        setIsValidate(false);
      subscriptionsStripe({accountId: accountId})
      .then(res => {
        console.log('subscriptionsStripe', res);

        navigation.navigate('Login' as never);

        setIsValidate(false);
        notifyMessage('souscription effectue avec succes');
      })
      .catch((err: any) => {
        setIsValidate(false);
        notifyMessage('La souscription à echoué veuillez réessayer');
      });
  if (chooseType === underSubscriptionType.FREE) {
      setIsVisible(false);
      navigation.navigate('Login' as never);
    } else {
      setIsVisible(false);
      const {error} = await presentPaymentSheet();
      if (error) {
        if (error.code === 'Canceled') {
          navigation.navigate('Login' as never);
          notifyMessage('Le flux de paiement a été annulé');
        }
        Alert.alert(`${error.code}`, error.message);
        console.log(`Error : ${error?.message}`);
      } else {
        setIsValidate(true);
        subscriptionsStripe({accountId: accountId})
          .then(res => {
            console.log('subscriptionsStripe', res);
            navigation.navigate('Login' as never);
            setIsValidate(false);
            notifyMessage('souscription effectue avec succes');
          })
          .catch((err: any) => {
            setIsValidate(false);
            notifyMessage('La souscription à echoué veuillez réessayer');
          });
      }
    }
  };

  return (
    <View style={{marginVertical: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => handleCheckPeriod(TYPES_PERIOD.mensuel)}
          style={{
            width: 100,
            backgroundColor:
              checkPeriod === TYPES_PERIOD.mensuel
                ? paletteColor.ORANGE_OPACITY
                : paletteColor.GRAY_OPACITY,
            padding: '3%',
            borderRadius: 5,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderWidth: checkPeriod === TYPES_PERIOD.mensuel ? 1 : 0,
            borderColor: paletteColor.ORANGE,
          }}>
          <CustomText
            color={
              checkPeriod === TYPES_PERIOD.mensuel
                ? paletteColor.ORANGE
                : paletteColor.BLACK
            }
            textAlign="center">
            Mensuel
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleCheckPeriod(TYPES_PERIOD.annuel)}
          style={{
            width: 100,
            backgroundColor:
              checkPeriod === TYPES_PERIOD.annuel
                ? paletteColor.ORANGE_OPACITY
                : paletteColor.GRAY_OPACITY,
            padding: '3%',
            borderRadius: 5,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderWidth: checkPeriod === TYPES_PERIOD.annuel ? 1 : 0,
            borderColor: paletteColor.ORANGE,
          }}>
          <CustomText
            color={
              checkPeriod === TYPES_PERIOD.annuel
                ? paletteColor.ORANGE
                : paletteColor.BLACK
            }
            textAlign="center">
            Annuel
          </CustomText>
        </TouchableOpacity>
      </View>

      <CardAbonnement
        title="Standard"
        subTitle="0"
        onPress={() => handleInscription(underSubscriptionType.FREE)}
        isValidate={isValidate}>
        <CustomTextIcon
          color={paletteColor.ORANGE}
          nameIcon="check"
          title="1 carte"
        />
        <CustomTextIcon
          color={paletteColor.ORANGE}
          nameIcon="check"
          title="3 model"
        />
        <CustomTextIcon
          color={paletteColor.ORANGE}
          nameIcon="check"
          title="Fiche de rendez vous"
        />
      </CardAbonnement>
      <BottomSheetComponent
        isVisible={isVisible}
        justifyContent="center"
        alignItems="center">
        <MaterialCommunityIcons
          name="checkbox-marked-circle-outline"
          color={paletteColor.GREEN}
          size={50}
        />
        <CustomText textAlign="center" marginTop={10}>
          Félicitations, votre compte viens d'être crée
        </CustomText>
        <View
          style={{width: '100%', marginHorizontal: 10, marginVertical: '10%'}}>
          <CustomButton
            label={
              chooseType === underSubscriptionType.FREE
                ? (isValidate == true ? 'Patientez...': 'Decouvrir mon espace')
                : 'Souscription'
            }
            onPress={handleSouscription}
          />
        </View>
      </BottomSheetComponent>

      <CardAbonnement
        title="Premium"
        subTitle="10.000"
        onPress={() => handleInscription(underSubscriptionType.PREMIUM)}
        isValidate={isValidate}>
        <CustomTextIcon
          color={paletteColor.ORANGE}
          nameIcon="check"
          title="Model illimité"
        />

        <CustomTextIcon
          color={paletteColor.ORANGE}
          nameIcon="check"
          title="Création de model"
        />

        <CustomTextIcon
          color={paletteColor.ORANGE}
          nameIcon="check"
          title="Cartes illimite"
        />

        <CustomTextIcon
          color={paletteColor.ORANGE}
          nameIcon="check"
          title="Fiche de rendez vous"
        />

        <CustomTextIcon
          color={paletteColor.ORANGE}
          nameIcon="check"
          title="Accès à la boutique & services"
        />

        <CustomTextIcon
          color={paletteColor.ORANGE}
          nameIcon="check"
          title="Acces au portfolio"
        />
      </CardAbonnement>
      {renderActivityLoading(isValidate)}
    </View>
  );
};

export default ChoosePeridInscription;
