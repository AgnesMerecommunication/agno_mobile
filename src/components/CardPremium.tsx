import {initPaymentSheet, useStripe} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {CheckCircleIcon} from 'react-native-heroicons/outline';
import {renderActivityLoading} from '../common/activityLoading';
import {notifyMessage} from '../common/notifyMessage';
import {
  fetchPaymentSheeReplacement,
  getCardStripe,
  saveSetupIntentStripe,
  subscriptionsStripe,
} from '../services/apiServices';
import {asyncGetUserId} from '../services/asyncStorage';
import {useAppDispatch} from '../services/redux/hooks';
import {initializeInfoUser} from '../services/redux/reducerUser';
import {paletteColor} from '../themes/Utility';
import CustomButton from './CustomButton';

export default function CardPremium({
  _modal,
  close,
}: {
  _modal?: boolean;
  close?: Function;
}) {
  const dispatch = useAppDispatch();
  const {presentPaymentSheet} = useStripe();
  const [_cardData, setCardData] = useState<any>([]);
  const [isValidate, setIsValidate] = useState(false);

  const getCard = async () => {
    const accountId = await asyncGetUserId();
    getCardStripe(accountId as string)
      .then(res => setCardData(res.data))
      .catch((err: any) => console.log('err', err?.response?.data));
  };

  const initializePaymentSheet = async () => {
    const accountId = await asyncGetUserId();
    const {setupIntent, ephemeralKey, customer, setupIntentId} =
      await fetchPaymentSheeReplacement(accountId as string);
    await saveSetupIntentStripe({accountId: accountId, setupIntentId});
    await initPaymentSheet({
      merchantDisplayName: 'Agnes Mère Communication',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
    });
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const handleSubscribe = async () => {
    const accountId = await asyncGetUserId();
    setIsValidate(true);
    subscriptionsStripe({accountId: accountId})
      .then(_res => {
        getCard();
        setIsValidate(false);
        notifyMessage('souscription effectue avec succes');
        dispatch(initializeInfoUser());
        if (close) {
          close();
        }
      })
      .catch((err: any) => {
        setIsValidate(false);
        notifyMessage('La souscription à echoué veuillez réessayer');
        console.log(err);
      });
    const {error} = await presentPaymentSheet({});

    if (error) {
      if (error.code === 'Canceled') {
        notifyMessage('Le flux de paiement a été annulé');
      } else {
        Alert.alert(`${error.code}`, error.message);
      }
      console.log(`Error : ${error}`);
    } else {
      const accountId = await asyncGetUserId();
      setIsValidate(true);
      subscriptionsStripe({accountId: accountId})
        .then(_res => {
          notifyMessage('souscription effectue avec succes');
          dispatch(initializeInfoUser());
          getCard();
          setIsValidate(false);
          if (close) {
            close();
          }
        })
        .catch((err: any) => {
          setIsValidate(false);
          notifyMessage('La souscription à echoué veuillez réessayer');
          console.log(err);
        });
    }
  };

  const Feature = ({text}: {text: string}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
        paddingHorizontal: 10,
      }}>
      <CheckCircleIcon
        color={paletteColor.ORANGE}
        size={20}
        style={{marginRight: 8}}
      />
      <Text
        style={{
          flex: 1,
          color: '#333',
          fontSize: 14,
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </View>
  );

  return (
    <View style={{padding: 12}}>
      <View style={{alignItems: 'center', marginBottom: 16}}>
        <Text
          style={{
            color: paletteColor.ORANGE,
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 4,
          }}>
          Mode Premium
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            marginBottom: 8,
          }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: paletteColor.ORANGE,
            }}>
            45$
          </Text>
          <Text style={{marginLeft: 4, color: '#666'}}>/an</Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#666',
            fontSize: 14,
            marginBottom: 12,
          }}>
          Accès illimité pendant 1 an
        </Text>
      </View>

      <CustomButton
        label="SOUSCRIRE MAINTENANT"
        borderRadius={12}
        onPress={handleSubscribe}
        backgroundColor={paletteColor.ORANGE}
        height={48}
      />

      <View
        style={{
          backgroundColor: '#f8f8f8',
          padding: 16,
          borderRadius: 12,
          marginTop: 16,
        }}>
        <Feature text="✨ Cartes de visite illimitées" />
        <Feature text="🌐 Site web professionnel" />
        <Feature text="📱 Partage NFC instantané" />
        <Feature text="📊 Statistiques avancées" />
      </View>

      {renderActivityLoading(isValidate)}
    </View>
  );
}
