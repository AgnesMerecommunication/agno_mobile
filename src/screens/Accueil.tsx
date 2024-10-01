/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {paletteColor} from '../themes/Utility';
import CustomText from '../components/CustomText';
import {ScrollView} from 'react-native-gesture-handler';
import * as Icons from "react-native-heroicons/outline";
import RowJustifyContent from '../components/RowJustifyContent';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {
  initializeListCard,
  initializeListCardSave,
} from '../services/redux/reducerCard';
import {renderActivityLoading} from '../common/activityLoading';
import {
  initializeListCategorie,
  initializeListProduct,
} from '../services/redux/reducerProducts';
import {
  initializeListEvent,
  removeOneEvent,
} from '../services/redux/reducerAgenda';
import CardAgenda from '../components/CardAgenda';
import BottomAgenda from '../components/BottomAgenda';
import {
  initializeInfoUser,
  initializeListCountry,
} from '../services/redux/reducerUser';
import {person} from '../utils/images';
import {searchData} from '../utils/searchData';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrincipalCard from '../components/PrincipalCard';
import { productType, underSubscriptionType } from '../utils/data';
import HomePremiumModal from '../components/HomePremiumModal';
import NfcManager from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
NfcManager.start();



const Accueil = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [recherche, setRecherche] = useState('');
  const cardsSave: any = useAppSelector(state => state.cards.cardSaves);
  const filterRechercheSave = searchData(recherche, cardsSave, 'companyName');

  const cards = useAppSelector(state => state.cards.cards);
  const user: any = useAppSelector(state => state.user.users);
  const filterRecherche = searchData(recherche, cards, 'companyName');

  const events: any = useAppSelector(state => state.agenda.agendas);
  const isLoading: boolean = useAppSelector(state => state.cards.isLoading);
  const isLoadingAgenda: boolean = useAppSelector(
    state => state.agenda.isLoading,
  );

  const products: any = useAppSelector(state => state.products.products);
  const productTrie = products.filter(
    (product: {type: string}) => product.type === productType.PRODUCT,
  );
  const servicesTrie = products.filter(
    (product: {type: string}) => product.type === productType.SERVICE,
  );


  const filterRechercheProduct = searchData(recherche, productTrie, 'categories');
  const filterRechercheServices = searchData(recherche, servicesTrie, 'categories');

  const [isVisibleBottomAgenda, setIsVisibleBottomAgenda] = useState(false);
  const [recupData, setRecupData] = useState<any>(null);
  const onRefresh = () => {
    dispatch(initializeListCard());
    dispatch(initializeListEvent(1, 3));
    dispatch(initializeListCategorie());
    dispatch(initializeListCountry());
    dispatch(initializeListProduct());
    dispatch(initializeInfoUser());
    dispatch(initializeListCardSave());

  };

  useEffect(onRefresh, [dispatch]);

  const handleDelete = (id: string) => {
    setIsVisibleBottomAgenda(false);
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
            //@ts-ignore
            dispatch(removeOneEvent(id, navigation));
          },
        },
      ],
    );
  };
 
  
 
  return (
    <SafeAreaView style={{padding : 0, flex : 1, paddingTop : 0}}>
      {renderActivityLoading(isLoading && isLoadingAgenda)}
      <View style={{height:12}}></View>
      {user?.underSubscriptionType == underSubscriptionType.FREE && <HomePremiumModal/>}

      <ScrollView
        style={{marginHorizontal: 17}}
        showsVerticalScrollIndicator={false}>
        <RowJustifyContent alignItems="center">
          <View style={{width: '75%'}}>
            <CustomText marginTop={10}>Content de vous revoir🥳</CustomText>
            <CustomText fontWeight="bold" marginBottom={5}>
              {user?.firstName}
            </CustomText>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{width : 45,height : 45, borderRadius : 50,overflow : 'hidden'}}
              onPress={() => navigation.navigate('Profil' as never)}>
              <Image source={ user?.picture ? {uri: user?.picture + '?' + new Date(), }  : person } style={{height : '100%', width : '100%'}}/>
            </TouchableOpacity>
          </View>
        </RowJustifyContent>
        <PrincipalCard/>
        <RowJustifyContent marginTop={15} marginBottom={25}>
          <CustomText fontWeight="bold" fontSize={18}>
            Rendez vous du jour
          </CustomText>
        </RowJustifyContent>
        {events.length == 0  &&  <Pressable onPress={()=>navigation.navigate('CreateEvenement' as never)} 
          style={{borderColor : paletteColor.ORANGE, borderStyle : 'dashed', borderRadius : 10, 
                  alignItems : 'center', alignContent : 'center', padding : 12, 
                  marginVertical : 10, borderWidth : 1}}>
               <Text style={{color : paletteColor.BLACK}}>Ajouter un rendez-vous</Text>
          </Pressable>}

        {events.map((item: any) => (
          <CardAgenda
            key={item.id}
            item={item}
            onPress={() => {
              setRecupData(item);
              setIsVisibleBottomAgenda(true);
            }}
          />
        ))}
        <BottomAgenda
          item={recupData}
          onPressEdite={() => {
            setIsVisibleBottomAgenda(false);
            navigation.navigate({
              name: 'CreateEvenement',
              params: {update: true, dataUpdate: recupData},
            } as never);
          }}
          onPressDelete={() => handleDelete(recupData.id)}
          isVisible={isVisibleBottomAgenda}
          onBackdropPress={() => setIsVisibleBottomAgenda(false)}
        />
         <RowJustifyContent marginTop={15} marginBottom={25}>
          <CustomText fontWeight="bold" fontSize={18}>
           Statistiques
          </CustomText>
        </RowJustifyContent>
        <View style={{flexDirection : 'row'}}>
          <View 
            style={{backgroundColor : 'white',
            marginLeft :0,padding : 12,marginRight : 6,width : '50%',
            borderStyle : 'dashed', borderRadius : 10
          }}
            >
            <Icons.CreditCardIcon size={30} color={paletteColor.ORANGE}/>
            <Text style={{fontWeight : 'bold', fontSize : 17, color : paletteColor.BLACK}}>{filterRecherche.length} Cartes</Text>
          </View>
          <View 
            style={{backgroundColor : 'white',
            marginRight :0,padding : 12,width : '50%',
            borderStyle : 'dashed', borderRadius : 10, marginLeft : 6}}
          >
              <Icons.UserGroupIcon size={30} color={paletteColor.ORANGE}/>
              <Text style={{fontWeight : 'bold', fontSize : 17, color : paletteColor.BLACK}}>{filterRechercheSave.length} Connaissances</Text>
          </View>
        </View> 
        <View style={{flexDirection : 'row', marginTop : 12}}>
          <View 
            style={{backgroundColor : 'white',
            marginLeft :0,padding : 12,marginRight : 6,width : '50%',
            borderStyle : 'dashed', borderRadius : 10
          }}
            >
            <Icons.ShoppingCartIcon size={30} color={paletteColor.ORANGE}/>
            <Text style={{fontWeight : 'bold', fontSize : 17, color : paletteColor.BLACK}}>{filterRechercheProduct.length} Produits</Text>
          </View>
          <View 
            style={{backgroundColor : 'white',
            marginRight :0,padding : 12,width : '50%',
            borderStyle : 'dashed', borderRadius : 10, marginLeft : 6}}
          >
              <Icons.ClipboardIcon size={30} color={paletteColor.ORANGE}/>
              <Text style={{fontWeight : 'bold', fontSize : 17, color : paletteColor.BLACK}}>{filterRechercheServices.length} Services</Text>
          </View>
        </View>
        <View style={{height:35}}>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accueil;

const styles = StyleSheet.create({
  imgProfil: {
    resizeMode: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    marginTop: '4%',
  },
  separator: {
    marginTop: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: paletteColor.GRAY,
  },
  cardNotif: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 1.1,
    padding: 15,
  },
});
