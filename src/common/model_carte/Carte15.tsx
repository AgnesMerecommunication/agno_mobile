/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';

const Carte15 = ({data}: any) => {
  return (
    <View
      style={{
        height: 200,
        justifyContent: 'space-between',
        backgroundColor : paletteColor.WHITE
      }}>
      <View
        style={{
          marginLeft: '28%',
          justifyContent: 'space-between',
          paddingTop: 10,
        }}>
        <View style={{marginBottom: '19%'}}>
          {data.nomEntreprise.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontWeight="700">
              {data.nomEntreprise}
            </CustomText>
          )}
        </View>
        <View>
          {data.slogan.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontSize={9}>
              {data.slogan}
            </CustomText>
          )}
          {data.web.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontSize={9}>
              {data.web}
            </CustomText>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 5,
          height: 70,
          alignItems: 'flex-end',
        }}>
        <View>
          {data.nom.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontWeight="700">
              {data.nom}
            </CustomText>
          )}
          {data.titrePro.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontSize={9}>
              {data.titrePro}
            </CustomText>
          )}
          {data.email.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontSize={9}>
              {data.email}
            </CustomText>
          )}
          {data.adresse.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontSize={9}>
              {data.adresse}
            </CustomText>
          )}
        </View>
        <View>
          {data.contact.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontSize={9}>
              {data.contact.join(' / ')}
            </CustomText>
          )}
        </View>
      </View>
    </View>
  );
};

export default Carte15;
