/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import QRCode from 'react-native-qrcode-svg';


const Carte15 = ({data, code}: any) => {
  return (
    <View style={{
      height: 200,
    }}>
        <View style={{ flexDirection : 'row',  marginLeft :90, marginTop : 30 }}>
          {data.nom.length > 0 && (
              <CustomText  textTransform='uppercase'  color={paletteColor.BLACK} fontWeight="700">
              {data.nom}  
              </CustomText>
            )}
        </View>
        <View  style={{ flexDirection : 'row',  marginLeft :90}}>
          {data.titrePro.length > 0 && (
            <CustomText color={paletteColor.RED} fontSize={9}>
              {data.titrePro}
            </CustomText>
          )}
        </View>
        <View style={{flexDirection : "row"}}>
            <View>
            <View style={{marginTop : 60, marginLeft : 70}}>
              {data.contact.length > 0 && (
                <CustomText color={paletteColor.BLACK} fontSize={9} fontWeight="600">
                  {data.contact.join(' / ')}
                </CustomText>
              )}
            </View>
            <View style={{marginTop :5, marginLeft : 70}}>
              {data.contact.length > 0 && (
                <CustomText color={paletteColor.BLACK} fontSize={9} fontWeight="600">
                  {data.contact.join(' / ')}
                </CustomText>
              )}
            </View>
            <View  style={{marginTop :4, marginLeft : 70}}>
              {data.email.length > 0 && (
                <CustomText color={paletteColor.BLACK} fontSize={9} fontWeight="600">
                  {data.email}
                </CustomText>
              )}
            </View>
            </View>
            <View style={{height : 12, width : 12, marginLeft : 72, marginTop : 52}}>
              <QRCode
                size={68}
                value={code}
              />
            </View>
        </View>
        
      </View>
  );
};

export default Carte15;
