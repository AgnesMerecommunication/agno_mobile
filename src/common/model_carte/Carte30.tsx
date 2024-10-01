/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte30 = ({data, code}: any) => {
  return (
    <View
      style={{
        height: 500,
       // justifyContent: 'space-between',
      }}>
      {/*<View
        style={{
          marginLeft: '28%',
          justifyContent: 'space-between',
          paddingTop: 10,
        }}>
        <View style={{marginBottom: '19%'}}>
          {data.nomEntreprise.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontWeight="700">
              {data.nomEntreprise}
            </CustomText>
          )}
        </View>
        
      </View>*/}
      <View style={{
            marginLeft  : 92,
            marginRight : 20,
            paddingTop : 50,
            flexDirection : 'row'
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
            marginLeft  : 92,
            marginRight : 20,
            paddingTop : 5,
            flexDirection : 'row'
        }}>
        {data.titrePro.length > 0 && (
            <CustomText padding={0} marginTop={0}  color={paletteColor.BLACK} fontWeight="600" fontSize={13}>
              {data.titrePro} 
            </CustomText>
          )}
      </View>
      <View style={{height : 12, width : 12, marginLeft : 60,
         marginTop : 390,
         flexDirection : 'row', justifyContent : 'center',
          alignItems : "center", position : 'absolute'}}>
              <QRCode
                size={100}
                value={code}
              />
        </View>
      <View style={{marginTop : 65,paddingLeft : 140}}>
          {data.contact.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={14} fontWeight='500'>
              +225 {data.contact.join(' / ')}
            </CustomText>
          )}
        </View>
        <View  style={{marginTop : 22,paddingLeft : 140}}>
          {data.email.length > 0 && (
            <CustomText color={paletteColor.BLACK}  fontSize={14} fontWeight='500'>
              {data.email}
            </CustomText>
          )}
        </View>
        <View style={{marginTop : 22,paddingLeft : 140}}>

          {data.web.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={14}>
              {data.web}
            </CustomText>
          )}
        </View>
        <View style={{marginTop : 22,paddingLeft : 140}}>
            {data.adresse.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={14}>
                {data.adresse}
            </CustomText>
            )}
        </View>
    </View>
  );
};

export default Carte30;
