/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import RowJustifyContent from '../components/RowJustifyContent';
import CustomText from '../components/CustomText';
import {ModelCarte, TYPES_STYLE} from '../constants/Data';
import {paletteColor} from '../themes/Utility';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
    var cardNumber = ModelCarte.filter(itemA=>itemA.id == item.modelId)[0];
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
          height: checkStyle === true ? 150 : (cardNumber.horizontal == true ? 200 : 500 ) ,
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

        {/*<RowJustifyContent
          justifyContent="space-between"
          alignItems="center"
          marginBottom={10}
          marginTop={10}>
          <CustomText>Type d'affichage</CustomText>
          <View style={{width: Dimensions.get('screen').width / 2}}>
            <RowJustifyContent justifyContent="space-around">
              <TouchableOpacity
                onPress={() => handleCheckType(TYPES_STYLE.column)}
                style={{
                  width: 50,
                  backgroundColor:
                    checkStyle === TYPES_STYLE.column
                      ? paletteColor.ORANGE_OPACITY
                      : paletteColor.GRAY_OPACITY,
                  padding: '3%',
                  borderRadius: 5,
                  borderWidth: checkStyle === TYPES_STYLE.column ? 1 : 0,
                  borderColor: paletteColor.ORANGE,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="application"
                  size={15}
                  color={
                    checkStyle === TYPES_STYLE.column
                      ? paletteColor.ORANGE
                      : paletteColor.BLACK
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCheckType(TYPES_STYLE.row)}
                style={{
                  width: 50,
                  backgroundColor:
                    checkStyle === TYPES_STYLE.row
                      ? paletteColor.ORANGE_OPACITY
                      : paletteColor.GRAY_OPACITY,
                  padding: '3%',
                  borderRadius: 5,
                  borderWidth: checkStyle === TYPES_STYLE.row ? 1 : 0,
                  borderColor: paletteColor.ORANGE,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="format-list-bulleted"
                  size={15}
                  color={
                    checkStyle === TYPES_STYLE.row
                      ? paletteColor.ORANGE
                      : paletteColor.BLACK
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCheckType(TYPES_STYLE.grid)}
                style={{
                  width: 50,
                  backgroundColor:
                    checkStyle === true
                      ? paletteColor.ORANGE_OPACITY
                      : paletteColor.GRAY_OPACITY,
                  padding: '3%',
                  borderRadius: 5,
                  borderWidth: checkStyle === true ? 1 : 0,
                  borderColor: paletteColor.ORANGE,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="view-grid"
                  size={15}
                  color={
                    checkStyle === true
                      ? paletteColor.ORANGE
                      : paletteColor.BLACK
                  }
                />
              </TouchableOpacity>
            </RowJustifyContent>
          </View>
        </RowJustifyContent>*/}
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
