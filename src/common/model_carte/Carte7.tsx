/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';

const Carte7 = ({data}: any) => {
  return (
    <View
      style={{
        height: 200,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          height: 150,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: '3%',
          }}>
          {data.img.length > 0 && (
            <Image
              source={{
                uri: data.img,
              }}
              style={{width: 60, height: 60}}
            />
          )}
          <View style={{marginHorizontal: 10}}>
            {data.nomEntreprise.length > 0 && (
              <CustomText color="#457BB0" fontWeight="bold">
                {data.nomEntreprise}
              </CustomText>
            )}
            {data.slogan.length > 0 && (
              <CustomText fontSize={8}>{data.slogan}</CustomText>
            )}
          </View>
        </View>
        <View style={{alignItems: 'flex-end', marginBottom: '3%'}}>
          {data.nom.length > 0 && (
            <CustomText color="#457BB0">{data.nom}</CustomText>
          )}
          {data.titrePro.length > 0 && (
            <CustomText fontSize={10}>{data.titrePro}</CustomText>
          )}
          {data.email.length > 0 && (
            <CustomText fontSize={10}> {data.email}</CustomText>
          )}
        </View>
      </View>
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginLeft: '3%',
          }}>
          <View>
            {data.adresse.length > 0 && (
              <CustomText fontSize={10}>{data.adresse}</CustomText>
            )}
            {data.web.length > 0 && (
              <CustomText fontSize={10}>{data.web}</CustomText>
            )}
          </View>
          <View>
            {data.contact.length > 0 && (
              <CustomText fontSize={10} textAlign="right">
                {data.contact.join('\n')}
              </CustomText>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Carte7;
