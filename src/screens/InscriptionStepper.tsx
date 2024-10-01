/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BodyProject from '../components/BodyProject';
import CustomButton from '../components/CustomButton';
import {paletteColor} from '../themes/Utility';
import {useInscription} from '../hooks/InscriptionProvider';
import FormulaireProfilInscription from './FormulaireProfilInscription';
import {notifyMessage} from '../common/notifyMessage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/AuthProvider';
import {asyncPostPublicKey, asyncPostToken, asyncPostUserId } from '../services/asyncStorage';
import {createAccount } from '../services/apiServices';
import { actionReducer, actionTypeReducer } from '../contexts/reducers/actionReducer';

const Register = () => {
  const {inscriptionData, setInscriptionData} = useInscription();
  const navigation = useNavigation();
  const formData = new FormData();

  const [isValidate, setIsValidate] = useState(false);
  const [accountId, setAccountId] = useState('');
  const {dispatchAuhtContext} = useAuth();

  const handleInscription = async (choose: string) => {
    setIsValidate(true);
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        //Authorization: `Bearer ${token}`,
      },
    };
    setInscriptionData({...inscriptionData, underSubscriptionType: choose});
    formData.append('firstName', inscriptionData.firstName);
    formData.append('email', inscriptionData.email);
    formData.append('phone', inscriptionData.phone);
    formData.append('password', inscriptionData.password);
    formData.append('subscriptionType', inscriptionData.subscriptionType);
    formData.append('accountType', inscriptionData.accountType);
    formData.append(
      'underSubscriptionType',
      inscriptionData.underSubscriptionType,
    );

    formData.append(
      'picture',
      inscriptionData.file.uri !== null ? inscriptionData.file : null,
    );
    
      createAccount(formData, config)
      .then(res => {
        setIsValidate(false);
        if(res){
          setAccountId(res?.data?.userId);
          asyncPostToken(res.data.accessToken);
          asyncPostUserId(res.data.userId);
          asyncPostPublicKey(res.data.publicKey);
          dispatchAuhtContext(
            actionReducer(actionTypeReducer.SIGN_IN, res.data.accessToken),
          );
          setIsValidate(false);
          navigation.navigate('StackHome' as never);
        }
      })
      .catch((err: any) => {
        setIsValidate(false);
        notifyMessage(err.response.data.message);
      });
  };



  return (
    <BodyProject
      title={'Inscription'}
      backgroundColor={paletteColor.WHITE}>
      <ScrollView
        style={{marginHorizontal: 10}}
        showsVerticalScrollIndicator={false}>
        <Text style={{textAlign : 'center', marginTop : 15, fontSize : 18}}>Créer un compte et beneficier de pluisieur carte de visite gratuite</Text>
        <FormulaireProfilInscription />
        

        <View style={{marginVertical: 20}}>
        <CustomButton
            label={
              (isValidate == true ? 'Patientez...': "S'inscrire")
            }
            onPress={handleInscription}
          />
          </View>
      </ScrollView>
    </BodyProject>
  );
};

export default Register;
