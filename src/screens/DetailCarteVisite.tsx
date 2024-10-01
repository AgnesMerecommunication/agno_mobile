/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import BodyProject from '../components/BodyProject';
import CustomText from '../components/CustomText';
import {paletteColor} from '../themes/Utility';
import RowJustifyContent from '../components/RowJustifyContent';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {formateDate} from '../utils/formateDate';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {removeOneBusinessCard} from '../services/redux/reducerCard';
import {renderActivityLoading} from '../common/activityLoading';
import {asyncGetPublicKey} from '../services/asyncStorage';
import { ModelCarte } from '../constants/Data';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import ViewShot, { captureRef } from 'react-native-view-shot';
import DetailsCardShared from '../components/DetailsCardShared';
import PremiumModal from '../components/PremiumModal';
import { underSubscriptionType } from '../utils/data';


const ImageComponent = ({uri, horizontal} : {uri : string,horizontal : boolean}) => {
  return (
    <Image
      source={{ uri: uri}}
      style={{
        height: horizontal == true ? 200 : 500,
        width: '100%',
        marginVertical: 15, borderRadius : 10
      }}
    />
  );
};
const DetailCarteVisite = ({route}: any) => {
  const navigation = useNavigation();
  const item = route.params;
  const dispatch = useAppDispatch();
  const isLoading: boolean = useAppSelector(state => state.cards.isLoading);
  var cardNumber = ModelCarte.filter(itemA=>itemA.id == item.modelId);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const user: any = useAppSelector(state => state.user.users);

  const sheredLink = async() => {
    setIsVisible(false);
    const userId = await asyncGetPublicKey();
    if(user?.underSubscriptionType
      === underSubscriptionType.PREMIUM){
        Share.open({
          message :`Découvrer mes informations sur :   https://agno.agnesmere-communication.com/${userId}    
          \nFournis par Agno`,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
      }else {
          setShowModal(false);
      }
                 
  
  };
  const shareImage = async () => {
    setIsVisible(false);
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
  
  const handleDelete = () => {
    Alert.alert(
      'INFORMATION',
      'Voulez vous vraiment supprimer cette carte ? ',
      [
        {
          text: 'Annuler',
        },
        {
          text: 'Oui',
          onPress: () => {
            //@ts-ignore
            dispatch(removeOneBusinessCard(item.id, navigation));
          },
        },
      ],
    );
  };

 
  return (
    <BodyProject title="Retour">
                <PremiumModal isVisible={showModal} onBackdropPress={()=> setShowModal(false)} close={()=> setShowModal(false)}/>

      <ScrollView>
        <View
          style={{
            marginHorizontal: 17,
            marginVertical: '5%',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View>
            <View style={{
              flexDirection : 'row', justifyContent : 'space-between'
            }}>
              <View>
                <CustomText fontWeight="bold"> Carte de visite </CustomText>
              <CustomText marginBottom={10} fontSize={13}>
                Date: {formateDate(new Date(item.createdAt))}
              </CustomText>
              </View>
              <DetailsCardShared sharedImage={()=>shareImage()} sharedLink={()=>sheredLink()}/>
            </View>
           

            <View style={{zIndex : 0}}>
            <ViewShot ref={ref}>
                  <ImageComponent
                    uri={item.picture + '?' + new Date()}
                    horizontal={(cardNumber.length == 0 ? true : (cardNumber[0].horizontal  == true ? false : true) )}
                  />
                </ViewShot>
            </View>
            <CustomText>Place carte</CustomText>

            <RowJustifyContent justifyContent="flex-start" marginTop={5} alignItems="center">
              <QRCode
                size={190}
                value={item.qrCodePicture}
              />
            </RowJustifyContent>
            
            <View style={{paddingVertical: '5%'}}>
              <CustomText>Nombre de fois scanné</CustomText>
              <CustomText fontWeight="bold">{item.scansNumber}</CustomText>
            </View>
          </View>
          <RowJustifyContent justifyContent="space-around" marginBottom={'10%'}>
            <View style={{width: Dimensions.get('screen').width / 2.7}}>
              <CustomButton
                label="Supprimer"
                colorText={paletteColor.RED}
                backgroundColor="transparent"
                borderWidth={1}
                disabled={isLoading}
                borderColor={
                  isLoading ? paletteColor.RED_OPACITY : paletteColor.RED
                }
                onPress={handleDelete}
              />
            </View>
            <View style={{width: Dimensions.get('screen').width / 2.7}}>
              <CustomButton
                label="Editer"
                onPress={() =>
                  navigation.navigate({
                    name: 'FormulaireCarte',
                    params: {
                      dataUpdate: item,
                      update: true,
                    },
                  } as never)
                }
              />
            </View>
          </RowJustifyContent>
          {renderActivityLoading(isLoading)}
        </View>
      </ScrollView>
    </BodyProject>
  );
};

export default DetailCarteVisite;


