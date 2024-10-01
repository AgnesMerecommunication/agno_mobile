/* eslint-disable react-native/no-inline-styles */
import {Alert, Image, StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import CustomText from './CustomText';
import CustomCircle from './CustomCircle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {paletteColor} from '../themes/Utility';
import ImagePicker from 'react-native-image-crop-picker';
import {getExtension, uuidCustome} from '../constants/Data';

interface PropsSelectPictue {
  title: String;
  onChangeCamera?: any;
  onChangeGallery?: any;
  circle?: boolean,
  horizontal? : boolean
  verifFile: {
    camera: boolean;
    picker: boolean;
  };
}

const SelectPictue = ({
  title,
  onChangeCamera,
  onChangeGallery,
  verifFile,circle, horizontal
}: PropsSelectPictue) => {
  const [imageLink, setImageLink] = useState<string|undefined>();
  const openCameraPicker = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 200,
      cropping: true,
      cropperCircleOverlay: circle == null || circle == true ? true : circle,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: horizontal == true ? 400 : 700,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        const newFile = {
          uri: image.path,
          type: image.mime,
          name: uuidCustome.slice(0, 11) + '.' + getExtension(image.path),
        };
      
        setImageLink(image.path);
        onChangeCamera(newFile);
      })
      .catch(e => console.log('error camera', e));
  };
  const choosePicker = async () => {
    ImagePicker.openPicker({
      cropping: true,
      cropperCircleOverlay: circle == null || circle == true ? true : circle,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: horizontal == true ? 400 : 700,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        const newFile = {
          uri: image.path,
          type: image.mime,
          name: uuidCustome.slice(0, 11) + '.' + getExtension(image.path),
        };
        setImageLink(image.path);
        onChangeGallery(newFile);
      })
      .catch(e => console.log('error gallery', e));
  };
  return (
    <View>
      <CustomText>{title}</CustomText>
      <View style={[styles.cardNotif, {padding: '3%', marginBottom: '5%'}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {imageLink ?
          <View style={{justifyContent : 'center' , alignItems : 'center' }}>
            <Image 
            source={{uri : imageLink}}
            style={{height : 50, width : 50 , borderRadius : 50}}/>
          </View> 
        : 
        <CustomCircle
              onPress={openCameraPicker}
              size={60}
              backgroundColor={paletteColor.ORANGE_OPACITY}
              borderRadius={30}>
              
                    {verifFile.camera === true ? (
                      <MaterialCommunityIcons
                        name="check-bold"
                        size={23}
                        color={paletteColor.GREEN}
                      />
                      ) : (
                      <MaterialCommunityIcons
                        name="camera"
                        size={23}
                        color={paletteColor.ORANGE}
                      />
                      )}
        </CustomCircle>
        }
          
          <View style={{marginHorizontal: 10}}>
            <CustomText>Depuis votre galerie</CustomText>
            <CustomText
              color={'#EC8517'}
              fontWeight="bold"
              onPress={choosePicker}>
              {verifFile.picker === true
                ? 'Changer cette photo'
                : ' Charger une photo'}
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

export default SelectPictue;

const styles = StyleSheet.create({
  cardNotif: {
    marginTop: 5,
    backgroundColor: paletteColor.WHITE,
    borderRadius: 8,
    elevation: 1.1,
  },
});
