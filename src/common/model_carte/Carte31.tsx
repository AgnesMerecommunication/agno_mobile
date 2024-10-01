/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte31 = ({data, code}: any) => {
  return (
    <View
      style={{
        height: 500, flexDirection : 'row', justifyContent : 'space-between'
      }}>
      <View>
          <View style={{
                marginLeft  : 10,
                paddingTop : 70,
                flexDirection : 'row', justifyContent : 'flex-start'
            }}>
            {data.nom.length > 0 && (
                <CustomText marginBottom={0} textTransform='uppercase' textAlign='center'
                  color={paletteColor.AGLCOLOR}
                fontWeight="700" fontSize={12}>
                  {data.nom}
                </CustomText>
              )}
          </View>
          <View
            style={{
                marginLeft  : 10,
                paddingTop : 0,
                flexDirection : 'row'
            }}>
            {data.titrePro.length > 0 && (
                <CustomText padding={0} marginTop={0}  color={paletteColor.AGLCOLOR} fontWeight="600"
                 fontSize={9}>
                  {data.titrePro} 
                </CustomText>
              )}
          </View>
          <View  style={{marginTop : 0,paddingLeft : 10}}>
              {data.email.length > 0 && (
                <CustomText color={paletteColor.AGLCOLOR}  fontSize={9} fontWeight='500'>
                  {data.email}
                </CustomText>
              )}
          </View>
            <View style={{marginTop : 0,paddingLeft : 10}}>
              <CustomText color={paletteColor.AGLCOLOR} fontSize={9} fontWeight='500'>
                T. +225 27 21 22 07 18
              </CustomText>
              <CustomText color={paletteColor.AGLCOLOR} fontSize={9} fontWeight='500'>
                M. +225 07 09 76 33 39
              </CustomText>
          </View>
          <View style={{paddingLeft : 10, marginTop : 5}}>
              <CustomText color={paletteColor.AGLCOLOR} fontSize={12} fontWeight='bold'>
                AGL CÔTE D'IVOIRE
              </CustomText>
          </View>
        <View style={{marginTop : 0,paddingLeft : 10}}>  
            <CustomText color={paletteColor.AGLCOLOR} fontSize={9}>
                1 AVENUE CHRISTIANI, TREICHVILLE
            </CustomText>
            <CustomText color={paletteColor.AGLCOLOR} fontSize={9}>
                01 BP 1727 ABJ.01 - CÔTE D'IVOIRE
            </CustomText>
        </View>
        <View style={{marginTop : 0,paddingLeft : 10}}>          
            <CustomText color={paletteColor.AGLCOLOR} fontSize={9} fontWeight='bold'>
              aglgroup.com
            </CustomText> 
        </View>
      </View>
     
      <View style={{height : 12, width : 12,
         marginTop : 90, paddingRight : 75}}>
              <QRCode
                size={70}
                value={code}
              />
        </View>


    </View>
  );
};

export default Carte31;
