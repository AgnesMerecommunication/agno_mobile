import { Alert, Dimensions, Image, Text, View } from "react-native"
import { carte, couronne, puceCarte } from "../utils/images"
import { paletteColor } from "../themes/Utility"
import CustomButton from "./CustomButton"
import { initPaymentSheet, useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { asyncGetUserId } from "../services/asyncStorage";
import { fetchPaymentSheeReplacement, getCardStripe, saveSetupIntentStripe, subscriptionsStripe } from "../services/apiServices";
import { renderActivityLoading } from "../common/activityLoading";
import { notifyMessage } from "../common/notifyMessage";
import { initializeInfoUser } from "../services/redux/reducerUser";
import { useAppDispatch } from "../services/redux/hooks";


export default function CardPremium({modal,close}: {modal? : boolean, close? : Function}){
    const dispatch = useAppDispatch();
    const {presentPaymentSheet} = useStripe();
    const [cardData, setCardData] = useState<any>([]);
    const [isValidate, setIsValidate] = useState(false); 
    const getCard = async () => {
        const accountId = await asyncGetUserId();
        getCardStripe(accountId as string)
          .then(res => setCardData(res.data))
          .catch((err: any) => console.log('err', err?.response?.data));
      };
    const initializePaymentSheet = async () => {
        const accountId = await asyncGetUserId();
        const {setupIntent, ephemeralKey, customer, setupIntentId} =
        await fetchPaymentSheeReplacement(accountId as string);
        await saveSetupIntentStripe({accountId: accountId, setupIntentId});
        await initPaymentSheet({
          merchantDisplayName: 'Agnes Mère Communication',
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          setupIntentClientSecret: setupIntent, 
        });
      };
    
      useEffect(() => {
        initializePaymentSheet();
      }, []);
    
      const handleSubscribe = async () => {
        const accountId = await asyncGetUserId();
          setIsValidate(true);
          subscriptionsStripe({accountId: accountId})
            .then(res => {
              getCard();
              setIsValidate(false);
              notifyMessage('souscription effectue avec succes');
              dispatch(initializeInfoUser());
              if(close)
              close();
            })
            .catch((err: any) => {
              setIsValidate(false);
              notifyMessage('La souscription à echoué veuillez réessayer');
              console.log(err);
            });
        const {error} = await presentPaymentSheet({});
    
        if (error) {
          if (error.code === 'Canceled') {
            notifyMessage('Le flux de paiement a été annulé');
          }else {
            Alert.alert(`${error.code}`, error.message);
          }
          console.log(`Error : ${error}`);
        } else {
          const accountId = await asyncGetUserId();
          setIsValidate(true);
          subscriptionsStripe({accountId: accountId})
            .then(res => {
              notifyMessage('souscription effectue avec succes');
              dispatch(initializeInfoUser());
              getCard();
              setIsValidate(false);
              if(close)close();
            })
            .catch((err: any) => {
              setIsValidate(false);
              notifyMessage('La souscription à echoué veuillez réessayer');
              console.log(err);
            });
        }
      };
    
    const Img = () => <Image source={puceCarte} style={{width : 28, height:28, marginRight : 12}}/>

    return (
        <View>
          <View style={{flexDirection : 'row', justifyContent :'center', height : 140, 
               alignContent : 'flex-start', marginBottom :20}}>
            <View style={{}}>
              <Image source={couronne} style={{width : 50, height : 50,right : 0,
               position : 'absolute', zIndex : 2,marginBottom : 20, top : 0, 
               transform : [{rotate : '27deg'}], marginRight : 2}}/>
              <Image source={carte} style={{width : 170, height : 170,left : 0, zIndex : 0}}/>
            </View>
          </View>
          <View style={{backgroundColor : paletteColor.WHITE , borderTopLeftRadius : 30, borderTopRightRadius : 30}}>
            {modal != true && <View style={{marginVertical : 5}}>
                <Text style={{color : paletteColor.ORANGE, fontSize : 30, fontWeight : 'bold', textAlign : 'center'}}>L'offre unique! </Text>
              </View>}
              {modal == true  && <View style={{marginVertical : 5}}>
                <Text style={{color : paletteColor.ORANGE, fontSize : 30, fontWeight : 'bold', textAlign : 'center'}}>Mode Premium!</Text>
              </View>}

              {modal != true && <View>
              <Text style={{textAlign : 'center', marginBottom:5,color : paletteColor.ORANGE, marginVertical : 5}}>Une seule offre pour améliorer votre image professionnelle.</Text>
              <Text style={{textAlign : 'center', marginBottom:5, marginVertical :  5, paddingHorizontal : 12}}>Activez le mode premium et profiter de l'offre unique qui vous donnes tout les avantages de Agno pendant 1 an.</Text>
            </View>}
            {modal == true && <View>
              <Text style={{textAlign : 'center', marginBottom:5, marginVertical :  5, paddingHorizontal : 12}}>Avec cet mode beneficiez de tout les avantages de Agno pendant 1 an.</Text>
            </View>}
            <View style={{padding : 12}}>
                <View style={{flexDirection : 'row', borderBottomWidth : 1.2, marginHorizontal : 50, paddingBottom : 8, borderColor : paletteColor.ORANGE, marginBottom : 5}}></View>
             <View style={{flexDirection : 'row',marginVertical : 6, alignItems: 'center'}}>
                <Img/>
                <Text style={{paddingRight : 8,flex : 1, flexWrap : 'wrap'}}><Text style={{fontWeight : 'bold'}}>Carte de visite ilimité :</Text>Sélectionnez des designs exclusifs et des fonctionnalités avancées pour des cartes de visite qui se démarquent.</Text>
             </View>
             <View  style={{flexDirection : 'row',marginVertical : 6, alignItems: 'center'}}>
                <Img/>
                <Text style={{paddingRight : 8,flex : 1, flexWrap : 'wrap'}}><Text style={{fontWeight : 'bold'}}>Un Site Gratuit, Un Catalogue de Services et de Produits  :</Text> Facilitez la présentation de vos services et produits  avec un catalogue en ligne attrayant.</Text>
             </View>
             <View  style={{flexDirection : 'row',marginVertical : 6, alignItems: 'center',flex:1}}>
                <Img/>
                <Text style={{paddingRight : 8, flex : 1,flexWrap : 'wrap'}}><Text  style={{fontWeight : 'bold'}}>Une Carte NFC:</Text> Simplifiez l'échange de coordonnées professionnelles avec la technologie NFC intégrée à vos cartes de visite.</Text>
             </View>
             <View  style={{flexDirection : 'row',marginVertical : 6, alignItems: 'center'}}>
                <Img/>             
                <Text style={{paddingRight : 8, flex : 1,flexWrap : 'wrap'}}> <Text style={{fontWeight : 'bold'}}>Analyse Avancée :</Text> Consultez rapidement les performances de vos produits, connaissances et services grâce à notre mini tableau de bord intégré.</Text>
             </View>
             <View style={{flexDirection : 'row', borderBottomWidth : 1.2, marginHorizontal : 50, paddingBottom : 8, borderColor : paletteColor.ORANGE}}></View>

           </View>
             <Text style={{textAlign : 'center',textDecorationLine : 'line-through', fontWeight : 'bold', fontSize : 17}}>85$</Text>
             <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}}>
                <Text style={{fontWeight : 'bold', fontSize : 30, color : paletteColor.ORANGE}}>45$</Text>
                <Text style={{fontWeight : 'bold', fontSize : 20, color : paletteColor.ORANGE, marginLeft : 5}}></Text>
                <Text style={{fontWeight :'bold'}}>/an</Text>
             </View>
          <View style={{width: Dimensions.get('screen').width, padding: 20}}>
            <CustomButton
              label="SOUSCRIRE"
              borderRadius={8}
              onPress={handleSubscribe}
            />
          </View>
            
          </View>
          {renderActivityLoading(isValidate)}

        </View>
    )
}


