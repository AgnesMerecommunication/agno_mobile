/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte19 = ({data, code}: any) => {
  return (
    <View
      style={{
        height: 500,
      }}>
      <View style={{
            marginLeft  : 40,
            marginRight : 20,
            paddingTop : 20,
            flexDirection : 'row',
            alignContent : 'center',
            justifyContent : 'center'
        }}>
        {data.nom.length > 0 && (
            <CustomText marginBottom={0} textTransform='uppercase' textAlign='center'
               color={paletteColor.WHITE}
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
            <CustomText padding={0} marginTop={0}  color={paletteColor.WHITE} fontWeight="600" fontSize={17}>
              {data.titrePro} 
            </CustomText>
          )}
      </View>
      <View style={{height : 12, width : 12, marginLeft : 180, marginTop : 55,
         flexDirection : 'row', justifyContent : 'center', alignItems : "center"}}>
              <QRCode
                size={100}
                value={code}
              />
        </View>
      <View style={{marginTop : 197,paddingLeft : 73}}>
          {data.contact.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontSize={15} fontWeight='500'>
              +225 {data.contact.join(' / ')}
            </CustomText>
          )}
        </View>
        <View  style={{marginTop : 22,paddingLeft : 100}}>
          {data.email.length > 0 && (
            <CustomText color={paletteColor.WHITE}  fontSize={15} fontWeight='500'>
              {data.email}
            </CustomText>
          )}
        </View>
        <View  style={{marginTop : 23,paddingLeft : 115}}>
          {data.web.length > 0 && (
            <CustomText color={paletteColor.WHITE}  fontSize={14} fontWeight='500'>
              {data.web}
            </CustomText>
          )}
        </View>
        <View style={{marginTop : 30,paddingLeft : 115}}>
          {data.adresse.length > 0 && (
            <CustomText color={paletteColor.WHITE}  fontSize={14} fontWeight='500'>
              {data.adresse}
            </CustomText>
          )}
        </View>
    </View>
  );
};

export default Carte19;
