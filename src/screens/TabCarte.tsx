import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import StackCarte from '../navigations/StackCarte';
import {Dimensions, View} from 'react-native';
import { getContact } from '../services/apiServices';
import { IContact } from '../types/api';

const TabCarte = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const getItem = async()=>{
    const res = await getContact({page :1 , limit : 25})
    setContacts(res.data as IContact[]);
  }

  useEffect(()=>{
      getItem();
  },[])
  return (
    <SafeAreaView>
      <View style={{marginTop: 10, height: Dimensions.get('screen').height}}>
        <StackCarte  contacts={contacts}/>
      </View>
    </SafeAreaView>
  );
};

export default TabCarte;
