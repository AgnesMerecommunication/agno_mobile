/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte20 = ({data, code}: any) => {
  return (
    <View
      style={{
        height: 500,
        flexDirection:'row',
        justifyContent: 'space-between',
      }}>
        <View
        style={{width: 100, marginTop: 45, marginLeft:30}}>
        {data.img.length > 0 && (
          <Image
            source={{
              uri: data.img,
            }}
            style={{width: 80, height: 80}}
          />
        )}
       
      </View>
      <View>
      <View style={{
            marginLeft  : 0,
            marginRight : 20,
            paddingTop : 15,
            flexDirection : 'row',
        }}>
        {data.nom.length > 0 && (
            <CustomText marginBottom={0} textTransform='uppercase' textAlign='center'
               color={paletteColor.BLACK}
             fontWeight="700" fontSize={17}>
               {data.nom}
            </CustomText>
          )}
      </View>
      <View
        style={{
            marginLeft  : 0,
            marginRight : 20,
            paddingTop : 2,
            flexDirection : 'row'
        }}>
        {data.titrePro.length > 0 && (
            <CustomText padding={0} marginTop={0}  color={paletteColor.BLACK} fontWeight="600" fontSize={14}>
              {data.titrePro} 
            </CustomText>
          )}
      </View>
      <View style={{marginTop : 20,paddingLeft : 40}}>
          {data.contact.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={13} fontWeight='700'>
              +225 {data.contact.join(' / ')}
            </CustomText>
          )}
      </View>
      <View  style={{marginTop : 12,paddingLeft : 40}}>
          {data.email.length > 0 && (
            <CustomText color={paletteColor.BLACK}  fontSize={13} fontWeight='700'>
              {data.email}
            </CustomText>
          )}
      </View>
        <View  style={{marginTop : 12,paddingLeft : 40}}> 
          {data.web.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={13} fontWeight='700'>
              {data.adresse}
            </CustomText>
          )}
        </View>
        <View  style={{marginTop : 9,paddingLeft : 40}}>
          {data.web.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={13} fontWeight='700'>
              {data.web}
            </CustomText>
          )}
        </View>
      </View>
      
        
    </View>
  );
};

export default Carte20;
