/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';

const Carte10 = ({data}: any) => {
  return (
    <View
      style={{
        height: 200,
        justifyContent: 'space-between',
        padding: 10,
      }}>
      <View style={{marginTop: 10}}>
        {data.nomEntreprise.length > 0 && (
          <CustomText color="#93B3AD" fontWeight="900" fontSize={20}>
            {data.nomEntreprise}
          </CustomText>
        )}
        {data.slogan.length > 0 && (
          <CustomText color="#93B3AD" fontSize={10}>
            {data.slogan}
          </CustomText>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <View>
          {(data.nom.length > 0 ) && (
            <CustomText color="#93B3AD" fontWeight="bold">
              {data.nom}
            </CustomText>
          )}
          {data.titrePro.length > 0 && (
            <CustomText color="#CBB476" fontSize={10} fontWeight="bold">
              {data.titrePro}
            </CustomText>
          )}
        </View>
        <View>
          {data.adresse.length > 0 && (
            <CustomText fontWeight="600" fontSize={9} color="#93B3AD">
              {data.adresse}
            </CustomText>
          )}
          {data.email.length > 0 && (
            <CustomText fontWeight="600" fontSize={9} color="#93B3AD">
              {data.email}
            </CustomText>
          )}
          {data.web.length > 0 && (
            <CustomText fontWeight="600" fontSize={9} color="#93B3AD">
              {data.web}
            </CustomText>
          )}
          {data.contact.length > 0 && (
            <CustomText fontWeight="600" fontSize={9} color="#93B3AD">
              {data.contact.join(' | ')}
            </CustomText>
          )}
        </View>
      </View>
    </View>
  );
};

export default Carte10;
