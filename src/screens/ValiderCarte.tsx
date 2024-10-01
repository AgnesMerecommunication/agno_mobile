/* eslint-disable react-native/no-inline-styles */
import {Alert, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ViewShot, {captureRef} from 'react-native-view-shot';
import BodyProject from '../components/BodyProject';
import CustomButton from '../components/CustomButton';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {
  createBusinessCard,
  modifyOneBusinessCard,
} from '../services/redux/reducerCard';
import {CartData, ModelCarte, uuidCustome} from '../constants/Data';
import {useNavigation} from '@react-navigation/native';
import {getRenderCart} from '../common/model_carte/getRenderCart';
import {renderActivityLoading} from '../common/activityLoading';
import {paletteColor} from '../themes/Utility';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { asyncGetPublicKey } from '../services/asyncStorage';


const ValiderCarte = ({route}: any) => {
  const navigation = useNavigation();
  const data = route.params.data;
  const recupTemplate : CartData = route.params.recupTemplate;
  const viewRef = useRef(null);
  const formData = new FormData();
  const dispatch = useAppDispatch();
  const isLoading: boolean = useAppSelector(state => state.cards.isLoading);
  const [code, setCode] = useState("agno," + uuidv4())
  const [horizontal , setHorizontal] = useState(false);

  useEffect(()=>{
    asyncGetPublicKey().then(res=>{
      const publicKey = res;
      setCode(`https://agno.agnesmere-communication.com/${publicKey}`)
    });
    var cardNumber = ModelCarte.filter(itemA=>itemA.id == (data?.dataUpdate?.update === true
      ? data.modelId
      : recupTemplate?.id))[0];
    setHorizontal(cardNumber.horizontal);
  },[])

  

  const shareDummyImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7,
        height: 200,
      });
     // Alert.alert("DDD", recupTemplate?.id.toString());
      formData.append('firstName', data.nom);
      formData.append('companyName', data.nomEntreprise);
      formData.append('professionalTitle', data.titrePro);
      formData.append('motto', data.slogan);
      formData.append('phone1', data.contact[0]);
      formData.append('phone2', data.contact[1]);
      formData.append('email', data.email);
      formData.append('address', data.adresse);
      formData.append('website', data.web);
      formData.append('qrCodePicture', code)
      formData.append(
        'modelId',
        data?.dataUpdate?.update === true ? data.modelId : recupTemplate?.id,
      );
      formData.append('logo', data.file?.uri !== '' ? data.file : '');
      formData.append('picture', {
        uri,
        type: 'image/jpeg',
        name: uuidCustome.slice(0, 11) + '.' + 'jpeg',
      });

      if (data?.dataUpdate?.update === true) {
        //@ts-ignore
        dispatch(   modifyOneBusinessCard(data?.dataUpdate?.id, formData, navigation), );
      } else {
        //@ts-ignore
        dispatch(createBusinessCard(formData, navigation));
      }
    } catch (err) {
      
      console.error(err);
    }
  };

  return (
    <BodyProject title="Retour">
      <View style={styles.viewContainer}>
        <View />
        
        <ViewShot ref={viewRef} style={{backgroundColor : 'white'}}> 
          <View
            style={{
              height: horizontal == true ? 200 : 700,
              width: '100%',
              zIndex: 1,
              position: 'absolute',
              paddingRight: 10
            }}>
            {/* DEBUT */}
            {getRenderCart(
              data?.dataUpdate?.update === true
                ? data.modelId
                : recupTemplate?.id,
              data,
              code
            )}
            {/* FIN */}
          </View>
          <Image
            source={
              data?.dataUpdate?.update === true
                ? ModelCarte[data.modelId - 1]?.cat
                : route.params.recupTemplate?.cat
            }
            style={{height: horizontal == true ? 200 : 550,
               width: '100%', borderRadius : 10}}
          />
        </ViewShot>

        <CustomButton
          label="Enregistrer"
          onPress={shareDummyImage}
          disabled={isLoading}
          backgroundColor={
            isLoading ? paletteColor.ORANGE_OPACITY : paletteColor.ORANGE
          }
        />
        {renderActivityLoading(isLoading)}
      </View>
    </BodyProject>
  );
};

export default ValiderCarte;

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 17,
    justifyContent: 'space-between',
    height: Dimensions.get('screen').height / 1.25,
  },
});
