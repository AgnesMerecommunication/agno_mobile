/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';


const Carte28 = ({data, code}: any) => {
  return (
    <View
    style={{
      height: 500,
      flexDirection : 'row'
    }}>

<View>
      <View style={{
          marginLeft  : 20,
          marginRight : 20,
          marginTop : 8,
          flexDirection : 'row'
      }}>
      {data.nom.length > 0 && (
          <CustomText marginBottom={0} textTransform='uppercase'
           textAlign='center'
             color={paletteColor.BLACK}
           fontWeight="700" fontSize={20}>
             {data.nom}
          </CustomText>
        )}
    </View>
    <View
      style={{
          marginLeft  : 20,
          marginRight : 20,
          paddingTop : 5,
          flexDirection : 'row'
      }}>
      {data.titrePro.length > 0 && (
        <CustomText padding={0} marginTop={0} textTransform='uppercase' color={paletteColor.ORANGE} fontWeight="600" fontSize={15}>
            {data.titrePro} 
          </CustomText>
        )}
    </View>
    <View style={{marginTop : 32,paddingLeft : 33}}>
        {data.contact.length > 0 && (
          <CustomText color={paletteColor.BLACK} fontSize={11} fontWeight='500'>
            +225 {data.contact.join(' / ')}
          </CustomText>
        )}
      </View>
      <View  style={{marginTop : 22,paddingLeft : 35}}>
        {data.adresse.length > 0 && (
          <CustomText color={paletteColor.BLACK}  fontSize={11} fontWeight='500'>
            {data.adresse}
          </CustomText>
        )}
      </View>
      <View  style={{marginTop : 20,paddingLeft : 40}}>
        {data.email.length > 0 && (
          <CustomText color={paletteColor.BLACK}  fontSize={11} fontWeight='500'>
            {data.email}
          </CustomText>
        )}
      </View>
   
      </View>
      <View
          style={{ marginTop: 33, marginLeft:208, position:'absolute'}}>
          {data.img.length > 0 && (
            <Image
              source={{
                uri: data.img,
              }}
              style={{width: 116, height: 115, borderRadius:75}}
            />
          )} 
      </View>

      
  </View>
  );
};

export default Carte28;
