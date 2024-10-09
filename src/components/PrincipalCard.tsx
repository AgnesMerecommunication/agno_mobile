import { useState, useRef, useEffect } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { asyncGetImage, asyncGetPrincipale, asyncGetPublicKey, asyncPostImage, asyncPostPrincipale, asyncPostPublicKey } from '../services/asyncStorage';
import Share from 'react-native-share';
import  ViewShot, { captureRef } from 'react-native-view-shot';
import { ModelCarte } from "../constants/Data";
import { useAppDispatch, useAppSelector } from "../services/redux/hooks";
import QrPrincipaleCard from "./PrincipaleCard/QrPrincipaleCard";
import ChangerCard from "./PrincipaleCard/ChangerCard";
import SharedCard from "./PrincipaleCard/SharedCard";
import { modifyOneBusinessCard } from "../services/redux/reducerCard";
import { useNavigation } from "@react-navigation/native";
import ModalCreateTemplate from "./ModalCreateTemplate";
import { paletteColor } from "../themes/Utility";
import { getBusinessCards } from "../services/apiServices";
import * as RNFS from '@dr.pogodin/react-native-fs';
import { ActivityIndicator } from "react-native-paper";

export default function PrincipalCard(){
    const navigation = useNavigation();
    const [horizontal,setHorizontal] = useState(false);
    const cards = useAppSelector(state => state.cards.cards);
    const ref = useRef(null);
    const [item, setItem] = useState<any>();
    const dispatch = useAppDispatch();
    const [isVisibleBottom, setIsVisibleBottom] = useState(false);
    const [code, setCode] = useState('');
    const  [image , setImage] = useState<string>();
    const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const go = async ()=>{
      setLoading(true);
      let codeData  = await asyncGetPublicKey();
      setCode(`https://agno.vercel.app/${codeData}`);
      let principale = await asyncGetPrincipale();
     
      if(principale){ 
        let item = JSON.parse(principale);
        setItem(item);
        let imageItem = await retrieveImage();
        if(imageItem){
          setImage(imageItem);
        }else {
          await downloadAndStoreImage(item.picture);
          imageItem = await retrieveImage();
          setImage(imageItem);
        }
        setLoading(false);
      }else {
        let res = await  getBusinessCards('', '');
        let cards = res.data;
        if(cards.length > 0){
          //@ts-ignore
            var item = cards.filter((item)=>item.principale == 1).length > 0  ? cards.filter((item)=>item.principale == 1)[0]:cards[0];
            await downloadAndStoreImage(item.picture);
            let imageItem = await retrieveImage();
            setImage(imageItem);
            setItem(item);
            asyncPostPrincipale(JSON.stringify(item))
            var cardNumber = ModelCarte.filter(itemA=>itemA.id == item.modelId)[0];
            setHorizontal(cardNumber.horizontal);
        }
        setLoading(false)
      }    
    }
    go();
    },[navigation])
    
    // Fonction pour télécharger et stocker l'image
const downloadAndStoreImage = async (imageUrl : string) => {
  try {
    // Télécharger l'image et la convertir en base64
    const imagePath = `${RNFS.DocumentDirectoryPath}/image.jpg`;

    const downloadResult = await RNFS.downloadFile({
      fromUrl: imageUrl,
      toFile: imagePath,
    }).promise;

    if (downloadResult.statusCode === 200) {
      const imageBase64 = await RNFS.readFile(imagePath, 'base64');

      // Enregistrer l'image en base64 dans AsyncStorage
      await asyncPostImage(imageBase64);
      console.log('Image enregistrée avec succès en Base64');
    } else {
      console.error('Erreur de téléchargement:', downloadResult.statusCode);
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement/enregistrement:', error);
  }
};

// Fonction pour récupérer l'image depuis AsyncStorage
const retrieveImage = async () => {
  try {
    const base64Image = await asyncGetImage();
    if (base64Image) {
      return `data:image/jpeg;base64,${base64Image}`;
    } else {
      console.log('Aucune image enregistrée');
    }
  } catch (error) {
    console.error('Erreur de récupération:', error);
  }
};


    const sharedLink = async() => {
        const userId = await asyncGetPublicKey();
          
         Share.open({ message :`Découvrer mes informations sur :   https://agno.vercel.app/${userId}    
                                   \nFournis par Agno`,
                      })
                      .then((res) => {
                        console.log(res);
                      })
                      .catch((err) => {
                        err && console.log(err);
                      });
      };
      const shareImage = async () => {
        try {
          const uri = await captureRef(ref, {
            format: 'png',
            quality: 0.7,
          });
          await Share.open({url: uri, message : '\nFournis par Agno'});
        } catch (e) {
          console.log(e);
        }
      };

      return (
        <>
        {!item ?  
        <>
          <Pressable onPress={()=>{
             navigation.navigate('TemplateCarte' as never);
          }} style={{borderColor : paletteColor.ORANGE, borderStyle : 'dashed', borderRadius : 10, 
                  alignItems : 'center', alignContent : 'center', padding : 12, marginVertical : 50, borderWidth : 1}}>
               <Text style={{color : paletteColor.BLACK}}>Ajouter une carte</Text>
          </Pressable>
          <ModalCreateTemplate
            isVisible={isVisibleBottom}
            onBackdropPress={() => setIsVisibleBottom(false)}
            onPressTemplate={() => {
              setIsVisibleBottom(false);
              navigation.navigate('TemplateCarte' as never);
            }}
            onPressScan={() => {
              setIsVisibleBottom(false);
              navigation.navigate('Scan' as never);
            }}
            onPressPhoto={() => {
              setIsVisibleBottom(false);
              navigation.navigate('Photo' as never);
            }}
          />
        </> :
          <View
            style={{
              height:horizontal == true ? 270 : 580,
              width :'100%',
              borderWidth : 0.3,
              borderRadius : 5,
              borderColor : 'gray',
              padding : 12,
              marginTop : 10,backgroundColor : 'white'
            }}
          >
            <ViewShot ref={ref}>
              {loading ? (<ActivityIndicator size="large" color="#0000ff" /> ): (<Image
              style={{
                height:horizontal == true ? 180 : 500,
                width :'100%',
                resizeMode: 'stretch',
                borderRadius : 5
              }}
              source={{uri: image}}
            />)} 
            
                </ViewShot>
            <View style={{flexDirection : 'row', justifyContent : 'space-between', marginTop : 12}}> 
              <QrPrincipaleCard/>
              <ChangerCard items={cards} onChange={(itema : any)=>{
                  setItem(itema);
                  var cardNumber = ModelCarte.filter(itemA=>itemA.id == itema.modelId)[0];
                  const formData = new FormData();
                  formData.append('principale',1)
                  dispatch(
                    modifyOneBusinessCard(itema.id, formData),
                  );
                  setHorizontal(cardNumber.horizontal);
                  const formDataItem = new FormData();
                  formDataItem.append('principale',0)
                  dispatch(
                    modifyOneBusinessCard(item.id, formDataItem),
                  );
              }}/>
              <SharedCard sharedImage={()=>shareImage()} sharedLink={()=>sharedLink()}/>
          
            
            </View>
          </View>
          }
        </>
      );
}