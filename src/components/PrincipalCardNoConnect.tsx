import { useState, useRef, useEffect } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { asyncGetImage, asyncGetPrincipale, asyncGetPublicKey, asyncPostImage, asyncPostPrincipale, asyncPostPublicKey } from '../services/asyncStorage';
import Share from 'react-native-share';
import  ViewShot, { captureRef } from 'react-native-view-shot';
import QrPrincipaleCard from "./PrincipaleCard/QrPrincipaleCard";
import SharedCard from "./PrincipaleCard/SharedCard";
import { ActivityIndicator } from "react-native-paper";




export default function PrincipalCardNoConnect(){
    const [horizontal,setHorizontal] = useState(false);
    const ref = useRef(null);
    const [item, setItem] = useState<any>();
    const  [image , setImage] = useState<string>();
    const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const go = async ()=>{
        try {
            setLoading(true);
            let principale = await asyncGetPrincipale();
            if(principale){ 
                let item = JSON.parse(principale);
                setItem(item);
                let imageItem =  await retrieveImage();
                if(imageItem){
                    setImage(imageItem);
                }
                setLoading(false);
            } 
        } catch (error) {
            console.log(error);    
        }
    }
    go();
    },[])
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
           <Text>Vous n'avez pas de carte, vous devez vous connectez pour creer une carte</Text>
        </> :
           <View  style={{width : '100%', padding : 10}}> 
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
            <View style={{flexDirection : 'row', justifyContent : 'space-between', marginTop : 12, paddingHorizontal : 20}}> 
              <QrPrincipaleCard/>
              <SharedCard sharedImage={()=>shareImage()} sharedLink={()=>sharedLink()}/>
            </View>
          </View>
           </View>
          }
        </>
      );
}