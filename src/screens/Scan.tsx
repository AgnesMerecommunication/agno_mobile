import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
  Platform,
  Text,Linking
} from 'react-native';
import {check, PERMISSIONS, PermissionStatus, RESULTS} from 'react-native-permissions';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../components/CustomText';
import BottomSheetComponent from '../components/BottomSheetComponent';
import RowJustifyContent from '../components/RowJustifyContent';
import {paletteColor} from '../themes/Utility';
import { addContact} from '../services/apiServices';
import {useAppDispatch, useAppSelector} from '../services/redux/hooks';
import {createBusinessCardSave} from '../services/redux/reducerCard';
import {renderActivityLoading} from '../common/activityLoading';
import {notifyMessage} from '../common/notifyMessage';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import CustomCircle from '../components/CustomCircle';
import * as Icons from "react-native-heroicons/solid";
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import { nfc, qr } from '../utils/images';
import CustomButton from '../components/CustomButton';
import Contacts from 'react-native-contacts';
import { IContact } from '../types/api';

NfcManager.start();

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Scan = () => {
  const [isVisibleBottom, setIsVisibleBottom] = useState(false);
  const [dataCard, setDataCard] = useState<any>({data: null, id: ''});
  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()
  const [isPermission , setIsPermission] = useState(false);
  const [nfcSupported, setNFcSupported] = useState(false);
  const [isQrCodeScan, setIsQrCodeScan] = useState(false);
  const [isScanned, setIScanned] = useState(false);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if(isQrCodeScan == true && isScanned == false){
        setIScanned(true);
        //Alert.alert("DS", JSON.stringify(codes[0].value));
        // Alert.alert(`Scanned ${codes} codes!`)
        if(codes.length > 0){
          onSuccess(codes[0].value?.replaceAll('"', "") + "");
        }
      }
    }
  })
  const isLoadingCardSave: boolean = useAppSelector(
    state => state.cards.isLoadingCardSave,
  );
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(()=>{
    const checkPermission = async () =>{
      let nfcSupported = await NfcManager.isSupported();
      setNFcSupported(nfcSupported);
     // Alert.alert("Modal", JSON.stringify(device));
      if(!hasPermission){
        let permissionResultat = await requestPermission();
        setIsPermission(permissionResultat);
      }else {
        setIsPermission(hasPermission);
      }
      let resultPermission : PermissionStatus;
      if(Platform.OS === 'ios'){
       resultPermission = await check(PERMISSIONS.IOS.CONTACTS);
      }else {
       resultPermission = await check(PERMISSIONS.ANDROID.WRITE_CONTACTS);
      }
      if(resultPermission !== RESULTS.GRANTED){
        Alert.alert("Authorisation", 
          "Pour enregistrer les contacts scannés, autorisez Agno à accéder à la liste de vos contacts via les paramètres de votre smartphone.",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Ouvrir les paramètres",
          onPress: () => Linking.openSettings()
        }
      ]
    );  
      }
    }
    checkPermission();
    
  },[])

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

 const  saveContact = (contact : IContact)=> {
  Contacts.addContact({
    familyName : contact.name, 
    emailAddresses : [{email : contact.email ??'',label : 'mobile'}],
    phoneNumbers: [{
      label: "mobile",
      number: contact.phone ?? '',
    }]
  }).then(res=>{
    notifyMessage("Nouveau contact enregistrer avec succès");
  })
  }

  async function onSuccess(e: string) {
    if (e) {
      try {
        let publicKey = e.replace('https://agno.agnesmere-communication.com/','');
        const result = await addContact(publicKey);
        let contactCheckPermission = await Contacts.checkPermission();
        //Alert.alert("EDR", value); 
        if(contactCheckPermission !== 'authorized'){
          let resultPermission : PermissionStatus;
           if(Platform.OS === 'ios'){
            resultPermission = await check(PERMISSIONS.IOS.CONTACTS);
           }else {
            resultPermission = await check(PERMISSIONS.ANDROID.WRITE_CONTACTS);
           }
           if(resultPermission === RESULTS.GRANTED){
            saveContact(result.data as IContact);
           }
        }else {
          saveContact(result.data as IContact);
        }
        notifyMessage("Nouveau contact ajouté avec succès");
        setIScanned(false);
       setIsQrCodeScan(false); 
      } catch (error: any) {
        notifyMessage(error?.response?.data?.message);
        setIScanned(false);
        navigation.goBack();
      }
    }
  }

  function makeSlideOutTranslation(translationType: string, fromValue: number) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  }
  return (
    <View  style={{flex: 1, marginTop: Platform.OS =='ios' ? '10%': '10%'}}>
      
   
     <View style={{flexDirection : 'row', marginTop : 10}}>
     <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          marginTop: 0,
        }}
        onPress={()=>navigation.goBack()}>
        <CustomCircle
          disabled={true}
          borderColor={paletteColor.ORANGE}
          size={25}
          backgroundColor={paletteColor.GRAY_OPACITY}
          borderRadius={10}
          borderWidth={1}>
          <Icons.ChevronLeftIcon
            size={20} 
            color={paletteColor.ORANGE}
          />
        </CustomCircle>
        <View style={{marginLeft: 10}}>
          <CustomText
            textTransform="capitalize"
            fontWeight="bold"
            fontSize={14}
            color={paletteColor.ORANGE}>
            Annuler
          </CustomText>
        </View>
      </Pressable>
     </View>
     {isQrCodeScan == false && <View style={{height :'20%', justifyContent : 'center', flexDirection : 'row', alignItems : 'center'}}>
          <Pressable style={{borderColor : 'black', borderRadius : 12 , padding : 12, borderWidth : 1, 
          width : 200,height : 60,flexDirection : 'row', alignItems : 'center'}} onPress={async()=>{
             if(nfcSupported == false){
              Alert.alert("Alert", "Désolé votre téléphone ne supporte pas la technologie NFC , Veuillez utilisez le scan par QR code")
             }else {
              await readNdef()
             }
          }}>
             <Image source={nfc} style={{width : 45, height: 45}}/>
              <Text style={{fontWeight : 'bold', marginLeft:'5%'}}>Lire une carte NFC</Text>
          </Pressable>
     </View>}
      <View style={{height : (isQrCodeScan  == true ? '100%' :  '80%')}}>
      {device != null && isPermission && <Camera 
                style={StyleSheet.absoluteFillObject}

     codeScanner={codeScanner} device={device} isActive={true} />} 
     {isQrCodeScan == false &&   <View style={{flexDirection : 'row', justifyContent : 'center', 
     alignItems : 'center', height : '100%',width : '100%'}}>
            <Pressable style={{borderColor : 'white', borderRadius : 12 , padding : 12, borderWidth : 1, 
                width : 240,height : 60,flexDirection : 'row', alignItems : 'center', backgroundColor : paletteColor.WHITE}} onPress={()=>{
                  setIsQrCodeScan(true);
                }}>
                  <Image source={qr} style={{width : 35, height: 35}}/>
                    <Text style={{fontWeight : 'bold', marginLeft:'5%', textAlign : 'center'}}>Lancer le scan par QR code</Text>
                </Pressable>
       </View>}
      
      {isQrCodeScan == true && <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <CustomText textAlign="center">
                <CustomText
                  fontWeight="bold"
                  fontSize={18}
                  textAlign="center"
                  color="white">
                  Placer correctement la {'\n'}
                </CustomText>
                <CustomText
                  fontWeight="bold"
                  fontSize={18}
                  textAlign="center"
                  color="white">
                  carte pour le scan
                </CustomText>
              </CustomText>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                <View style={{height: SCREEN_WIDTH * 0.73}} />
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    'translateY',
                    SCREEN_WIDTH * -0.54,
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>
            <View style={{marginTop : 12, width : 200}}>
            <CustomButton label={'Annuler'} onPress={()=>{
              setIsQrCodeScan(false);
            }}/>
            </View>

            <View style={styles.bottomOverlay} />
          </View>}
      
      </View>
      {isVisibleBottom && (
        <BottomSheetComponent isVisible={isVisibleBottom}>
          <CustomText
            fontWeight="500"
            marginTop={5}
            marginBottom={15}
            fontSize={18}
            textAlign="center">
            Capture prise
          </CustomText>
          <Image
            source={{
              uri: `${dataCard?.data?.picture}`,
            }}
            style={{height: 170}}
          />
          <TouchableOpacity
            onPress={() => {
              setIsVisibleBottom(false);
              navigation.goBack();
            }}>
            <RowJustifyContent
              justifyContent="flex-start"
              alignItems="center"
              marginTop={25}>
              <View style={styles.viewCarte} />
              <View>
                <CustomText fontSize={12} marginLeft={5}>
                  Reprendre le scan
                </CustomText>
              </View>
            </RowJustifyContent>
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            onPress={() => {
              setIsVisibleBottom(false);
              if (dataCard?.id) {
                //@ts-ignore
                dispatch(createBusinessCardSave(dataCard?.id, navigation));
              }
            }}>
            <RowJustifyContent
              justifyContent="flex-start"
              alignItems="center"
              marginTop={35}
              marginBottom={'25%'}>
              <View style={styles.viewCarte} />
              <CustomText fontSize={12} marginLeft={5}>
                Enregistrer
              </CustomText>
            </RowJustifyContent>
          </TouchableOpacity>
        </BottomSheetComponent>
      )}
      {renderActivityLoading(isLoadingCardSave)}
    </View>
  );
};

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'red';

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  separator: {
    marginTop: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: paletteColor.GRAY,
  },
  viewCarte: {
    width: 50,
    height: 50,
    backgroundColor: paletteColor.ORANGE_OPACITY,
    borderRadius: 50,
  },
});

export default Scan;
