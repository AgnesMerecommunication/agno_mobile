/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';

const Carte14 = ({data}: any) => {
  return (
    <View
      style={{
        height: 200,
        justifyContent: 'space-between',
      }}>
      <View>
        <View style={{margin: 10}}>
          <View style={{marginBottom: 15, marginTop: 5}}>
            {data.nomEntreprise.length > 0 && (
              <CustomText color="#C15B23" fontSize={17}>
                {data.nomEntreprise}
              </CustomText>
            )}
            {data.web.length > 0 && (
              <CustomText color="#C15B23" fontSize={10}>
                {data.web}
              </CustomText>
            )}
          </View>
          <View>
            {data.nom.length > 0 && (
              <CustomText color="#C15B23" fontSize={15}>
                {data.nom}
              </CustomText>
            )}
            {data.titrePro.length > 0 && (
              <CustomText color="#C15B23" fontSize={10}>
                {data.titrePro}
              </CustomText>
            )}
          </View>
        </View>
      </View>

      <View
        style={{
          height: 80,
        }}>
        <View style={{marginLeft: 10}}>
          {data.contact.length > 0 && (
            <CustomText color="#C15B23" fontSize={10}>
              {data.contact.join(' / ')}
            </CustomText>
          )}
          {data.email.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontSize={10}>
              {data.email}
            </CustomText>
          )}
          {data.adresse.length > 0 && (
            <CustomText color={paletteColor.WHITE} fontSize={10}>
              {data.adresse}
            </CustomText>
          )}
        </View>
      </View>
    </View>
  );
};

export default Carte14;
