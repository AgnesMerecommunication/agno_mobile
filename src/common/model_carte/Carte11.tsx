/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import RowJustifyContent from '../../components/RowJustifyContent';
import CustomText from '../../components/CustomText';
import CustomCircle from '../../components/CustomCircle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Carte11 = ({data}: any) => {
  return (
    <View style={{justifyContent: 'space-between', height: 200, padding: 10}}>
      <View style={{marginLeft: 5}}>
        {data.nomEntreprise.length > 0 && (
          <CustomText fontWeight="700" fontSize={15} color="#00ADEF">
            {data.nomEntreprise}
          </CustomText>
        )}
        {data.nom.length > 0 && (
          <CustomText
            fontWeight="700"
            fontSize={15}
            marginTop={3}
            color="#51626C">
            {data.nom}
          </CustomText>
        )}
        {data.titrePro.length > 0 && (
          <CustomText fontWeight="500" fontSize={10}>
            {data.titrePro}
          </CustomText>
        )}
      </View>
      <RowJustifyContent justifyContent="space-evenly">
        {data.img.length > 0 && (
          <Image
            source={{
              uri: data.img,
            }}
            style={{width: 100, height: 100, borderRadius: 100}}
          />
        )}
        <View style={{width: '50%', height: 110, top: -10}}>
          {data.contact.length > 0 && (
            <RowJustifyContent alignItems="center" justifyContent="flex-start">
              <CustomCircle
                size={20}
                backgroundColor="transparent"
                borderRadius={5}>
                <MaterialCommunityIcons
                  name="phone"
                  size={10}
                  color="#00ADEF"
                />
              </CustomCircle>
              <CustomText
                marginLeft={5}
                color="#51626C"
                fontWeight="700"
                fontSize={10}>
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
                <MaterialCommunityIcons name="web" size={10} color="#00ADEF" />
              </CustomCircle>
              <CustomText
                marginLeft={5}
                color="#51626C"
                fontWeight="700"
                fontSize={10}>
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
                <MaterialCommunityIcons
                  name="email"
                  size={10}
                  color="#00ADEF"
                />
              </CustomCircle>
              <CustomText
                marginLeft={5}
                color="#51626C"
                fontWeight="700"
                fontSize={10}>
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
                backgroundColor="transparent"
                borderRadius={5}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={10}
                  color="#00ADEF"
                />
              </CustomCircle>
              <CustomText
                marginLeft={5}
                color="#51626C"
                fontWeight="700"
                fontSize={10}>
                {data.adresse}
              </CustomText>
            </RowJustifyContent>
          )}
        </View>
      </RowJustifyContent>
    </View>
  );
};

export default Carte11;
