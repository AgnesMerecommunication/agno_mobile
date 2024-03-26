/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';

const Carte6 = ({data}: any) => {
  return (
    <View
      style={{
        height: 200,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View />
      <View>
        {data.nomEntreprise.length > 0 && (
          <CustomText
            textAlign="center"
            fontSize={20}
            color={paletteColor.RED}
            fontWeight="900">
            {data.nomEntreprise}
          </CustomText>
        )}
        {data.titrePro.length > 0 && (
          <CustomText textAlign="center" fontSize={8} color="#DEB555">
            {data.titrePro}
          </CustomText>
        )}
      </View>
      <View>
        {data.adresse.length > 0 && (
          <CustomText textAlign="center" color="#DEB555" fontSize={9}>
            {data.adresse}
          </CustomText>
        )}
        {data.contact.length > 0 && (
          <CustomText textAlign="center" color="#DEB555" fontSize={9}>
            {data.contact.join(' | ')}
          </CustomText>
        )}
        {data.email.length > 0 && (
          <CustomText textAlign="center" color="#DEB555" fontSize={9}>
            {data.email}
          </CustomText>
        )}
        {data.web.length > 0 && (
          <CustomText textAlign="center" color="#DEB555" fontSize={9}>
            {data.web}
          </CustomText>
        )}
      </View>
    </View>
  );
};

export default Carte6;
