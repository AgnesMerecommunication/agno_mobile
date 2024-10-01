/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte18 = ({data, code}: any) => {
  return (
    <View
      style={{
        height: 500,
       // justifyContent: 'space-between',
      }}>
        <View style={{width: '100%'}}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop : 10}}>
            {data.img.length > 0 && (
              <Image
                source={{
                  uri: data.img,
                }}
                style={{width: 80, height: 70}}
              />
            )}
          </View>
        </View>
      <View style={{
            marginLeft  : 15,
            marginRight : 20,
            paddingTop : 20,
            flexDirection : 'row',
        }}>
        {data.nom.length > 0 && (
            <CustomText marginBottom={0} textTransform='uppercase' textAlign='left' 
               color={paletteColor.WHITE}
             fontWeight="700" fontSize={17}>
               {data.nom}
            </CustomText>
          )}
      </View>
      <View style={{borderColor : 'white', borderWidth : 0.4, width : '50%', marginLeft : 15}}></View>
      <View
        style={{
            marginLeft  : 15,
            marginRight : 20,
            paddingTop : 5,
            flexDirection : 'row',
        }}>
        {/*<View style={{width : 12, height:12, backgroundColor: 'black', marginRight : 2,marginTop:0}}></View>*/}
        {data.titrePro.length > 0 && (
            <CustomText padding={0} marginTop={0}  color={paletteColor.WHITE} fontWeight="500" fontSize={15} textTransform='uppercase'>
              {data.titrePro} 
            </CustomText>
          )}
      </View>
     
      <View style={{marginTop : 65,paddingLeft : 60}}>
          {data.contact.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={15} fontWeight='600'>
              +225 {data.contact.join(' / ')}
            </CustomText>
          )}
        </View>
        <View  style={{marginTop : 15,paddingLeft : 60}}>
          {data.email.length > 0 && (
            <CustomText color={paletteColor.BLACK}  fontSize={15} fontWeight='600'>
              {data.email}
            </CustomText>
          )}
        </View>    
        <View  style={{marginTop : 15,paddingLeft : 60}}>
          {data.adresse.length > 0 && (
            <CustomText color={paletteColor.BLACK}  fontSize={15} fontWeight='600'>
              {data.adresse}
            </CustomText>
          )}
        </View>    

        <View style={{height : 12, width : 12, marginLeft : 160, marginTop : 100,
         flexDirection : 'row', justifyContent : 'center', alignItems : "center"}}>
              <QRCode
                size={150}
                value={code}
              />
        </View>
    </View>
  );
};

export default Carte18;
