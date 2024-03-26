import { useState, useRef, useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { asyncGetPublicKey } from '../services/asyncStorage';
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



export default function PrincipalCard(){
    const navigation = useNavigation();
    const [horizontal,setHorizontal] = useState(false);
    const cards = useAppSelector(state => state.cards.cards);
    const ref = useRef(null);
    const [item, setItem] = useState<any>();
    const dispatch = useAppDispatch();
    const [isVisibleBottom, setIsVisibleBottom] = useState(false);
    const [code, setCode] = useState('');
  useEffect(()=>{
    asyncGetPublicKey().then(res=>{
      const publicKey = res;
      setCode(`https://agno.vercel.app/${publicKey}`);
    })
     getBusinessCards('', '').then((res=>{
      let cards = res.data;
      if(cards.length > 0){
        //@ts-ignore
          var item = cards.filter((item)=>item.principale == 1).length > 0  ? cards.filter((item)=>item.principale == 1)[0]:cards[0];
          setItem(item);
          var cardNumber = ModelCarte.filter(itemA=>itemA.id == item.modelId)[0];
          setHorizontal(cardNumber.horizontal);
      } 
    }));
    },[])
    
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
          await Share.open({url: uri, message : 'Fournis par Agno'});
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
              height:horizontal == true ? 270 : 540,
              width :'100%',
              borderWidth : 0.3,
              borderRadius : 5,
              borderColor : 'gray',
              padding : 12,
              marginTop : 10,backgroundColor : 'white'
            }}
          >
            <ViewShot ref={ref}>
            <Image
              style={{
                height:horizontal == true ? 180 : 450,
                width :'100%',
                resizeMode: 'stretch',
                borderRadius : 5
              }}
              source={{uri: item.picture+ '?' + new Date()}}
            />
                </ViewShot>
            <View style={{flexDirection : 'row', justifyContent : 'space-between', marginTop : 12}}> 
              <QrPrincipaleCard value={code}/>
              <ChangerCard items={cards} onChange={(itema : any)=>{
                // Alert.alert("SS", JSON.stringify(item));
                  setItem(itema);
                  var cardNumber = ModelCarte.filter(itemA=>itemA.id == itema.modelId)[0];
                  setHorizontal(cardNumber.horizontal);
                  const formData = new FormData();
                  formData.append('principale',1)
                  dispatch(
                    modifyOneBusinessCard(itema.id, formData),
                  );
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