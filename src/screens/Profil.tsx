/* eslint-disable react-native/no-inline-styles */
import {Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../components/CustomText';
import {paletteColor} from '../themes/Utility';
import CustomTextIcon from '../components/CustomTextIcon';
import RowJustifyContent from '../components/RowJustifyContent';
import CustomButton from '../components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../hooks/AuthProvider';
import {
  actionReducer,
  actionTypeReducer,
} from '../contexts/reducers/actionReducer';
import {asyncGetPublicKey, asyncGetToken, asyncGetUserId, asyncRemoveGetToken} from '../services/asyncStorage';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {launchUrl} from '../common/launchUrl';
import {person} from '../utils/images';
import CustomCircle from '../components/CustomCircle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Icons from "react-native-heroicons/outline";
import CouleurSelect from '../components/CouleurSelect';
import { modifyInfoUser } from '../services/redux/reducerUser';
import { underSubscriptionType } from '../utils/data';
import Dialog from "react-native-dialog";
import { updateInfoUser } from '../services/apiServices';
import AppLoading from './Loading';

const Profil = () => {
  const navigation = useNavigation();
  const {dispatchAuhtContext} = useAuth();
  const user: any = useAppSelector(state => state.user.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await asyncGetToken();
        if(userToken){
          setIsLoading(false);
          dispatchAuhtContext(
            actionReducer(actionTypeReducer.RESTORE_TOKEN, userToken),
          );
        }else {
          navigation.navigate('Login' as never);
        }
      } catch (e) {
        navigation.navigate('Login' as never);
      }
    };

    bootstrapAsync();
  }, [])
  
  const handleDeconnexion = () => {
    dispatchAuhtContext(actionReducer(actionTypeReducer.SIGN_OUT));
    asyncRemoveGetToken();
  };
  const handleReturn = () => {
    navigation.goBack();
  };
  const updateColor = (color : string)=> {
    const formData = new FormData();
    formData.append('color', color)
    dispatch(modifyInfoUser(formData));
    setModalVisible(false);
  }
  if(isLoading == true){
    return <AppLoading />;
  }
  
  return (
    <View style={{flex : 1}}>
      <View style={styles.viewContainer}>
        <RowJustifyContent marginTop={'15%'}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent : 'center',
            marginTop: 15,
          }}
        onPress={handleReturn}>
          <CustomCircle
            disabled={true}
            borderColor={paletteColor.ORANGE}
            size={25}
            backgroundColor={paletteColor.GRAY_OPACITY}
            borderRadius={10}
            borderWidth={1}>
            <MaterialIcons
              name="chevron-left"
              size={22}
              color={paletteColor.ORANGE}
            />
          </CustomCircle>
          <View style={{marginLeft : 8
          }}></View>
          <CustomText  fontWeight="bold" fontSize={25}>
            Profile
          </CustomText>
        </Pressable>
         <CustomTextIcon
            onPress={() => navigation.navigate('UpdateProfil' as never)}
            color={paletteColor.ORANGE}
            colorText={paletteColor.ORANGE}
            nameIcon="border-color"
            title="Editer les informations"
          />
        </RowJustifyContent>
      </View>
     <View style={{flex : 1}}>
        <ScrollView style={{flex : 1}}>
        <View style={styles.viewContainer}>
          <View style={styles.cardNotif}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <View
                style={{
                  backgroundColor: paletteColor.ORANGE,
                  width: 100,
                  padding: 5,
                  borderTopRightRadius: 13,
                  borderBottomLeftRadius: 13,
                }}>
                <CustomText textAlign="center" color={paletteColor.WHITE}>
                  {user?.underSubscriptionType}
                </CustomText>
              </View>
            </View>
            <View style={styles.imgBackground}>
              <Image
                source={
                  user?.picture
                    ? {
                        uri: `${user?.picture}`,
                      }
                    : person
                }
                style={styles.imgProfil}
              />
              <CustomText fontWeight="bold" fontSize={18} marginTop={10}>
                {user?.firstName} {user?.lastName}
              </CustomText>
              <CustomText>{user?.email}</CustomText>
              <CustomText marginTop={5} marginBottom={5}>
                {user?.phone}
              </CustomText>
              {user?.underSubscriptionType
                       === underSubscriptionType.PREMIUM && <View>
            
              <CustomText  color={paletteColor.ORANGE}
                onPress={async() =>{
                  const publicKey = await asyncGetPublicKey();
                  launchUrl(`https://agno.vercel.app/${publicKey}`)}
                  }>
                 Voir  mon site web
              </CustomText>
              </View>}
              <View>
              <CustomText  color={paletteColor.ORANGE}
                onPress={() => navigation.navigate('PaymentScreen' as never)}>
                Modifier ma carte bancaire
              </CustomText>
              </View>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            style={{backgroundColor :paletteColor.BG}}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={{backgroundColor : 'white',
            width : "95%", height : "50%",marginTop : 
            150,marginLeft : 8,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,borderRadius : 12, padding : 8}}>
              <View style={{flexDirection : 'row' , justifyContent : 'space-between', paddingTop : 6}}>
                <Text style={{fontWeight : 'bold',fontSize : 16,marginBottom : 20, color : paletteColor.BLACK}}>
                  Selectionnez une couleur pour le site</Text>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Icons.XCircleIcon size={30} color={ paletteColor.RED}/>
                </Pressable>
              </View>
            <ScrollView>
            <CouleurSelect backgroundColor={paletteColor.BLACK} colorText='Noir' 
                    onPress={()=>{
                      updateColor(paletteColor.BLACK)
                    }}/>
            <CouleurSelect backgroundColor={paletteColor.WHITE} colorText='Blanche' 
                  onPress={()=>{
                    updateColor(paletteColor.WHITE)
                  }} borderColor={paletteColor.BLACK}/>
    {/*
            <CouleurSelect backgroundColor={paletteColor.BLUE} colorText='Bleu' 
                  onPress={()=>{
                    updateColor(paletteColor.BLUE)
                  }}/>

            <CouleurSelect backgroundColor="#000080" colorText='Bleu marine' 
                  onPress={()=>{
                    updateColor("#000080")
                  }}/>
            <CouleurSelect backgroundColor="#D3D3D3" colorText='Gris Clair' 
                  onPress={()=>{
                    updateColor("#D3D3D3")
                  }}/>
            <CouleurSelect backgroundColor="#B22222" colorText='Brique Rouge' 
                  onPress={()=>{
                    updateColor("#B22222")
                  }}/>
            <CouleurSelect backgroundColor="#F5F5DC" colorText='Blanc Cassé' 
                  onPress={()=>{
                    updateColor("#F5F5DC")
                  }}/>
             <CouleurSelect backgroundColor="#228B22" colorText='Vert Forêt' 
                  onPress={()=>{
                    updateColor("#228B22")
                  }}/>
            <CouleurSelect backgroundColor="#F4A460" colorText='Beige Sable' 
                  onPress={()=>{
                    updateColor("#F4A460")
                  }}/>
            <CouleurSelect backgroundColor="#9370DB" colorText='Mauve Doux' 
                  onPress={()=>{
                    updateColor("#9370DB")
                  }}/>
            <CouleurSelect backgroundColor="#40E0D0" colorText='Turquoise' 
                  onPress={()=>{
                    updateColor("#40E0D0")
                  }}/>*/}
            </ScrollView>
             
            </View>
          </Modal>
          {user?.underSubscriptionType
                       === underSubscriptionType.PREMIUM && 
          <View style={{ height : 70,
                borderRadius : 10,
                padding : 12,
                marginTop : 10,backgroundColor : 'white',flexDirection : 'row'}}>
                  
                  <Pressable onPress={()=>{
                        setModalVisible(!modalVisible);
                  }} style={{flexDirection : 'row',alignItems : 'center', 
                    justifyContent: 'space-between',width : '100%' }}>
                    <View style={{flexDirection : 'row',alignItems : 'center'}}>
                      <Icons.GlobeAltIcon size={50} color={paletteColor.ORANGE} style={{marginRight : 5}}/>
                      <View>
                          <Text style={{fontWeight : 'bold', color : paletteColor.BLACK}}>Paramètre de site web</Text>
                          <Text style={{fontSize : 10, color : paletteColor.BLACK}}>Cliquez pour selectionner sa couleur</Text>
                      </View>
                    </View>
                    <CouleurSelect
                          backgroundColor={user.color ?? paletteColor.BLACK}  single={false} />
                  </Pressable>
          </View>}
          {/* <View style={[styles.cardNotif, {padding: '4%'}]}>
            <RowJustifyContent flex={1} alignItems="center">
              <View style={{top: -5}}>
                <CustomTextIcon
                  color={paletteColor.ORANGE}
                  nameIcon="bell"
                  title="Notifications"
                />
              </View>
              <CustomCircle
                size={40}
                backgroundColor={paletteColor.GRAY_OPACITY}
                borderRadius={10}>
                <CustomText fontWeight="700" color={paletteColor.RED}>
                  12+
                </CustomText>
              </CustomCircle>
            </RowJustifyContent>
          </View> */}
          {(user?.instagram ||
            user?.facebook ||
            user?.twitter ||
            user?.linkedin ||
            user?.whatsapp) && (
            <CustomText fontWeight="700" fontSize={15} marginTop={15}>
              Reseaux sociaux
            </CustomText>
          )}
          <View style={{marginBottom: '10%'}}>
            {user?.facebook && (
              <CustomTextIcon
                onPress={() => launchUrl(user?.facebook)}
                colorText={paletteColor.ORANGE}
                nameIcon="facebook"
                title={user?.facebook}
              />
            )}
            {user?.instagram && (
              <CustomTextIcon
                onPress={() => launchUrl(user?.instagram)}
                colorText={paletteColor.ORANGE}
                nameIcon="instagram"
                title={user?.twitter}
                color="#AE479B"
              />
            )}

            {user?.twitter && (
              <CustomTextIcon
                onPress={() => launchUrl(user?.twitter)}
                colorText={paletteColor.ORANGE}
                nameIcon="twitter"
                title={user?.twitter}
                color="#1D9CEA"
              />
            )}
            {user?.linkedin && (
              <CustomTextIcon
                onPress={() => launchUrl(user?.linkedin)}
                colorText={paletteColor.ORANGE}
                nameIcon="linkedin"
                title={user?.linkedin}
                color="#0078B5"
              />
            )}
            {user?.whatsapp && (
              <CustomTextIcon
                onPress={() => launchUrl(`https://wa.me/${user?.whatsapp}`)}
                colorText={paletteColor.ORANGE}
                nameIcon="whatsapp"
                title={user?.whatsapp}
                color={paletteColor.GREEN}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={{padding : 12}}>
          <CustomButton
                onPress={handleDeconnexion}
                label="Deconnexion"
                colorText={paletteColor.RED}
                verifLogo={true}
                logo={
                  <MaterialCommunityIcons
                    name="power"
                    size={20}
                    color={paletteColor.RED}
                  />
                }
                backgroundColor={paletteColor.WHITE}
          />
          <Dialog.Container visible={visible}>
            <Dialog.Title>Supprimer son compte</Dialog.Title>
            <Dialog.Description>
              Veuillez noter que la suppression de votre compte entraînera  
              la perte permanente de toutes vos données. 
              Cette action est irréversible. 
              Si vous êtes certain de votre décision, 
              veuillez procéder en cliquant sur le bouton supprimer.
            </Dialog.Description>
            <Dialog.Button label="Annuler" onPress={()=>setVisible(false)}/>
            <Dialog.Button label="Supprimer" onPress={async()=>{
                     const formData = new FormData();
                     formData.append('status', "DELETE")
                     const token = await asyncGetToken();
                     const config = {
                       headers: {
                         Accept: 'application/json',
                         'Content-Type': 'multipart/form-data',
                         Authorization: `Bearer ${token}`,
                       },
                     };
                     const userId = await asyncGetUserId();
                     await updateInfoUser(formData, userId, config);
                     dispatchAuhtContext(actionReducer(actionTypeReducer.SIGN_OUT));
                     asyncRemoveGetToken();
            }} style={{color : paletteColor.RED}} />
          </Dialog.Container>
          <View 
                style={{flexDirection : 'row', justifyContent : 'center', marginTop : 12}}>
                <CustomText  color={paletteColor.RED} fontWeight='600'
                  onPress={() =>setVisible(true)}>
                    Supprimer mon compte
                </CustomText>
          </View>
        </View>
      </View>

      
  

     

    </View>
  );
};

export default Profil;

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 17,
  },

  cardNotif: {
    marginTop: 20,
    backgroundColor: paletteColor.WHITE,
    borderRadius: 13,
    elevation: 1,
  },
  imgBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
  },
  imgProfil: {
    resizeMode: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: '4%',
  },
  lngImg: {width: 25, height: 25, marginRight: 15, borderWidth: 2},
});

