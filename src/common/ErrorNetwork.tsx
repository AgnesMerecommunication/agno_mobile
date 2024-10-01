import {Image, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../components/CustomText';
import {wifioff} from '../utils/images';
import { asyncGetPrincipale } from '../services/asyncStorage';
import HomeNone from '../screens/HomeNone';

const ErrorNetwork = () => {
  const [saved , setSaved] = useState(false);
  useEffect(()=>{
    const go = async ()=>{
      let principale = await asyncGetPrincipale();
      if(principale){
        setSaved(true);
      }
    }
  go();   
  },[])
  return (
    <View>
      {saved == false ? (  <View style={{alignItems: 'center', flex: 1, marginTop: '20%'}}>
        <Image source={wifioff} style={{height: 220, width: 220}} />
        <CustomText textAlign="center">error Connection</CustomText>
        <CustomText textAlign="center">login Again</CustomText>
      </View>) : <HomeNone/>}
    
    </View>
  );
};

export default ErrorNetwork;
