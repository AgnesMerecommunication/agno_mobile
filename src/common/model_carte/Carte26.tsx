/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte26 = ({data, code}: any) => {
  return (
    <View
    style={{
      height: 500,
      flexDirection : 'row'
    }}>
      <View
          style={{ marginTop: 50, marginLeft:20, width: '40%'}}>
          {data.img.length > 0 && (
            <Image
              source={{
                uri: data.img,
              }}
              style={{width: 120, height: 110}}
            />
          )} 
      </View>

      <View>
     {/* <View style={{
          marginLeft  : 40,
          marginRight : 20,
          paddingTop : 90,
          flexDirection : 'row',
          alignContent : 'center',
          justifyContent : 'center'
      }}>
      {data.prenom.length > 0 && (
          <CustomText marginBottom={0} textTransform='uppercase' textAlign='center'
             color={paletteColor.BLACK}
           fontWeight="700" fontSize={20}>
            {data.prenom} {data.nom}
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
        <CustomText padding={0} marginTop={0} textTransform='uppercase' color={paletteColor.ORANGE} fontWeight="600" fontSize={15}>
            {data.titrePro} 
          </CustomText>
        )}
    </View>*/}
    <View style={{marginTop : 48,paddingLeft : 33}}>
        {data.contact.length > 0 && (
          <CustomText color={paletteColor.WHITE} fontSize={13} fontWeight='500'>
            +225 {data.contact.join(' / ')}
          </CustomText>
        )}
      </View>
      <View  style={{marginTop : 15,paddingLeft : 40}}>
        {data.email.length > 0 && (
          <CustomText color={paletteColor.WHITE}  fontSize={13} fontWeight='500'>
            {data.email}
          </CustomText>
        )}
      </View>
      <View  style={{marginTop : 20,paddingLeft : 45}}>
        {data.adresse.length > 0 && (
          <CustomText color={paletteColor.WHITE}  fontSize={13} fontWeight='500'>
            {data.adresse}
          </CustomText>
        )}
      </View>
      <View
      style={{
        marginLeft: 0,
        justifyContent: 'space-between',
        marginTop : 18,
      }}>
      <View style={{flexDirection : 'row', alignItems:'center', justifyContent:'center'}}>
        {data.web.length > 0 && (
          <CustomText color={paletteColor.WHITE} fontSize={13} textAlign='center' fontWeight='bold'>
            {data.web}
          </CustomText>
        )}
      </View>
    </View>
      </View>
      
  </View>
  );
};

export default Carte26;
