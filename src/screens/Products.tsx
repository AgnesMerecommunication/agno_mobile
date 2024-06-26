/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FloatingButton from '../components/FloatingButton';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {paletteColor} from '../themes/Utility';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import BottomProduct from '../components/BottomProduct';
import {renderActivityLoading} from '../common/activityLoading';
import {removeOneProduct} from '../services/redux/reducerProducts';
import {searchData} from '../utils/searchData';
import {productType, underSubscriptionType} from '../utils/data';
import {notifyMessage} from '../common/notifyMessage';
import Entypo from 'react-native-vector-icons/Entypo';
import {asyncGetPublicKey, asyncGetUserId} from '../services/asyncStorage';
import {launchUrl} from '../common/launchUrl';
import {initPaymentSheet, useStripe} from '@stripe/stripe-react-native';
import {
  fetchPaymentSheetParams,
  saveSetupIntentStripe,
  subscriptionsStripe,
} from '../services/apiServices';

const Products = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const [isVisibleBottom, setIsVisibleBottom] = useState(false);
  const [recupData, setRecupData] = useState<any>(null);
  const [recherche, setRecherche] = useState('');
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

  const products: any = useAppSelector(state => state.products.products);
  const productTrie = products.filter(
    (product: {type: string}) => product.type === productType.PRODUCT,
  );

  const filterRecherche = searchData(recherche, productTrie, 'categories');
  const user: any = useAppSelector(state => state.user.users);
  const isLoading: any = useAppSelector(state => state.products.isLoading);

  const handleDelete = (id: string) => {
    setIsVisibleBottom(false);
    Alert.alert(
      'INFORMATION',
      'Voulez vous vraiment supprimer cette carte ? ',
      [
        {
          text: 'Annuler',
        },
        {
          text: 'Oui',
          onPress: () => {
            dispatch(removeOneProduct(id, navigation));
          },
        },
      ],
    );
  };
  const getRender = ({item}: any) => (
    <TouchableOpacity
      style={styles.cardNotif}
      onPress={() => {
        setRecupData(item);
        setIsVisibleBottom(true);
      }}>
      <Image
        source={{
          uri: item.picture ? item.picture + '?' + new Date() : undefined,
        }}
        style={{height: 110, resizeMode: 'stretch'}}
      />
      <View
        style={{
          flexDirection: 'column',
          marginTop: 10,
          alignItems: 'flex-start',
        }}>
        <View style={styles.categories}>
          <CustomText textAlign="center" color={paletteColor.RED} fontSize={11}>
            {item.categories}
          </CustomText>
        </View>
        <CustomText textAlign="center">{item.title}</CustomText>
        <CustomText textAlign="center" color={paletteColor.RED} fontSize={11}>
          {item.price} FCFA
        </CustomText>
      </View>
    </TouchableOpacity>
  );

  const handleCreate = async () => {
    /*navigation.navigate({
      name: 'CreateProduit',
      params: {type: productType.PRODUCT},
    } as never);*/
    if (
      user?.underSubscriptionType === underSubscriptionType.FREE ||
      user?.underSubscriptionType === underSubscriptionType.PREMIUM_LAPSED
    ) {
      notifyMessage(
        'Vous ne pouvez pas ajouter de produit passé en mode premium',
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
    } else {
      navigation.navigate({
        name: 'CreateProduit',
        params: {type: productType.PRODUCT},
      } as never);
    }
  };

  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 17}}>
        <CustomTextInput
          placeholder="Rechercher un produit"
          verifIcon={true}
          borderWidth={0}
          backgroundColor="white"
          nameIcon="magnify"
          elevation={1.8}
          onChangeText={e => setRecherche(e)}
        />

        {user?.underSubscriptionType === underSubscriptionType.PREMIUM ? (
          <FloatingButton
            title={<Entypo name="share" size={15} color={paletteColor.WHITE} />}
            onPress={async () => {
              const userId = await asyncGetPublicKey();
              launchUrl(
                `https://agno.vercel.app/${userId}`,
              );
            }}
            top={
              Platform.OS === 'android'
                ? Dimensions.get('screen').height / 2.1
                : Dimensions.get('screen').height / 1.6
            }
          />
        ) : null}

        <FloatingButton
          title="Ajouter un produit"
          onPress={handleCreate}
          top={
            Platform.OS === 'android'
              ? Dimensions.get('screen').height / 1.8
              : Dimensions.get('screen').height / 1.6
          }
        />
        <FlatList
          style={{marginTop: 10}}
          key={'_'}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          horizontal={false}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          data={filterRecherche}
          renderItem={getRender}
          showsVerticalScrollIndicator={false}
          contentInset={{
            top: 0,
            bottom: 300,
            left: 0,
            right: 0,
          }}
          contentContainerStyle={{paddingBottom: 600}}
        />
        {renderActivityLoading(isLoading)}

        <BottomProduct
          item={recupData}
          onPressEdite={() => {
            setIsVisibleBottom(false);
            navigation.navigate({
              name: 'CreateProduit',
              params: {
                update: true,
                dataUpdate: recupData,
                type: productType.PRODUCT,
              },
            } as never);
          }}
          onPressDelete={() => handleDelete(recupData.id)}
          isVisible={isVisibleBottom}
          onBackdropPress={() => setIsVisibleBottom(false)}
        />
      </View>

      {renderActivityLoading(isValidate)}
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  cardNotif: {
    backgroundColor: paletteColor.WHITE,
    borderRadius: 13,
    elevation: 1,
    width: Dimensions.get('screen').width / 2.5,
    padding: 10,
    marginBottom: 10,
  },
  categories: {
    backgroundColor: paletteColor.GRAY_OPACITY,
    padding: 5,
    borderRadius: 8,
    marginRight: 5,
  },
});
