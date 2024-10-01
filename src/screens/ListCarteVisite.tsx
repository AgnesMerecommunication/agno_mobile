/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import CustomText from '../components/CustomText';
import {ModelCarte, TYPES_STYLE} from '../constants/Data';
import FloatingButton from '../components/FloatingButton';
import ModalCreateTemplate from '../components/ModalCreateTemplate';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {formateDate} from '../utils/formateDate';
import {searchData} from '../utils/searchData';
import {initializeListCard} from '../services/redux/reducerCard';
import {SafeAreaView} from 'react-native-safe-area-context';

const ListCarteVisite = () => {
  const [checkStyle, setCheckStyle] = useState(
    TYPES_STYLE.column as String | Boolean,
  );
  const [isVisibleBottom, setIsVisibleBottom] = useState(false);
  const [recherche, setRecherche] = useState('');
  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const cards: any = useAppSelector(state => state.cards.cards);
  const filterRecherche = searchData(recherche, cards, 'companyName');
  useEffect(() => {
    
    dispatch(initializeListCard());
  }, [dispatch]);
  const getRender = ({item}: any) => {
    var cardNumber = ModelCarte.filter(itemA=>itemA.id == item.modelId);
    return (<TouchableOpacity
      onPress={() =>
        navigation.navigate({
          name: 'DetailCarteVisite',
          params: item,
        } as never)
      }
      activeOpacity={0.8}
      style={{
        marginRight: 17,
        width: checkStyle === true ? '80%' : '100%',
        marginBottom: '5%',
        flexDirection:
          TYPES_STYLE.column === checkStyle
            ? 'column'
            : TYPES_STYLE.row === checkStyle
            ? 'row'
            : undefined,
      }}>
      <Image
        source={{
          uri: item.picture + '?' + new Date(),
        }}
        style={{
          resizeMode: TYPES_STYLE.column === checkStyle ? 'cover' : 'stretch',
         height: checkStyle === true ? 150 : (cardNumber.length == 0 ? 500 : (cardNumber[0].horizontal  == true ? 200 : 500) ) ,
          width:
            TYPES_STYLE.column === checkStyle
              ? '100%'
              : TYPES_STYLE.row === checkStyle
              ? '50%'
              : undefined, borderRadius : 10
        }}
      />

      <View
        style={{
          marginVertical: 10,
          marginHorizontal:
            TYPES_STYLE.column === checkStyle
              ? 0
              : TYPES_STYLE.row === checkStyle
              ? 10
              : undefined,
          width: TYPES_STYLE.row === checkStyle ? '50%' : '100%',
        }}>
        <CustomText fontWeight="600">
          Carte de visite {item.companyName == 'null' ? '' : item.companyName }
        </CustomText>
        <CustomText marginBottom={10} fontSize={13}>
          Date: {formateDate(new Date(item.createdAt))}
        </CustomText>
      </View>
    </TouchableOpacity>);
  }

  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 17}}>
        <CustomTextInput
          placeholder="Rechercher une carte de visite"
          verifIcon={true}
          borderWidth={0}
          backgroundColor="white"
          nameIcon="magnify"
          elevation={1.8}
          onChangeText={e => setRecherche(e)}
        />

       
        <FloatingButton
          title="Ajouter une carte"
          onPress={() => setIsVisibleBottom(true)}
          top={
            Platform.OS === 'android'
              ? Dimensions.get('screen').height / 1.8
              : Dimensions.get('screen').height / 1.6
          }
        />
        <ModalCreateTemplate
          isVisible={isVisibleBottom}
          onBackdropPress={() => setIsVisibleBottom(false)}
          onPressTemplate={() => {
            setIsVisibleBottom(false);
            navigation.navigate('TemplateCarte' as never);
          }}
          onPressScan={() => {
            setIsVisibleBottom(false);
            navigation.navigate('Scan' as never);
          }}
          onPressPhoto={() => {
            setIsVisibleBottom(false);
            navigation.navigate('Photo' as never);
          }}
        />

         <View style={{marginBottom : 12}}/>
        {checkStyle === true ? (
          <FlatList
            key={'_'}
            columnWrapperStyle={{marginRight: 10}}
            horizontal={false}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            data={filterRecherche}
            renderItem={getRender}
            showsVerticalScrollIndicator={false}
            contentInset={{top: 0, bottom: 500, left: 0, right: 0}}
            contentContainerStyle={{paddingBottom: 600}}
          />
        ) : (
          <FlatList
            contentInset={{top: 0, bottom: 500, left: 0, right: 0}}
            contentContainerStyle={{paddingBottom: 600}}
            keyExtractor={item => item.id.toString()}
            data={filterRecherche}
            renderItem={getRender}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ListCarteVisite;
