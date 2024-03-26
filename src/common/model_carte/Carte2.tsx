/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';

const Carte2 = ({data}: any) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        height: 200,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '3%',
        }}>
        {/* Logo */}
        <View style={{width: '35%', marginTop: '5%'}}>
          {data.img.length > 0 && (
            <Image
              source={{
                uri: data.img,
              }}
              style={{width: 90, height: 90, marginLeft: '10%'}}
            />
          )}
        </View>
        {/* Nom user */}
        <View style={{width: '55%', alignItems: 'center', right: 10}}>
          <View style={{marginTop: 10}}>
            {data.nom.length > 0 && (
              <CustomText
                fontWeight="900"
                fontSize={15}
                color="#DEB555"
                textAlign="center">
                {data.nom}
              </CustomText>
            )}
            {data.titrePro.length > 0 && (
              <CustomText color={paletteColor.WHITE} textAlign="center">
                {data.titrePro}
              </CustomText>
            )}
          </View>
          <View style={{marginTop: 25}}>
            {data.contact.length > 0 && (
              <CustomText color="#DEB555" textAlign="center" fontSize={10}>
                {data.contact.join(' / ')}
              </CustomText>
            )}
            {data.email.length > 0 && (
              <CustomText
                color={paletteColor.WHITE}
                fontSize={10}
                textAlign="center">
                {data.email}
              </CustomText>
            )}

            {data.web.length > 0 && (
              <CustomText
                color={paletteColor.WHITE}
                fontSize={10}
                textAlign="center">
                {data.web}
              </CustomText>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: '15%',
        }}>
        <View style={{marginBottom: '7%'}}>
          {data.nomEntreprise.length > 0 && (
            <CustomText fontWeight="600" color="#DEB555" textAlign="center">
              {data.nomEntreprise}
            </CustomText>
          )}
          {data.adresse.length > 0 && (
            <CustomText
              color={paletteColor.WHITE}
              fontSize={10}
              textAlign="center">
              {data.adresse}
            </CustomText>
          )}
        </View>
      </View>
    </View>
  );
};

export default Carte2;
