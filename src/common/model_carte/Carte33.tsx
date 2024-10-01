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
            <CustomText color={paletteColor.BLACK} fontWeight="700" fontSize={22}>
              {data.nomEntreprise}
            </CustomText>
          )}
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop : "3%", marginLeft :10}}>
            {data.img.length > 0 && (
              <Image
                source={{
                  uri: data.img,
                }}
                style={{width: 178, height:178, borderRadius : 90}}
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
               color={paletteColor.BLACK}
             fontWeight="700" fontSize={25}>
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
            <CustomText padding={0} marginTop={0}  color={paletteColor.BLACK} 
            fontWeight="400" fontSize={17} textTransform="uppercase"> 
              {data.titrePro}  
            </CustomText>
          )}
      </View>
  
      <View style={{marginTop : 82,paddingLeft : 73}}>
          {data.contact.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={15} fontWeight='500'>
              +225 {data.contact[0]}
            </CustomText>
          )}
        </View>
        <View  style={{marginTop : 19,paddingLeft : 70}}>
          {data.email.length > 0 && (
            <CustomText color={paletteColor.BLACK}  fontSize={15} fontWeight='500'>
              {data.email}
            </CustomText>
          )}
        </View>
        <View style={{marginTop : 20,paddingLeft : 70}}>
          {data.web.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={15}>
              {data.web}
            </CustomText>
          )}
        </View>
        <View style={{marginTop : 22,paddingLeft : 70}}>
          {data.web.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={15}>
              {data.adresse}
            </CustomText>
          )}
        </View>
    </View>
  );
};

export default Carte15;
