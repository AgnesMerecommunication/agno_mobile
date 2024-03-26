/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Alert, FlatList, Image, View, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import BodyProject from '../components/BodyProject';
import CustomTextInput from '../components/CustomTextInput';
import CustomText from '../components/CustomText';
import FloatingButton from '../components/FloatingButton';
import {CartData, ModelCarte} from '../constants/Data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomCircle from '../components/CustomCircle';
import {paletteColor} from '../themes/Utility';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../services/redux/hooks';
import {underSubscriptionType} from '../utils/data';
import {notifyMessage} from '../common/notifyMessage';
import {initPaymentSheet, useStripe} from '@stripe/stripe-react-native';
import {
  fetchPaymentSheetParams,
  saveSetupIntentStripe,
  subscriptionsStripe,
} from '../services/apiServices';
import {asyncGetUserId} from '../services/asyncStorage';
import {renderActivityLoading} from '../common/activityLoading';


const TemplateCarteListHorizontal = () => {
  const [DATA_CARTE, setDATA_CARTE] = useState(ModelCarte.filter((item)=>item.horizontal == true));
  const [recupTemplate, setRecupTemplate] = useState<CartData | null>(null);
  const navigation = useNavigation();
  const user: any = useAppSelector(state => state.user.users);
  const cards: any = useAppSelector(state => state.cards.cards);
  const {presentPaymentSheet} = useStripe();
  const [isValidate, setIsValidate] = useState(false);


  const initializePaymentSheet = async () => {
    const userId = await asyncGetUserId();
    const {setupIntent, ephemeralKey, customer, setupIntentId} =
      await fetchPaymentSheetParams(userId as string);
    await saveSetupIntentStripe({accountId: userId, setupIntentId});

    await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
    });
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const handleCarte = (item: CartData) => {
    setDATA_CARTE(
      DATA_CARTE.map(val =>
        val.id === item.id
          ? {...item, checked: true}
          : {...val, checked: false},
      ),
    );
    setRecupTemplate(item);
  };
  const getRender = ({item}: any) => (
    <TouchableOpacity
      style={{
        width: '100%',
        marginTop: '5%', borderRadius : 20
      }}
      onPress={() => handleTemplate(item)}>
      <View style={{alignItems: 'flex-end', top: 20, zIndex: 1, borderRadius : 20}}>
        {item.checked === true && (
          <CustomCircle
            disabled={true}
            borderColor={paletteColor.ORANGE}
            size={30}
            backgroundColor={paletteColor.ORANGE}
            borderRadius={30}
            borderWidth={1}>
            <MaterialCommunityIcons
              name="check"
              size={25}
              color={paletteColor.WHITE}
            />
          </CustomCircle>
        )}
      </View>
      <Image source={item.mod} style={{height: item.horizontal == true ? 200 : 500, width: '100%',borderRadius : 10}} />
    </TouchableOpacity>
  );
  const handleTemplate = async (recupTemplate : any) => {
   // const verifyTemplate = DATA_CARTE.find(val => val.checked === true);
    /*navigation.navigate({
      name: 'FormulaireCarte',
      params: {recupTemplate},
    } as never);*/
 //   Alert.alert("Test", JSON.stringify(verifyTemplate));
    if (
      user?.underSubscriptionType === underSubscriptionType.FREE ||
      user?.underSubscriptionType === underSubscriptionType.PREMIUM_LAPSED
    ) {
      if (cards.length > 0) {
        const accountId = await asyncGetUserId();

        setIsValidate(true);
       subscriptionsStripe({accountId: accountId})
          .then(res => {
            console.log('subscriptionsStripe', res);

            // navigation.navigate('Login' as never);

            setIsValidate(false);
            notifyMessage('souscription effectue avec succes');
          })
          .catch((err: any) => {
            setIsValidate(false);
            notifyMessage('La souscription à echoué veuillez réessayer');
            console.log(err);
          });
        notifyMessage(
          'Vous ne pouvez plus creer de carte de visite passé en mode premium',
        );
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

              // navigation.navigate('Login' as never);

              setIsValidate(false);
              notifyMessage('souscription effectue avec succes');
            })
            .catch((err: any) => {
              setIsValidate(false);
              notifyMessage('La souscription à echoué veuillez réessayer');
              console.log(err);
            });
        }
      }
      // && verifyTemplate
      if (cards.length === 0) {
        navigation.navigate({
          name: 'FormulaireCarte',
          params: {recupTemplate},
        } as never);
      }
      //&& verifyTemplate === undefined
      if (cards.length === 0 ) {
        notifyMessage('Veuillez choisir un mode de carte svp !');
      }
    }
    if (user?.underSubscriptionType === underSubscriptionType.PREMIUM) {
      navigation.navigate({
        name: 'FormulaireCarte',
        params: {recupTemplate},
      } as never);
      /*if (verifyTemplate) {
       
      } else {
        notifyMessage('Veuillez choisir un mode de carte svp !');
      }*/
    }
  };
  
  return (
    <>
      <View style={{marginHorizontal: 17}}>
        <CustomText fontWeight="bold" marginTop={12} fontSize={18} textAlign="center">
          Choisissez une carte
        </CustomText>
        <CustomTextInput
          marginTop={-5}
          placeholder="Rechercher une carte de visite"
          verifIcon={true}
          borderWidth={0}
          backgroundColor="white"
          nameIcon="magnify"
          elevation={1.8}
        />
        {/*<FloatingButton
          title="Valider ce template"
          width={'90%'}
          onPress={handleTemplate}
        />*/}
        <FlatList
          contentInset={{top: 0, bottom: 220, left: 0, right: 0}}
          contentContainerStyle={{paddingBottom: 600}}
          keyExtractor={item => item.id.toString()}
          data={ user?.underSubscriptionType === underSubscriptionType.FREE
              ? DATA_CARTE.slice(0, 3)
              : DATA_CARTE
          }
          renderItem={getRender}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {renderActivityLoading(isValidate)}
    </>
  );
};

export default TemplateCarteListHorizontal;
