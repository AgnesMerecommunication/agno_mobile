/* eslint-disable react-native/no-inline-styles */
import {Dimensions, Image, StyleSheet,View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ViewShot, {captureRef} from 'react-native-view-shot';
import BodyProject from '../../components/BodyProject';
import CustomButton from '../../components/CustomButton';
import {CartData, ModelCarte} from '../../constants/Data';
import {getRenderCart} from '../../common/model_carte/getRenderCart';
import {paletteColor} from '../../themes/Utility';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Share from 'react-native-share';
import { isTablet } from '../../utils/deviceInfo';


export default function CartScreen({route}: any){
  const data = route.params.data;
  const recupTemplate : CartData = route.params.recupTemplate;
  const viewRef = useRef(null);
  const [code, setCode] = useState("agno," + uuidv4())
  const [horizontal , setHorizontal] = useState(false);


  useEffect(()=>{
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
      });
      await Share.open({url: uri, message : 'Fournis par Agno'});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <BodyProject title="Retour">
      <View style={styles.viewContainer}>
        <View />
        
        <ViewShot ref={viewRef} options={{ fileName: "carte", format: "png", quality: 0.9 }}>
          <View
            style={{
              height: horizontal == true ? 200 : 500,
              width: '100%',
              zIndex: 1,
              position: 'absolute',
              paddingRight: 10,
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
            style={{height: horizontal == true ?isTablet?400: 200 : 500,
               width: '100%', borderRadius : 10}}
          />
        </ViewShot>
       <CustomButton
          label="Telecharger ou partager"
          onPress={shareDummyImage}
          backgroundColor={
            paletteColor.ORANGE
          }
        />
      </View>
    </BodyProject>
  );
};

//export default CartScreen;

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 17,
    justifyContent: 'space-between',
    height: Dimensions.get('screen').height / 1.25,
  },
});
