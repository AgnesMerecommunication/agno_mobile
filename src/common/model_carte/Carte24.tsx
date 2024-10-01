/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte24 = ({data, code}: any) => {
  return (
    <View
      style={{
        height: 650,
       // justifyContent: 'space-between',
      }}>
          <View
            style={{ marginTop: 10, marginLeft:10,
             justifyContent:'center', alignItems:'center'}}>
            {data.img.length > 0 && (
              <Image
                source={{
                  uri: data.img,
                }}
                style={{width: 150, height: 100}}
              />
            )} 
        </View>
  
      <View style={{
            marginLeft  : 40,
            marginRight : 20,
            paddingTop : 110,
            flexDirection : 'row',
            alignContent : 'center',
            justifyContent : 'center'
        }}>
        {data.nom.length > 0 && (
            <CustomText marginBottom={0} textTransform='uppercase' textAlign='center'
               color={paletteColor.WHITE}
             fontWeight="700" fontSize={19}>
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
            <CustomText padding={0} marginTop={0}  color={paletteColor.WHITE} fontWeight="600" fontSize={16}>
              {data.titrePro} 
            </CustomText>
          )}
      </View>
      <View style={{marginTop : 60,paddingLeft : 73}}>
          {data.contact.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={15} fontWeight='500'>
              +225 {data.contact.join(' / ')}
            </CustomText>
          )}
        </View>
        <View  style={{marginTop : 28,paddingLeft : 73}}>
          {data.email.length > 0 && (
            <CustomText color={paletteColor.BLACK}  fontSize={15} fontWeight='500'>
              {data.email}
            </CustomText>
          )}
        </View>
        <View  style={{marginTop : 28,paddingLeft : 73}}>
          {data.adresse.length > 0 && (
            <CustomText color={paletteColor.BLACK}  fontSize={15} fontWeight='500'>
              {data.adresse}
            </CustomText>
          )}
        </View>
        <View  style={{marginTop : 28,paddingLeft : 73}}>
          {data.web.length > 0 && (
            <CustomText color={paletteColor.BLACK}  fontSize={15} fontWeight='500'>
              {data.web}
            </CustomText>
          )}
        </View>
        
    </View>
  );
};

export default Carte24;
