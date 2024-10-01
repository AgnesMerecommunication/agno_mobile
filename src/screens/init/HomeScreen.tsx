/* eslint-disable react-native/no-inline-styles */
import {Alert, Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {paletteColor} from '../../themes/Utility';
import CustomTextInput from '../../components/CustomTextInput';
import CustomText from '../../components/CustomText';
import BodyProject from '../../components/BodyProject';
import CustomButton from '../../components/CustomButton';
import SelectPictue from '../../components/SelectPictue';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {uuidCustome} from '../../constants/Data';
import {cardId} from '../../utils/data';

export default function HomeScreen({route}: any){
  const {recupTemplate, dataUpdate, update} = route.params;
    
    const [error, setError] = useState('');
    const [dataFormulaire, setDataFormulaire] = useState({
      prenom: '',
      nom: '',
      nomEntreprise: '', 
      titrePro:'',
      slogan: '',
      contact: [],
      email: '',
      adresse:'',
      web:'',
      modelId: '',
      file: {
        uri: '',
        type: 'image/jpeg',
        name: uuidCustome.slice(0, 11) + '.' + 'jpeg',
      },
    });
    const [verifFile, setVerifFile] = useState<any>({
      camera: false,
      picker: false,
    });
  
    const navigation = useNavigation();
    const styles = StyleSheet.create({
      viewContainer: {
        marginHorizontal: 17,
        height: Dimensions.get('screen').height / 1.25,
      },
      textArea: {
        textAlignVertical: 'top',
        borderColor: paletteColor.GRAY,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 13,
        paddingBottom: Platform.OS === 'ios' ? 100 : 0,
        color: paletteColor.BLACK,
        backgroundColor: 'white',
        padding: '2%',
      },
    });
  
    const send = () => {
      let error = false;
    if(((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
      cardId.card1 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card2 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card4 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card5 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card7 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card8 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card10 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card11 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card12 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card13 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card14 ||
      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card15 ||
        
        (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card16 ||
        (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card17
        ) ||
        (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card20  ||
        (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
        cardId.card22
         && (!dataFormulaire.nom)){
          error = true;
          setError('Veuillez entrer votre nom et vos prénoms')
        }


          if(((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
          cardId.card1 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card2 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card3 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card4 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card5 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card6 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card7 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card8 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card9 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card10 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card11 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card13 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card14 ||
          (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card15) && !dataFormulaire.nomEntreprise){
              error = true;
              setError("Veuillez entrer le nom de l'entreprise")
            }
          
            if(((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card2 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card3 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card4 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card5 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card6 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card7 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card8 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card9 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card10 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card11 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card12 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card13 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card14 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card15 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card16 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card17
              || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22
              )&& !dataFormulaire.titrePro){
                error = true;
                setError("Veuillez entrer votre titre professionel")
              }

              if(((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card1 ||
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                cardId.card4 ||
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                cardId.card5 ||
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                cardId.card7 ||
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                cardId.card10 ||
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                cardId.card12 ||
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                cardId.card15)&& !dataFormulaire.slogan){
                  error = true;
                  setError("Veuillez entrer votre slogan")
                }
                if(((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                cardId.card1 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card2 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card3 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card5 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card6 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card7 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card8 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card9 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card10 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card11 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card12 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card13 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card14 ||
                (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card15 || 
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card16 || 
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card17 || 
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card20 || 
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card22 
                  )&& !dataFormulaire.contact){
                    error = true;
                    setError("Veuillez entrer un contact")
                  }

                  if(((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                  cardId.card1 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card2 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card3 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card4 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card5 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card6 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card7 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card8 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card9 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card10 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card11 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card12 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card13 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card14 ||
                  (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card15 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card16 || 
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card17|| 
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card20 || 
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card22 
                    )&& !dataFormulaire.email){
                      error = true;
                      setError("Veuillez entrer votre email")
                    }

                    if(((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                    cardId.card1 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card2 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card4 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card5 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card6 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card7 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card8 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card9 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card10 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card11 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card12 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card13 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card14 ||
                    (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card15 || 
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card20 || 
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card22 
                      )&& !dataFormulaire.adresse){
                        error = true;
                        setError("Veuillez entrer votre adresse")
                      }

                      if(((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                      cardId.card1 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card2 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card4 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card5 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card6 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card7 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card8 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card9 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card10 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card11 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card12 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card13 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card14 ||
                      (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card15 || 
                        (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card20 || 
                        (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
                        cardId.card22 
                        )&& !dataFormulaire.web){
                          error = true;
                          setError("Veuillez entrer votre site site web")
                        }
                        if(error == false){
                          navigation.navigate({
                            name: 'StackCarte',
                            params: {
                              recupTemplate: recupTemplate,
                              data: {
                                ...dataFormulaire,
                                img:
                                  dataFormulaire.file.uri !== ''
                                    ? dataFormulaire.file.uri
                                    : '',
                                dataUpdate: {
                                  update,
                                  id: dataUpdate?.id,
                                },
                              },
                            },
                          } as never);
                        }


  }

  
    return (
<BodyProject
      title="Retour"
      verifPress={true}
      onPress={() => {
        dataFormulaire.contact = [];

        navigation.goBack();
      }}>
      <KeyboardAwareScrollView
        style={styles.viewContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <CustomText
            fontWeight="bold"
            fontSize={20}
            marginTop="5%"
            marginBottom="5%">
            {update === true
              ? 'Modifier la carte de visite'
              : 'Formulaire de carte de visites'}
          </CustomText>
          {((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card2 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card3 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card4 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card5 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card7 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card8 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card11 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card12|| 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22 
              ) && (
            <SelectPictue
              title="Logo"
              onChangeGallery={(image: {uri: any; type: any; name: string}) => {
                const file = image;
                setDataFormulaire({...dataFormulaire, file});
                setVerifFile({picker: true, camera: false});
              }}
              onChangeCamera={(image: {uri: any; type: any; name: string}) => {
                const file = image;
                setDataFormulaire({...dataFormulaire, file});
                setVerifFile({picker: false, camera: true});
              }}
              verifFile={verifFile}
            />
          )}

          {((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card2 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card4 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card5 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card7 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card8 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card10 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card11 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card12 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card13 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card14 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card15 ||
              
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card16 ||
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card17 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22 
              ) && (
            <CustomTextInput
              onChangeText={e => {
                setError('');
                setDataFormulaire({...dataFormulaire, nom: e});
              }}
              backgroundColor="white"
              title={'Nom'}
              placeholder={'mon nom'}
              marginTop={20}
              defaultValue={dataFormulaire.nom}
            />
          )}

          {((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card4 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card8 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card10 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card12 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card13 ||
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card16 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card17 
              || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22 
              ) && (
            <CustomTextInput
              onChangeText={e => {
                setError('');
                setDataFormulaire({...dataFormulaire, prenom: e});
              }}
              backgroundColor="white"
              title={'Prenom'}
              placeholder={'mon prenom'}
              marginTop={20}
              defaultValue={dataFormulaire.prenom}
            />
          )}

          {((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card2 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card3 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card4 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card5 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card6 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card7 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card8 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card9 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card10 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card11 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card13 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card14 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card15 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22 ) && (
            <CustomTextInput
              onChangeText={e => {
                setError('');
                setDataFormulaire({...dataFormulaire, nomEntreprise: e});
              }}
              backgroundColor="white"
              title={"Nom de l'entreprise"}
              placeholder={'Entreprise bTd'}
              marginTop={20}
              defaultValue={dataFormulaire.nomEntreprise}
            />
          )}
          {((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card2 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card3 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card4 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card5 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card6 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card7 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card8 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card9 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card10 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card11 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card12 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card13 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card14 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card15 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card16 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card17 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22 
              ) && (
            <CustomTextInput
              onChangeText={e => {
                setError('');
                setDataFormulaire({...dataFormulaire, titrePro: e});
              }}
              backgroundColor="white"
              title={'Titre professionel'}
              placeholder={'titre professionel'}
              marginTop={20}
              defaultValue={dataFormulaire.titrePro}
            />
          )}
          {((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card4 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card5 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card7 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card10 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card12 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card15 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22 ) && (
            <CustomTextInput
              onChangeText={e => {
                setError('');
                setDataFormulaire({...dataFormulaire, slogan: e});
              }}
              backgroundColor="white"
              title={'Slogan'}
              placeholder={'slogan'}
              marginTop={20}
              defaultValue={dataFormulaire.slogan}
            />
          )}
          {((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card2 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card3 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card5 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card6 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card7 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card8 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card9 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card10 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card11 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card12 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card13 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card14 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card15 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card16 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card17 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22 
              ) && (
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                justifyContent: 'space-between',
                width: '90%',
              }}>
              <View style={{width: '49%'}}>
                <CustomTextInput
                  onChangeText={e => {
                    setError('');
                    //@ts-ignore
                    dataFormulaire.contact[0] = e;
                  }}
                  backgroundColor="white"
                  title={'Contact 1'}
                  placeholder={'0102034070'}
                  marginTop={20}
                  defaultValue={
                    dataFormulaire.contact[0] === 'undefined'
                      ? ''
                      : dataFormulaire.contact[0]
                  }
                />
              </View>
              <View style={{width: '49%'}}>
                <CustomTextInput
                  onChangeText={e => {
                    setError('');
                    //@ts-ignore
                    dataFormulaire.contact[1] = e;
                  }}
                  backgroundColor={'white'}
                  title={'Contact 2'}
                  placeholder={'0102034070'}
                  marginTop={20}
                  defaultValue={
                    dataFormulaire.contact[1] === 'undefined'
                      ? ''
                      : dataFormulaire.contact[1]
                  }
                />
              </View>
            </View>
          )}
          {((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card2 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card3 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card4 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card5 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card6 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card7 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card8 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card9 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card10 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card11 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card12 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card13 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card14 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card15 ||
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card16 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card17 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22 
              ) && (
            <CustomTextInput
              onChangeText={e => {
                setError('');
                setDataFormulaire({...dataFormulaire, email: e});
              }}
              backgroundColor="white"
              title={'Email'}
              placeholder={'email@email.com'}
              marginTop={20}
              defaultValue={dataFormulaire.email}
            />
          )}

          {((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card2 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card4 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card5 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card6 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card7 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card8 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card9 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card10 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card11 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card12 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card13 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card14 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card15 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22 
              ) && (
            <CustomTextInput
              onChangeText={e => {
                setError('');
                setDataFormulaire({...dataFormulaire, adresse: e});
              }}
              backgroundColor="white"
              title={'Adresse'}
              placeholder={'avenue rue '}
              marginTop={20}
              defaultValue={dataFormulaire.adresse}
            />
          )}

          {((update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
            cardId.card1 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card2 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card4 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card5 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card6 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card7 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card8 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card9 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card10 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card11 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card12 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card13 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card14 ||
            (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card15 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card20 || 
              (update === true ? dataUpdate?.modelId : recupTemplate?.id) ===
              cardId.card22 
              ) && (
            <CustomTextInput
              onChangeText={e => {
                setError('');
                setDataFormulaire({...dataFormulaire, web: e});
              }}
              backgroundColor="white"
              title={'Site web'}
              placeholder={'https://www.mysitweb.com'}
              marginTop={20}
              defaultValue={dataFormulaire.web}
            />
          )}

            {error.length > 0 && <View style={{ marginVertical : 12, justifyContent : 'center' ,width : '100%', alignItems : 'center'}}>
              <Text style={{color : 'red', alignItems : 'center', fontWeight : 'bold'}}>{error}</Text>
            </View>}
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              justifyContent: 'space-between',
              width: '90%',
            }}>
            <View style={{width: '100%'}}>
              <CustomButton
                label="Valider"
                onPress={() => {
                  send();
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </BodyProject>
      
    );
}