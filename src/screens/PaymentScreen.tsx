import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import BodyProject from '../components/BodyProject';
import {
  fetchPaymentSheeReplacement,
  getCardStripe,
  saveSetupIntentStripe,
  subscriptionsStripe,
} from '../services/apiServices';
import {asyncGetUserId} from '../services/asyncStorage';
import CustomText from '../components/CustomText';
import {paletteColor} from '../themes/Utility';
import {puce} from '../utils/images';
import {initPaymentSheet, useStripe} from '@stripe/stripe-react-native';
import {notifyMessage} from '../common/notifyMessage';
import {renderActivityLoading} from '../common/activityLoading';

const PaymentScreen = () => {
  const [cardData, setCardData] = useState<any>([]);
  const {presentPaymentSheet} = useStripe();
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
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
    });
  };

  useEffect(() => {
    getCard();
    initializePaymentSheet();
  }, []);

  const handleSubscribe = async () => {
    console.log('clique');
    const accountId = await asyncGetUserId();
      setIsValidate(true);
      subscriptionsStripe({accountId: accountId})
        .then(res => {
          console.log('subscriptionsStripe', res);
          getCard();
          setIsValidate(false);
          notifyMessage('souscription effectue avec succes');
        })
        .catch((err: any) => {
          setIsValidate(false);
          notifyMessage('La souscription à echoué veuillez réessayer');
          console.log(err);
        });
    const {error} = await presentPaymentSheet();

    if (error) {
      if (error.code === 'Canceled') {
        notifyMessage('Le flux de paiement a été annulé');
      }
      Alert.alert(`${error.code}`, error.message);
      console.log(`Error : ${error}`);
    } else {
      const accountId = await asyncGetUserId();

      setIsValidate(true);
      subscriptionsStripe({accountId: accountId})
        .then(res => {
          console.log('subscriptionsStripe', res);

          getCard();

          setIsValidate(false);
          notifyMessage('souscription effectue avec succes');
        })
        .catch((err: any) => {
          setIsValidate(false);
          notifyMessage('La souscription à echoué veuillez réessayer');
          console.log(err);
        });
    }
  };

  return (
    <BodyProject title="Retour">
      <ScrollView>
        <View style={styles.container}>
          <View></View>
          <View
            style={{
              height: 200,
              backgroundColor: '#222776',
              width: '100%',
              borderRadius: 5,
              marginBottom: '5%',
              padding: '5%',
            }}>
            <Image source={puce} style={{width: 100, height: 100}} />
            <View>
              <CustomText color={paletteColor.WHITE} fontSize={18}>
                **** **** **** {cardData?.card?.last4}
              </CustomText>
              <CustomText color={paletteColor.WHITE}>
                EXPIRE {cardData?.card?.exp_month}/{cardData?.card?.exp_year}
              </CustomText>
              <View style={{alignItems: 'flex-end'}}>
                <CustomText color={paletteColor.WHITE} fontSize={20}>
                  {cardData?.card?.brand}
                </CustomText>
              </View>
            </View>
          </View>

          <View style={{width: Dimensions.get('screen').width, padding: 20}}>
            <CustomButton
              label="SOUSCRIRE"
              borderRadius={8}
              onPress={handleSubscribe}
            />
          </View>
        </View>
      </ScrollView>
      {renderActivityLoading(isValidate)}
    </BodyProject>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1.5,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  expiryInput: {
    width: '45%',
  },
  cvvInput: {
    width: '45%',
  },
});

export default PaymentScreen;
