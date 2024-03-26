/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import {paletteColor} from '../themes/Utility';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik} from 'formik';
import {loginForm} from '../utils/validation-yup';
import {authentificationLogin} from '../services/apiServices';
import {useAuth} from '../hooks/AuthProvider';
import {
  actionReducer,
  actionTypeReducer,
} from '../contexts/reducers/actionReducer';
import {asyncPostPublicKey, asyncPostToken, asyncPostUserId} from '../services/asyncStorage';
import {renderActivityLoading} from '../common/activityLoading';
import {notifyMessage} from '../common/notifyMessage';
import {Image} from 'react-native';
import {logoagno} from '../utils/images';
import SelectScreen from './init/SelectScreen';
import axios  from 'axios';
const Login = () => {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const {dispatchAuhtContext} = useAuth();
  const [errorsMessage,setErrorsMessage] = useState<undefined | string>();
  const [updateActive,setUpdateActive] = useState(false);
  
  useEffect(()=>{
    axios.get('https://agnesmere-sarl.com/agno/update.json').then(res=>{
      if(res.data.update != true){
        setUpdateActive(true);
        //Alert.alert("DDD", JSON.stringify(res.data.update));
      }
    })
   /* setTimeout(()=>{
      setUpdateActive(false);
    },5000)*/
  },[])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginForm,
    onSubmit: async values => {
      setIsValidate(true);
      try {
        const result = await authentificationLogin(values);
        if(result.message){
          if(result.message == "DISABLED"){
            setErrorsMessage("Votre compte est innactif");
          }else 
          if(result.message == "DELETE"){
            setErrorsMessage("Vous n'avez pas de compte");
          }else {
            setErrorsMessage(result.message);
          }
          setIsValidate(false);
        }else {
          asyncPostToken(result.accessToken);
          asyncPostUserId(result.userId);
          asyncPostPublicKey(result.publicKey);
          dispatchAuhtContext(
            actionReducer(actionTypeReducer.SIGN_IN, result.accessToken),
          );
          setIsValidate(false);
        }
       
      } catch (error: any) {
        notifyMessage(error.response.data.message);
        setIsValidate(false);
      }
    },
  });

  if(updateActive == false){
    return <SelectScreen/>
  }
  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          height: Dimensions.get('screen').height,
          justifyContent: 'flex-end',
        }}>
          
        <View
          style={{
            backgroundColor: paletteColor.WHITE,
            paddingHorizontal: 17,
            paddingBottom: '15%',
          }}>
          <Image
            source={logoagno}
            style={{
              height: 59,
              width: 52,
              resizeMode: 'contain',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
          <CustomText
            textAlign="center"
            fontWeight="400"
            fontSize={25}
            marginTop="2%">
            Connexion
          </CustomText>
          <CustomText textAlign="center">Content de vous voir</CustomText>
          <CustomTextInput
            title="Email"
            placeholder="email@email.com"
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <CustomText color={paletteColor.RED} fontSize={10}>
              {formik.errors.email}
            </CustomText>
          ) : null}
          <CustomTextInput
            title="Mot de passe"
            subTitle="j'ai oublié mon mot de passe"
            placeholder="*******************"
            verifIcon={true}
            secureTextEntry={secureTextEntry}
            colorIcon={paletteColor.ORANGE}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            onPressText={() => navigation.navigate('PasswordForgot' as never)}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <CustomText color={paletteColor.RED} fontSize={10}>
              {formik.errors.password}
            </CustomText>
          ) : null}
          
          {errorsMessage && <View style={{flexDirection : 'row' , justifyContent : 'center', marginTop : 8}}>
            <CustomText color={paletteColor.RED} fontSize={13}>
              {errorsMessage}
            </CustomText>
          </View> }
          <View style={styles.viewButton}>
            <CustomButton
              label="Connexion"
              onPress={formik.handleSubmit}
              disabled={isValidate}
              backgroundColor={
                isValidate ? paletteColor.ORANGE_OPACITY : paletteColor.ORANGE
              }
            />
          </View>

          <CustomText
            textAlign="center"
            fontWeight="bold"
            marginTop="8%"
            marginBottom="5%">
            Pas de compte ?{' '}
            <CustomText
              textAlign="center"
              color={paletteColor.ORANGE}
              onPress={() =>
                navigation.navigate('InscriptionStepper' as never)
              }>
              Inscrivez vous
            </CustomText>
          </CustomText>
        </View>
      </View>
      {renderActivityLoading(isValidate)}
    </KeyboardAwareScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  viewSeparator: {flexDirection: 'row', alignItems: 'center', marginTop: 15},
  separator: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  viewButton: {marginTop: 20},
});
