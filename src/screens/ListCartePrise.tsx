/* eslint-disable react-native/no-inline-styles */
import {FlatList, Image, TouchableOpacity, View,Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomTextInput from '../components/CustomTextInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {renderActivityLoading} from '../common/activityLoading';
import { getContact } from '../services/apiServices';
import { IContact } from '../types/api';
import { avatar } from '../utils/images';

const ListCartePrise = () => {
  const route = useRoute();
  let items = route.params as IContact[];
  const [recherche, setRecherche] = useState('');
  const navigation = useNavigation();
  const [contacts, setContacts] = useState<IContact[]>(items);
  const [page, setPage]= useState(1);
  const [limit, setLimit] = useState(25);
  const [search , setSearch] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const getItem = async(page : number)=>{
    const res = await getContact({page :page , limit : limit,search : search})
    setIsLoading(false);
    setContacts(res.data as IContact[]);
  }
  const nextItem = async()=>{
    getItem(page);
    setPage(page => page + 1);
  } 
  useEffect(()=>{
    getItem(page);
  },[])

  const getRender = (item: IContact) => (
    <TouchableOpacity
      style={{
        width: '100%',
        marginTop: '5%',flexDirection : 'row'
      }}
      onPress={() => navigation.navigate({name: 'ProfilDetail', params: item} as never)}>
       {item.picture ? <TouchableOpacity
              activeOpacity={0.8}
              style={{width : 55,height : 55, borderRadius : 50,overflow : 'hidden'}}
              onPress={() => navigation.navigate({name: 'ProfilDetail', params: item} as never)}>
              <Image source={{uri: item.picture}} resizeMode='contain' style={{height : '100%', width : '100%'}}/>
        </TouchableOpacity> : <TouchableOpacity
              activeOpacity={0.8}
              style={{width : 55,height : 55, borderRadius : 50,overflow : 'hidden'}}
              onPress={() => navigation.navigate({name: 'ProfilDetail', params: item} as never)}>
              <Image source={avatar} style={{height : '100%', width : '100%'}}/>
        </TouchableOpacity>} 
        <View style={{marginLeft : 5}}>
          <Text style={{fontWeight : 'bold', fontSize : 15}}>{item.name}</Text>
          <Text>{item.email ?? ''}</Text>
          <Text>{item.phone ?? ''}</Text>
        </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <View style={{marginHorizontal: 17}}>
        <CustomTextInput
          placeholder="Rechercher un contact"
          verifIcon={true}
          borderWidth={0}
          backgroundColor="white"
          nameIcon="magnify"
          elevation={1.8}
          onChangeText={e => setRecherche(e)}
        />
        {contacts.length == 0 && <Text style={{marginTop : 12, fontWeight : 'bold', textAlign : 'center'}}>Aucun contact n'a été enregistré</Text>}
        {contacts.length > 0 && <FlatList
          contentInset={{top: 0, bottom: 500, left: 0, right: 0}}
          contentContainerStyle={{paddingBottom: 600}}
          keyExtractor={item => item.id.toString()}
          data={contacts}
          renderItem={(item)=>getRender(item.item)}
          showsVerticalScrollIndicator={false}
          onEndReached={nextItem}
        />}
        {renderActivityLoading(isLoading)}
      </View>
    </SafeAreaView>
  );
};

export default ListCartePrise;
