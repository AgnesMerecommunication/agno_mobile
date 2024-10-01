/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import RowJustifyContent from '../../components/RowJustifyContent';
import CustomCircle from '../../components/CustomCircle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Carte1 = ({data}: any) => {
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
          marginTop: '12%',
        }}>
        {/* Logo */}
        <View style={{width: '35%'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {data.img.length > 0 && (
              <Image
                source={{
                  uri: data.img,
                }}
                style={{width: 45, height: 45}}
              />
            )}
            {data.nomEntreprise.length > 0 && (
              <CustomText
                textAlign="center"
                color={paletteColor.WHITE}
                fontWeight="bold"
                textTransform="capitalize"
                fontSize={12}>
                {data.nomEntreprise}
              </CustomText>
            )}
          </View>
          {data.slogan.length > 0 && (
            <CustomText
              color={paletteColor.GRAY}
              fontSize={8}
              fontWeight="bold">
              {data.slogan}
            </CustomText>
          )}
        </View>
        {/* Nom user */}
        <View style={{width: '55%'}}>
          {(data.nom.length > 0 ) && (
            <CustomText fontWeight="900" fontSize={15} textAlign="right">
              {data.nom} 
            </CustomText>
          )}
          {data.titrePro.length > 0 && (
            <CustomText textAlign="right" fontSize={8}>
              {data.titrePro}
            </CustomText>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginLeft: '15%',
        }}>
        <View style={{marginLeft: '22%'}}>
          {data.contact.length > 0 && (
            <RowJustifyContent
              top={-15}
              alignItems="center"
              justifyContent="flex-start">
              <CustomCircle
                size={15}
                backgroundColor="#045E8C"
                borderRadius={30}>
                <MaterialCommunityIcons
                  name="phone"
                  size={8}
                  color={paletteColor.WHITE}
                />
              </CustomCircle>
              <CustomText marginLeft={5} fontWeight="700" fontSize={10}>
                {data.contact.join('\n')}
              </CustomText>
            </RowJustifyContent>
          )}
          {data.web.length > 0 && (
            <RowJustifyContent
              marginTop={5}
              top={-15}
              alignItems="center"
              justifyContent="flex-start">
              <CustomCircle
                size={15}
                backgroundColor="#045E8C"
                borderRadius={30}>
                <MaterialCommunityIcons
                  name="web"
                  size={8}
                  color={paletteColor.WHITE}
                />
              </CustomCircle>
              <CustomText marginLeft={5} fontWeight="700" fontSize={10}>
                {data.web}
              </CustomText>
            </RowJustifyContent>
          )}
          {data.email.length > 0 && (
            <RowJustifyContent
              marginTop={5}
              top={-15}
              alignItems="center"
              justifyContent="flex-start">
              <CustomCircle
                size={15}
                backgroundColor="#045E8C"
                borderRadius={30}>
                <MaterialCommunityIcons
                  name="email"
                  size={8}
                  color={paletteColor.WHITE}
                />
              </CustomCircle>
              <CustomText marginLeft={5} fontWeight="700" fontSize={10}>
                {data.email}
              </CustomText>
            </RowJustifyContent>
          )}
          {data.adresse.length > 0 && (
            <RowJustifyContent
              marginTop={5}
              top={-15}
              alignItems="center"
              justifyContent="flex-start">
              <CustomCircle
                size={15}
                backgroundColor="#045E8C"
                borderRadius={30}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={8}
                  color={paletteColor.WHITE}
                />
              </CustomCircle>
              <CustomText marginLeft={5} fontWeight="700" fontSize={10}>
                {data.adresse}
              </CustomText>
            </RowJustifyContent>
          )}
        </View>
      </View>
    </View>
  );
};

export default Carte1;
