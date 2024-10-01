/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';

const Carte13 = ({data}: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
        height: 200,
      }}>
      <View
        style={{
          height: 140,
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
        }}>
        <View style={{marginTop: 28}}>
          {data.nomEntreprise.length > 0 && (
            <CustomText
              textAlign="center"
              color={paletteColor.BLACK}
              fontWeight="600"
              fontSize={18}>
              {data.nomEntreprise}
            </CustomText>
          )}
          {(data.nom.length > 0 ) && (
            <CustomText
              textAlign="center"
              color={paletteColor.BLACK}
              fontSize={13}>
              {data.nom}
            </CustomText>
          )}
          {data.titrePro.length > 0 && (
            <CustomText
              textAlign="center"
              color="#B7B8B4"
              fontWeight="600"
              fontSize={10}>
              {data.titrePro}
            </CustomText>
          )}
        </View>
      </View>

      <View
        style={{
          height: 70,
          alignItems: 'center',
          width: '100%',

          top: -12,
        }}>
        {data.email.length > 0 && (
          <CustomText textAlign="center" color="#B7B8B4" fontSize={9}>
            {data.email}
          </CustomText>
        )}
        {data.web.length > 0 && (
          <CustomText textAlign="center" color="#B7B8B4" fontSize={9}>
            {data.web}
          </CustomText>
        )}
        {data.contact.length > 0 && (
          <CustomText textAlign="center" color="#B7B8B4" fontSize={9}>
            {data.contact.join(' | ')}
          </CustomText>
        )}

        {data.adresse.length > 0 && (
          <CustomText textAlign="center" color="#B7B8B4" fontSize={9}>
            {data.adresse}
          </CustomText>
        )}
      </View>
    </View>
  );
};

export default Carte13;
