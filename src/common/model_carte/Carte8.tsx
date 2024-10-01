/* eslint-disable react-native/no-inline-styles */
import {Dimensions, Image, View} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {paletteColor} from '../../themes/Utility';
import RowJustifyContent from '../../components/RowJustifyContent';
import CustomCircle from '../../components/CustomCircle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Carte8 = ({data}: any) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        height: 200,
        justifyContent: 'space-between',
      }}>
      {/* Logo */}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          marginTop: 10,
        }}>
        {data.img.length > 0 && (
          <Image
            source={{
              uri: data.img,
            }}
            style={{width: 50, height: 50}}
          />
        )}
        {data.nomEntreprise.length > 0 && (
          <CustomText
            marginTop={10}
            textAlign="center"
            color="#C89E61"
            fontWeight="bold"
            textTransform="capitalize"
            fontSize={12}>
            {data.nomEntreprise}
          </CustomText>
        )}
      </View>
      {/* Info user */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '12%',
          height: 100,
        }}>
        {/* nom user */}

        <View style={{width: '50%', alignItems: 'center'}}>
          <View>
            {(data.nom.length > 0 ) && (
              <CustomText
                fontWeight="900"
                fontSize={14}
                textAlign="center"
                numberOfLines={1}>
                {data.nom}
              </CustomText>
            )}
            {data.titrePro.length > 0 && (
              <CustomText fontSize={8} fontWeight="bold" numberOfLines={1}>
                {data.titrePro}
              </CustomText>
            )}
          </View>
        </View>

        {/* contact user */}

        <View
          style={{
            width: Dimensions.get('screen').width / 2.7,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            top: -30,
          }}>
          <View>
            {data.contact.length > 0 && (
              <RowJustifyContent
                top={-15}
                alignItems="center"
                justifyContent="flex-start">
                <CustomCircle
                  borderRadius={0}
                  size={15}
                  backgroundColor={paletteColor.BLACK}>
                  <MaterialCommunityIcons
                    name="phone"
                    size={8}
                    color={paletteColor.WHITE}
                  />
                </CustomCircle>
                <CustomText marginLeft={5} fontWeight="700" fontSize={8}>
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
                  borderRadius={0}
                  size={15}
                  backgroundColor={paletteColor.BLACK}>
                  <MaterialCommunityIcons
                    name="web"
                    size={8}
                    color={paletteColor.WHITE}
                  />
                </CustomCircle>
                <CustomText
                  marginLeft={5}
                  fontWeight="700"
                  fontSize={8}
                  numberOfLines={1}>
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
                  borderRadius={0}
                  size={15}
                  backgroundColor={paletteColor.BLACK}>
                  <MaterialCommunityIcons
                    name="email"
                    size={8}
                    color={paletteColor.WHITE}
                  />
                </CustomCircle>
                <CustomText
                  marginLeft={5}
                  fontWeight="700"
                  fontSize={8}
                  numberOfLines={1}>
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
                  borderRadius={0}
                  size={15}
                  backgroundColor={paletteColor.BLACK}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={8}
                    color={paletteColor.WHITE}
                  />
                </CustomCircle>
                <CustomText
                  marginLeft={5}
                  fontWeight="700"
                  fontSize={8}
                  numberOfLines={1}>
                  {data.adresse}
                </CustomText>
              </RowJustifyContent>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Carte8;
