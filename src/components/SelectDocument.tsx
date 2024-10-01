/* eslint-disable react-native/no-inline-styles */
import {Alert, Image, Platform, StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import CustomText from './CustomText';
import CustomCircle from './CustomCircle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paletteColor} from '../themes/Utility';
import {getExtension, uuidCustome} from '../constants/Data';
import { pick } from 'react-native-document-picker';
import * as RNFS from '@dr.pogodin/react-native-fs';
import { v4 as uuidv4 } from 'uuid';



interface PropsSelectPictue {
  title: String;
  onChangeDocument?: any;
  circle?: boolean,
  horizontal? : boolean
  verifFile: {
    picker: boolean;
  };
}

const SelectDocument = ({
  title,
  onChangeDocument,
  verifFile
}: PropsSelectPictue) => {
  const documentPicker = async () => {
    try {
        const [pickResult] = await pick({mode:'open'});
        var uri = pickResult.uri;
        if(Platform.OS === 'android'){
          uri = await convertContentUriToFileUri(pickResult.uri);
        }
        const newFile = {
            uri: uri,
            type: pickResult.type,
            name: uuidCustome.slice(0, 11) + '.' + getExtension(pickResult.name ?? ''),
          };
          //Alert.alert("Document", JSON.stringify(newFile));
          onChangeDocument(newFile);
        // const [pickResult] = await pick({mode:'import'}) // equivalent
        // do something with the picked file
      } catch (err: unknown) {
      //  Alert.alert("ED", JSON.stringify(err));
        // see error handling
      }
  };

    // Fonction pour convertir l'URI de contenu en URI de fichier
    const convertContentUriToFileUri = async (contentUri : string) => {
      try {
        const filePath = `${RNFS.TemporaryDirectoryPath}/${uuidv4()}`;
        await RNFS.copyFile(contentUri, filePath);
        return `file://${filePath}`;
      } catch (error) {
        console.error("Error converting content URI to file URI: ", error);
        throw error;
      }
    };
  
  return (
    <View>
      <CustomText>{title}</CustomText>
      <View style={[styles.cardNotif, {padding: '3%', marginBottom: '5%'}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomCircle
              onPress={documentPicker}
              size={60}
              backgroundColor={paletteColor.ORANGE_OPACITY}
              borderRadius={30}>
              <MaterialCommunityIcons
                        name="file-document-outline"
                        size={23}
                        color={paletteColor.GREEN}
                      />
        </CustomCircle>  
          <View style={{marginHorizontal: 10}}>
            <CustomText>Depuis votre galerie</CustomText>
            <CustomText
              color={'#EC8517'}
              fontWeight="bold"
              onPress={documentPicker}>
              {verifFile.picker === true
                ? 'Changer votre catalogue'
                : ' Charger un catlogue au format pdf'}
              {verifFile.picker === true && (
                <MaterialCommunityIcons
                  name="check-bold"
                  size={16}
                  color={paletteColor.GREEN}
                />
              )}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SelectDocument;

const styles = StyleSheet.create({
  cardNotif: {
    marginTop: 5,
    backgroundColor: paletteColor.WHITE,
    borderRadius: 8,
    elevation: 1.1,
  },
});


