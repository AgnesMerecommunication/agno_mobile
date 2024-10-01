/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import RowJustifyContent from '../../components/RowJustifyContent';
import CustomText from '../../components/CustomText';
import CustomCircle from '../../components/CustomCircle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paletteColor} from '../../themes/Utility';

const Carte5 = ({data}: any) => {
  return (
    <View style={{justifyContent: 'space-between', height: 200, padding: 10}}>
      <View
        style={{
          width: '50%',
          height: 40,
          overflow: 'hidden',
        }}>
        <View style={{marginLeft: 5}}>
          {data.nom.length > 0 && (
            <CustomText fontWeight="700" fontSize={12}>
              {data.nom}
            </CustomText>
          )}
          {data.titrePro.length > 0 && (
            <CustomText fontWeight="500" fontSize={10}>
              {data.titrePro}
            </CustomText>
          )}
        </View>
      </View>
      <RowJustifyContent>
        <View style={{width: '50%', height: 110, top: -10}}>
          {data.contact.length > 0 && (
            <RowJustifyContent alignItems="center" justifyContent="flex-start">
              <CustomCircle
                size={20}
                backgroundColor="#FF0100"
                borderRadius={35}>
                <MaterialCommunityIcons
                  name="phone"
                  size={10}
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
              alignItems="center"
              justifyContent="flex-start">
              <CustomCircle
                size={20}
                backgroundColor="#FF0100"
                borderRadius={35}>
                <MaterialCommunityIcons
                  name="web"
                  size={10}
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
              alignItems="center"
              justifyContent="flex-start">
              <CustomCircle
                size={20}
                backgroundColor="#FF0100"
                borderRadius={35}>
                <MaterialCommunityIcons
                  name="email"
                  size={10}
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
              alignItems="center"
              justifyContent="flex-start">
              <CustomCircle
                size={20}
                backgroundColor="#FF0100"
                borderRadius={35}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={10}
                  color={paletteColor.WHITE}
                />
              </CustomCircle>
              <CustomText marginLeft={5} fontWeight="700" fontSize={10}>
                {data.adresse}
              </CustomText>
            </RowJustifyContent>
          )}
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          {data.img.length > 0 && (
            <Image
              source={{
                uri: data.img,
              }}
              style={{width: 25, height: 25}}
            />
          )}
          {data.nomEntreprise.length > 0 && (
            <CustomText
              color={paletteColor.WHITE}
              fontSize={10}
              fontWeight="900"
              textAlign="center">
              {data.nomEntreprise}
            </CustomText>
          )}
          {data.slogan.length > 0 && (
            <CustomText
              color={paletteColor.GRAY}
              fontSize={8}
              fontWeight="700"
              textAlign="center">
              {data.slogan}
            </CustomText>
          )}
        </View>
      </RowJustifyContent>
    </View>
  );
};

export default Carte5;
