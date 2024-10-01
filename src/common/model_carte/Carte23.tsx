/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte23 = ({data, code}: any) => {
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
        <View>
          {data.slogan.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={9}>
              {data.slogan}
            </CustomText>
          )}
          {data.web.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={9}>
              {data.web}
            </CustomText>
          )}
        </View>
      </View>*/}
      <View style={{
            marginLeft  : 40,
            marginRight : 20,
            paddingTop : 150,
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
            marginLeft  : 40,
            marginRight : 20,
            paddingTop : 5,
            flexDirection : 'row',
            alignContent : 'center',
            justifyContent : 'center'
        }}>
        {/*<View style={{width : 12, height:12, backgroundColor: 'black', marginRight : 2,marginTop:0}}></View>*/}
        {data.titrePro.length > 0 && (
            <CustomText padding={0} marginTop={0}  color={paletteColor.RED} fontWeight="600" fontSize={12}>
              {data.titrePro} 
            </CustomText>
          )}
      </View>
      <View style={{height : 12, width : 12, marginLeft : 160, marginTop : 55,
         flexDirection : 'row', justifyContent : 'center', alignItems : "center"}}>
              <QRCode
                size={100}
                value={code}
              />
        </View>
      <View style={{marginTop : 60,paddingLeft : 73}}>
          {data.contact.length > 0 && (
            <CustomText color={paletteColor.BLACK} fontSize={13} fontWeight='500'>
              +225 {data.contact.join(' / ')}
            </CustomText>
          )}
        </View>
        <View  style={{marginTop : 22,paddingLeft : 70}}>
          {data.email.length > 0 && (
            <CustomText color={paletteColor.BLACK}  fontSize={13} fontWeight='500'>
              {data.email}
            </CustomText>
          )}
        </View>
        
    </View>
  );
};

export default Carte23;
