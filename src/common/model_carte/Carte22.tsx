/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte22 = ({data, code}: any) => {
  return (
    <View
      style={{
        height: 500,
       flexDirection : 'row'
      }}>
        <View
            style={{width: 100, marginTop: 30, marginLeft:30}}>
            {data.img.length > 0 && (
              <Image
                source={{
                  uri: data.img,
                }}
                style={{width: 70, height: 70}}
              />
            )} 
        </View>
        <View>
      
        <View style={{
              marginLeft  : 60,
              marginRight : 20,
              paddingTop : 55,
              flexDirection : 'row',
              alignContent : 'center',
              justifyContent : 'center'
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
              marginLeft  : 62,
              marginRight : 20,
              paddingTop : 2,
              flexDirection : 'row',
          }}>
          {data.titrePro.length > 0 && (
              <CustomText padding={0} marginTop={0}  textTransform='uppercase' color={paletteColor.BLACK} fontWeight="600" fontSize={10}>
                {data.titrePro} 
              </CustomText>
            )}
        </View>
        
        <View style={{marginTop : 15,paddingLeft : 87}}>
            {data.contact.length > 0 && (
              <CustomText color={paletteColor.BLACK} fontSize={11} fontWeight='500'>
                +225 {data.contact.join(' / ')}
              </CustomText>
            )}
        </View>
          <View  style={{marginTop : 10,paddingLeft : 90}}>
            {data.email.length > 0 && (
              <CustomText color={paletteColor.BLACK}  fontSize={11} fontWeight='500'>
                {data.email}
              </CustomText>
            )}
          </View>
          <View
          style={{
            marginLeft: 90,
            justifyContent: 'space-between',
            paddingTop: 10, 
          }}>
          <View>
            {data.web.length > 0 && (
              <CustomText color={paletteColor.BLACK} fontSize={11}>
                {data.web}
              </CustomText>
            )}
          </View>
          </View>
          <View
          style={{
            marginLeft: 90,
            justifyContent: 'space-between',
            paddingTop: 10,
          }}>
            <View>
              {data.adresse.length > 0 && (
                <CustomText color={paletteColor.BLACK} fontSize={11}>
                  {data.adresse}
                </CustomText>
              )}
            </View>
          </View>
        </View>
      
        
    </View>
  );
};

export default Carte22;
