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
import React, {useState} from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import {asyncGetPublicKey} from '../services/asyncStorage';
import {launchUrl} from '../common/launchUrl';
import PremiumModal from '../components/PremiumModal';

const CatalogProduct = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const [isVisibleBottom, setIsVisibleBottom] = useState(false);
  const [recupData, setRecupData] = useState<any>(null);
  const [recherche, setRecherche] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const products: any = useAppSelector(state => state.products.products);
  const catalogTrie = products.filter(
    (product: {type: string}) => product.type === productType.PORTFOLIO,
  );

  const filterRecherche = searchData(recherche, catalogTrie, 'categories');
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
            //@ts-ignore
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
      </View>
    </TouchableOpacity>
  );
  const handleCreate = async () => {
    if (
      user?.underSubscriptionType === underSubscriptionType.FREE ||
      user?.underSubscriptionType === underSubscriptionType.PREMIUM_LAPSED
    ) {
      setShowModal(true);
      } else {
      navigation.navigate({
        name: 'CreateProduit',
        params: {type: productType.PORTFOLIO},
      } as never);
    }
  };
  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 17}}>
        <CustomTextInput
          placeholder="Rechercher un portfolio"
          verifIcon={true}
          borderWidth={0}
          backgroundColor="white"
          nameIcon="magnify"
          elevation={1.8}
          onChangeText={e => setRecherche(e)}
        />
          <FloatingButton
            title={<Entypo name="share" size={15} color={paletteColor.WHITE} />}
            onPress={async () => {
              if(user?.underSubscriptionType === underSubscriptionType.PREMIUM){
                const userId = await asyncGetPublicKey();
                launchUrl(
                  `https://agno.agnesmere-communication.com/${userId}`,
                );
              }else {
                setShowModal(false);
              }
             
            }}
            top={
              Platform.OS === 'android'
                ? Dimensions.get('screen').height / 2.1
                : Dimensions.get('screen').height / 1.6
            }
          />

        <FloatingButton
          title="Ajouter un portfolio"
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
        <BottomProduct
          item={recupData}
          onPressEdite={() => {
            setIsVisibleBottom(false);
            navigation.navigate({
              name: 'CreateProduit',
              params: {
                update: true,
                dataUpdate: recupData,
                type: productType.PORTFOLIO,
              },
            } as never);
          }}
          onPressDelete={() => handleDelete(recupData.id)}
          isVisible={isVisibleBottom}
          onBackdropPress={() => setIsVisibleBottom(false)}
        />
      </View>
      <PremiumModal isVisible={showModal} onBackdropPress={()=> setShowModal(false)} close={()=> setShowModal(false)}/>

      {renderActivityLoading(isValidate)}
    </SafeAreaView>
  );
};

export default CatalogProduct;

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
