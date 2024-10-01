/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import RowJustifyContent from '../../components/RowJustifyContent';
import CustomText from '../../components/CustomText';
import CustomCircle from '../../components/CustomCircle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Carte12 = ({data}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 200,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{width: 100, alignItems: 'center', justifyContent: 'center'}}>
        {data.img.length > 0 && (
          <Image
            source={{
              uri: data.img,
            }}
            style={{width: 70, height: 70}}
          />
        )}
        {data.slogan.length > 0 && (
          <CustomText
            marginTop={3}
            color="#AC9250"
            fontWeight="700"
            fontSize={9}
            textAlign="center">
            {data.slogan}
          </CustomText>
        )}
      </View>
      <View style={{width: 100}}>
        <View>
          {(data.nom.length > 0 ) && (
            <CustomText color="#AC9250" fontWeight="900" fontSize={10}>
              {data.nom}
            </CustomText>
          )}
          {data.titrePro.length > 0 && (
            <CustomText
              color="#AC9250"
              fontWeight="700"
              fontSize={7}
              marginBottom={5}>
              {data.titrePro}
            </CustomText>
          )}
        </View>
        {data.contact.length > 0 && (
          <RowJustifyContent alignItems="center" justifyContent="flex-start">
            <CustomCircle
              size={20}
              backgroundColor="transparent"
              borderRadius={5}>
              <MaterialCommunityIcons name="phone" size={10} color="#AC9250" />
            </CustomCircle>
            <CustomText
              marginLeft={5}
              color="#AC9250"
              fontWeight="700"
              fontSize={7}>
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
              backgroundColor="transparent"
              borderRadius={5}>
              <MaterialCommunityIcons name="web" size={10} color="#AC9250" />
            </CustomCircle>
            <CustomText
              marginLeft={5}
              color="#AC9250"
              fontWeight="700"
              fontSize={7}>
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
              backgroundColor="transparent"
              borderRadius={5}>
              <MaterialCommunityIcons name="email" size={10} color="#AC9250" />
            </CustomCircle>
            <CustomText
              marginLeft={5}
              color="#AC9250"
              fontWeight="700"
              fontSize={7}>
              {data.email}
            </CustomText>
          </RowJustifyContent>
        )}

        {data.adresse.length > 0 && (
          <RowJustifyContent
            marginTop={5}
            marginBottom={10}
            alignItems="center"
            justifyContent="flex-start">
            <CustomCircle
              size={20}
              backgroundColor="transparent"
              borderRadius={5}>
              <MaterialCommunityIcons
                name="map-marker"
                size={10}
                color="#AC9250"
              />
            </CustomCircle>
            <CustomText
              marginLeft={5}
              color="#AC9250"
              fontWeight="700"
              fontSize={7}>
              {data.adresse}
            </CustomText>
          </RowJustifyContent>
        )}
      </View>
    </View>
  );
};

export default Carte12;
