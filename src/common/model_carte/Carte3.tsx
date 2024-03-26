/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';

const Carte3 = ({data}: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 190,
      }}>
      <View style={{marginTop: '7%', alignItems: 'center'}}>
        {data.img.length > 0 && (
          <Image
            source={{
              uri: data.img,
            }}
            style={{width: 30, height: 30}}
          />
        )}
        <View style={{marginTop: 28}}>
          {data.nomEntreprise.length > 0 && (
            <CustomText textAlign="center" color="#BB8B81" fontWeight="700">
              {data.nomEntreprise}
            </CustomText>
          )}
          {data.titrePro.length > 0 && (
            <CustomText textAlign="center" color="#BB8B81" fontSize={12}>
              {data.titrePro}
            </CustomText>
          )}
        </View>
      </View>
      <View>
        {data.contact.length > 0 && (
          <CustomText textAlign="center" color="#BB8B81" fontSize={12}>
            {data.contact.join(' | ')}
          </CustomText>
        )}
        {data.email.length > 0 && (
          <CustomText textAlign="center" color="#BB8B81" fontSize={10}>
            {data.email}
          </CustomText>
        )}
      </View>
    </View>
  );
};

export default Carte3;
