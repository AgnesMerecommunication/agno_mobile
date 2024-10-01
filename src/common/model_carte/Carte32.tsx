/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';


const Carte15 = ({data}: any) => {
  return (
    <View
    style={{
      height: '100%', 
    }}>
      <View style={{marginTop : '3%',flexDirection : 'row', justifyContent : 'center'}}>
        {data.nomEntreprise.length > 0 && (
          <CustomText color={paletteColor.WHITE} fontWeight="700" fontSize={22}>
            {data.nomEntreprise}
          </CustomText>
        )}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', marginLeft :10}}>
          {data.img.length > 0 && (
            <Image
              source={{
                uri: data.img,
              }}
              style={{width: 180, height:180, borderRadius : 90, marginTop : 10, marginLeft :3}}
            />
          )}
        </View>
    <View style={{
          marginLeft  : 40,
          marginRight : 20,
          paddingTop : 10,
      }}>
      {data.nom.length > 0 && (
          <CustomText marginBottom={0} textTransform='uppercase' textAlign='center'
             color={paletteColor.WHITE}
           fontWeight="700" fontSize={18}>
             {data.nom}
          </CustomText>
        )}
    </View>
    <View
      style={{
          marginLeft  : 40,
          marginRight : 20,
          paddingTop : 5,
          flexDirection : 'row',
          alignContent : 'center',
          justifyContent : 'center'
      }}>
      {data.titrePro.length > 0 && (
          <CustomText padding={0} marginTop={0}  color={paletteColor.WHITE} 
          fontWeight="400" fontSize={10} textTransform="uppercase"> 
            {data.titrePro}  
          </CustomText>
        )}
    </View>

    <View style={{marginTop : 100,paddingLeft : 73}}>
        {data.contact.length > 0 && (
          <CustomText color={paletteColor.WHITE} fontSize={15} fontWeight='500'>
            +225 {data.contact[0]}
          </CustomText>
        )}
      </View>
      <View  style={{marginTop : 19,paddingLeft : 70}}>
        {data.email.length > 0 && (
          <CustomText color={paletteColor.WHITE}  fontSize={15} fontWeight='500'>
            {data.email}
          </CustomText>
        )}
      </View>
      <View style={{marginTop : 22,paddingLeft : 70}}>
        {data.web.length > 0 && (
          <CustomText color={paletteColor.WHITE} fontSize={15}>
            {data.web}
          </CustomText>
        )}
      </View>
      <View style={{marginTop : 16,paddingLeft : 70}}>
        {data.web.length > 0 && (
          <CustomText color={paletteColor.WHITE} fontSize={15}>
            {data.adresse}
          </CustomText>
        )}
      </View>
  </View>
  );
};

export default Carte15;
