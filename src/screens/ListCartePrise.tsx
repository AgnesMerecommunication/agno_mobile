/* eslint-disable react-native/no-inline-styles */
import {Alert, FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {searchData} from '../utils/searchData';
import {SafeAreaView} from 'react-native-safe-area-context';
import {removeOneBusinessCardSave} from '../services/redux/reducerCard';
import {renderActivityLoading} from '../common/activityLoading';

const ListCartePrise = () => {
  const [recherche, setRecherche] = useState('');

  const navigation = useNavigation();
  const cards: any = useAppSelector(state => state.cards.cardSaves);
  const isLoadingCardSave: any = useAppSelector(
    state => state.cards.isLoadingCardSave,
  );
  const filterRecherche = searchData(recherche, cards, 'companyName');
  const dispatch = useAppDispatch();

  const handleDelete = (item: any) => {
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
            dispatch(removeOneBusinessCardSave(item.id, navigation));
          },
        },
      ],
    );
  };
  const getRender = ({item}: any) => (
    <TouchableOpacity
      style={{
        width: '100%',
        marginTop: '5%',
      }}
      onPress={() => handleDelete(item)}>
      <Image
        source={{uri: item.picture + '?' + new Date()}}
        style={{height: 200, width: '100%'}}
      />
    </TouchableOpacity>
  );

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

        <FlatList
          contentInset={{top: 0, bottom: 500, left: 0, right: 0}}
          contentContainerStyle={{paddingBottom: 600}}
          keyExtractor={item => item.id.toString()}
          data={filterRecherche}
          renderItem={getRender}
          showsVerticalScrollIndicator={false}
        />
        {renderActivityLoading(isLoadingCardSave)}
      </View>
    </SafeAreaView>
  );
};

export default ListCartePrise;
